from django.urls import path
from .views import RegisterView, LoginView, SendTransactionView, TransactionListView, VerifyMnemonicView, ResetPasswordView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('send/', SendTransactionView.as_view(), name='send-transaction'),
    path('transactions/', TransactionListView.as_view(), name='transaction-history'),
    path('verify-mnemonic/', VerifyMnemonicView.as_view(), name='verify-mnemonic'),
    path('reset-password/', ResetPasswordView.as_view(), name='reset-password'),  # Add this line
]
