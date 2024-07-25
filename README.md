# Safe Wallet

Safe Wallet is a Bitcoin wallet web application that allows users to securely store, send, and receive Bitcoin. This application is built using React for the frontend and Django for the backend, with SQLite as the database.

## Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Project Description

Safe Wallet is designed to provide users with a simple and secure way to manage their Bitcoin. Users can create an account, generate a Bitcoin wallet, view their balance, send and receive Bitcoin, and view their transaction history.

## Features

- User authentication (sign-up, login, password reset)
- Bitcoin wallet creation upon registration
- View Bitcoin balance, Bitcoin chart and wallet address
- Send Bitcoin to other addresses
- Receive Bitcoin
- View transaction history
- Responsive design for mobile, tablet, and desktop

## Technologies Used

### Frontend

- React
- Tailwind CSS
- React Router DOM
- React Icons

### Backend

- Django
- Django REST Framework
- SQLite
- SimpleJWT
- bitcoinlib

## Setup Instructions

### Prerequisites

- Python and pip

### Frontend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/TheKingAde/safe-wallet.git
    cd safe-wallet/
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm start
    ```

### Backend Setup

1. Set up a virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

2. Navigate to the backend directory:
    ```bash
    cd backend/
    ```

3. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4. Configure MySQL database:
    - Create a database named `safe_wallet`.
    - Update the database settings in `backend/settings.py`:
      ```python
      DATABASES = {
          'default': {
              'ENGINE': 'django.db.backends.mysql',
              'NAME': 'safe_wallet',
              'USER': 'yourusername',
              'PASSWORD': 'yourpassword',
              'HOST': 'localhost',
              'PORT': '3306',
          }
      }
      ```

5. Run database migrations:
    ```bash
    python manage.py migrate
    ```

6. Create a superuser:
    ```bash
    python manage.py createsuperuser
    ```

7. Start the Django development server:
    ```bash
    python manage.py runserver
    ```

## Usage

### Registration

1. Navigate to the registration page.
2. Fill out the registration form with your details.
3. Upon successful registration, your Bitcoin wallet will be created, and you will be redirected to the login page.

### Login

1. Navigate to the login page.
2. Enter your credentials to log in.
3. After logging in, you will be taken to your dashboard, where you can view your balance and wallet address.

### Sending Bitcoin

1. Click on the send button.
2. Enter the recipient's address and the amount to send.
3. Submit the form to initiate the transaction.

### Receiving Bitcoin

1. Click on the receive button.
2. Your wallet address will be displayed. Share this address with the sender.

### Viewing Transaction History

1. Click on the transaction history button.
2. View a list of your past transactions.

## API Endpoints

### User Authentication

- `POST /api/register/` - Register a new user
- `POST /api/login/` - Login a user
- `POST /api/verify-mnemonic/` - Verify mnemonic for password reset
- `POST /api/reset-password/` - Reset password with token

### Bitcoin Transactions

- `POST /api/send-transaction/` - Send Bitcoin
- `GET /api/transaction-list/` - Get transaction history

## Development

To contribute to the project, follow these steps:

1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature/your-feature-name
    ```
3. Make your changes and commit them:
    ```bash
    git commit -m 'Add some feature'
    ```
4. Push to the branch:
    ```bash
    git push origin feature/your-feature-name
    ```
5. Open a pull request.

## Contributing

We welcome contributions!

## Contact

For any inquiries, please contact us at [theking-ade@outlook.com](mailto:theking-ade@outlook.com).
