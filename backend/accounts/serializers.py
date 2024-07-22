# accounts/serializers.py

from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from mnemonic import Mnemonic
from .models import Transaction  # Import the Transaction model

CustomUser = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)
    wallet_address = serializers.CharField(read_only=True)
    mnemonic_phrase = serializers.CharField(read_only=True)

    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'password', 'password2', 'wallet_address', 'mnemonic_phrase')

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError("Passwords do not match")
        if CustomUser.objects.filter(username=data['username']).exists():
            raise serializers.ValidationError("Username already exists")
        if CustomUser.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError("Email already exists")
        validate_password(data['password'], self.instance)
        return data

    def create(self, validated_data):
        # Generate the mnemonic phrase
        mnemo = Mnemonic("english")
        mnemonic_phrase = mnemo.generate(strength=128)  # Generates a 12-word phrase
        print(mnemonic_phrase)

        user = CustomUser(
            username=validated_data['username'],
            email=validated_data['email'],
            mnemonic_phrase=mnemonic_phrase
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class LoginSerializer(serializers.Serializer):
    identifier = serializers.CharField()
    password = serializers.CharField()
    wallet_address = serializers.CharField(read_only=True)

    def validate(self, data):
        identifier = data.get("identifier")
        password = data.get("password")

        if '@' in identifier:
            try:
                user = CustomUser.objects.get(email=identifier)
            except CustomUser.DoesNotExist:
                raise serializers.ValidationError("Invalid credentials")
        else:
            try:
                user = CustomUser.objects.get(username=identifier)
            except CustomUser.DoesNotExist:
                raise serializers.ValidationError("Invalid credentials")

        if not user.check_password(password):
            raise serializers.ValidationError("Invalid credentials")

        data["user"] = user
        data["wallet_address"] = user.wallet_address
        return data

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['id', 'user', 'amount', 'to_address', 'timestamp']
        read_only_fields = ['id', 'user', 'timestamp']
