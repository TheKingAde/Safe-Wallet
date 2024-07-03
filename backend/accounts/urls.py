# accounts/urls.py

from django.urls import path
from .views import RegisterView, LoginView, SendTransactionView, TransactionListView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('send/', SendTransactionView.as_view(), name='send-transaction'),
    path('transactions/', TransactionListView.as_view(), name='transaction-history'),
]
