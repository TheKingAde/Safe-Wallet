from datetime import datetime
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.tokens import RefreshToken
from bitcoinlib.wallets import Wallet
from .serializers import RegisterSerializer, LoginSerializer, TransactionSerializer
from .models import Transaction
from rest_framework.permissions import IsAuthenticated
from bitcoinlib.services.services import Service
import requests

CustomUser = get_user_model()

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer

    def perform_create(self, serializer):
        user = serializer.save()
        # Create Bitcoin wallet for the user
        wallet = Wallet.create(user.username)
        address = wallet.get_key().address

        # Save the wallet address in the user's profile
        user.wallet_address = address
        user.save()

class LoginView(APIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]

        refresh = RefreshToken.for_user(user)

        # Retrieve the wallet using the username
        wallet = Wallet(user.username)
        balance = wallet.balance()

        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'wallet_address': user.wallet_address,
            'balance': balance,
            'username': user.username
        })

class SendTransactionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        amount = request.data.get('amount')
        to_address = request.data.get('to_address')


        if not amount or not to_address:
            return Response({"error": "Amount and Bitcoin address are required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            amount = int(amount)
            print(amount)
        except ValueError:
            return Response({"error": "Amount must be an integer"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            wallet = Wallet(user.username)  # Initialize the wallet with the username
            print(wallet)
            if not wallet:
                return Response({"error": "Wallet not found"}, status=status.HTTP_400_BAD_REQUEST)

            # Perform the transaction
            tx = wallet.send_to(to_address, amount)
            return Response({"transaction_id": tx.txid()}, status=status.HTTP_200_OK)
        except Exception as e:
            print("Error in transaction:", str(e))  # Log the exception
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class TransactionListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        try:
            wallet_address = user.wallet_address
            print(f"Debug: User wallet address: {wallet_address}")

            if not wallet_address:
                return Response({'error': 'User wallet address not found'}, status=status.HTTP_400_BAD_REQUEST)

            # Use blockchain.info API to get transaction history
            url = f'https://blockchain.info/rawaddr/{wallet_address}'
            response = requests.get(url)

            if response.status_code != 200:
                return Response({'error': 'Failed to fetch transaction history'}, status=response.status_code)

            transactions = response.json().get('txs', [])
            print(f"Debug: Transactions fetched: {transactions}")

            formatted_transactions = [
                {
                    'txid': tx['hash'],
                    'timestamp': tx['time'],
                    'amount': sum(out['value'] for out in tx['out'] if out['addr'] == wallet_address),
                    'to_address': wallet_address,
                    'confirmations': tx['block_height'] if 'block_height' in tx else 0
                }
                for tx in transactions
            ]

            if not formatted_transactions:
                return Response({'message': 'Nothing to see here'}, status=status.HTTP_200_OK)

            return Response(formatted_transactions, status=status.HTTP_200_OK)
        except Exception as e:
            print(f"Debug: Exception occurred: {str(e)}")
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        # Uncomment to use mock data for Transaction History
        # mock_data = [
        # {
        # 'txid': 'test_txid_1',
        # 'timestamp': datetime.fromtimestamp(1627900000).strftime('%Y-%m-%d %H:%M:%S'),
        # 'amount': 0.005,
        # 'to_address': 'test_address_1',
        # 'confirmations': 10,
        # 'type': 'receive'
        # },
        # {
        # 'txid': 'test_txid_2',
        # 'timestamp': datetime.fromtimestamp(1627900100).strftime('%Y-%m-%d %H:%M:%S'),
        # 'amount': 0.01,
        # 'to_address': 'test_address_2',
        # 'confirmations': 5,
        # 'type': 'send'
        # },
        # {
        # 'txid': 'test_txid_3',
        # 'timestamp': datetime.fromtimestamp(1627900200).strftime('%Y-%m-%d %H:%M:%S'),
        # 'amount': 0.02,
        # 'to_address': 'test_address_3',
        # 'confirmations': 0,
        # 'type': 'receive'
        # }
        # ]
        #
        # return Response(mock_data, status=status.HTTP_200_OK)


class VerifyMnemonicView(APIView):
    def post(self, request):
        mnemonic = request.data.get('mnemonic')
        if not mnemonic:
            return Response({'detail': 'Mnemonic key phrase is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Check if the mnemonic matches any user
            user = CustomUser.objects.get(mnemonic_phrase=mnemonic)
            # Create a token for password reset
            token = AccessToken.for_user(user)
            return Response({'token': str(token)}, status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            return Response({'detail': 'Invalid mnemonic key phrase'}, status=status.HTTP_400_BAD_REQUEST)

class ResetPasswordView(APIView):
    def post(self, request):
        token = request.data.get('token')
        new_password = request.data.get('password')

        if not token or not new_password:
            return Response({'detail': 'Token and new password are required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Decode token and get user
            access_token = AccessToken(token)
            user = CustomUser.objects.get(id=access_token['user_id'])
            user.set_password(new_password)
            user.save()
            return Response({'detail': 'Password reset successful'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
