import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BitcoinChart from './BitcoinChart'; // Import the BitcoinChart component

function Dashboard() {
  const location = useLocation();
  const { walletAddress, balance, username } = location.state || {}; // Extract from state
  const [showOptions, setShowOptions] = useState(false);
  const [showReceiveBox, setShowReceiveBox] = useState(false);
  const [showSendBox, setShowSendBox] = useState(false);
  const [showTransactionsBox, setShowTransactionsBox] = useState(false); // state for transactions
  const [transactions, setTransactions] = useState([]); // state for storing transactions
  const [transactionsError, setTransactionsError] = useState(''); // Error state for transactions
  const navigate = useNavigate();
  const optionsRef = useRef();
  const receiveBoxRef = useRef();
  const sendBoxRef = useRef();
  const transactionsBoxRef = useRef(); // ref for transactions box
  const [amountInput, setAmountInput] = useState('');
  const [btcAddressInput, setBTCAddressInput] = useState('');
  const [amountError, setAmountError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [balanceError, setBalanceError] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  // close UI components when a user clicks outside of them
  const handleClickOutside = (event) => {
    if (optionsRef.current && !optionsRef.current.contains(event.target)) {
      setShowOptions(false);
    }
    if (receiveBoxRef.current && !receiveBoxRef.current.contains(event.target)) {
      setShowReceiveBox(false);
    }
    if (sendBoxRef.current && !sendBoxRef.current.contains(event.target)) {
      setShowSendBox(false);
    }
    if (transactionsBoxRef.current && !transactionsBoxRef.current.contains(event.target)) {
      setShowTransactionsBox(false);
    }
  };

  // used to manage event listeners for detecting clicks outside the UI elements
  useEffect(() => {
    if (showOptions || showReceiveBox || showSendBox || showTransactionsBox) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showOptions, showReceiveBox, showSendBox, showTransactionsBox]);

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    alert('Wallet address copied to clipboard!');
  };

  const handleSend = async () => {
    if (!amountInput || !btcAddressInput) {
      if (!amountInput) {
        setAmountError('Amount cannot be empty');
      } else {
        setAmountError('');
      }
      if (!btcAddressInput) {
        setAddressError('Bitcoin address cannot be empty');
      } else {
        setAddressError('');
      }
      return;
    }

    // get token from local storage
    const token = localStorage.getItem('token');

    if (!token) {
      alert('You are not logged in!');
      navigate('/');
      return;
    }

    const amountInSatoshis = parseFloat(amountInput) * 100000000;

    if (amountInSatoshis > balance * 100000000) {
      setBalanceError('Insufficient balance');
      return;
    } else if (amountInSatoshis <= 0) {
      setBalanceError('Amount must be greater than 0');
      return;
    } else {
      setBalanceError('');
    }

    try {
      const payload = {
        amount: amountInSatoshis,
        to_address: btcAddressInput
      };

      const response = await fetch('http://localhost:8000/api/send/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        if (response.status === 401) {
          alert('Unauthorized: Please log in again.');
          localStorage.removeItem('token');
          navigate('/');
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }
      // eslint-disable-next-line
      const data = await response.json();
      alert('Transaction successful!');

      setAmountInput('');
      setBTCAddressInput('');
      setAmountError('');
      setAddressError('');
      setBalanceError('');
    } catch (error) {
      console.error('Error sending transaction:', error);
      alert('Error sending transaction: ' + error.message);
    }
  };

  const handleFetchTransactions = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('You are not logged in!');
      navigate('/');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/transactions/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          alert('Unauthorized: Please log in again.');
          localStorage.removeItem('token');
          navigate('/');
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }

      const data = await response.json();
      setTransactions(data);
      setShowTransactionsBox(true);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setTransactionsError('Error fetching transactions: ' + error.message);
    }
  };

  // Function to handle page reload
  const handlePageReload = () => {
    window.location.reload();
  };

  return (
    <div className="relative flex flex-col min-h-screen">
      {(showReceiveBox || showSendBox || showTransactionsBox) && <div className="absolute inset-0 bg-gray-900 bg-opacity-50 z-40"></div>}

      {/* Header section*/}
      <header className="bg-green-500 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold"><button onClick={handlePageReload}>Dashboard</button></h1>
        <div className="relative" ref={optionsRef}>
          <button className="text-xl md:text-2xl" onClick={() => setShowOptions(!showOptions)}>
            <i className="fas fa-user"></i>
          </button>
          {showOptions && (
            <div className="absolute right-0 mt-2 w-36 md:w-48 bg-white border border-gray-300 rounded shadow-lg z-50">
              <b><p className="block w-full text-left px-2 py-2 text-sm md:text-base text-gray-700">{username}</p></b>
              <button
                className="block w-full text-left px-2 py-2 text-sm md:text-base text-gray-700 hover:bg-gray-200"
                onClick={handleLogout}
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </header>

      {/*Main section*/}
      <main className={`flex flex-col items-center justify-center flex-grow p-4 ${(showReceiveBox || showSendBox || showTransactionsBox) ? 'blur' : ''}`}>
        <div className="text-center">
          <div className="flex flex-col md:flex-row items-center justify-center mb-2 md:mb-4">
            <h2 className="text-3xl md:text-5xl mr-2"><span className="font-bold text-7xl">{balance} BTC</span></h2>
          </div>
          <div className="flex justify-center space-x-4 mb-2 md:mb-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
              onClick={() => setShowReceiveBox(true)}
            >
              Receive
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
              onClick={() => setShowSendBox(true)}
            >
              Send
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
              onClick={handleFetchTransactions}
            >
              Transactions
            </button>
          </div>
        </div>
        <div className="w-full max-w-4xl mt-8">
          <BitcoinChart /> {/* Render the BitcoinChart component */}
        </div>
      </main>

      {/* Receive component*/}
      {showReceiveBox && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ background: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div
            className="bg-white p-4 rounded shadow-md w-4/5 md:w-1/3 relative"
            ref={receiveBoxRef}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowReceiveBox(false)}
            >
              <i className="fas fa-times"></i>
            </button>
            <h3 className="text-lg md:text-xl font-semibold mb-4">Receive Bitcoin</h3>
            <p className="mb-4">Your Wallet Address:</p>
            <div className="flex items-center">
              <input
                type="text"
                value={walletAddress}
                readOnly
                className="border border-gray-300 rounded-l px-2 py-1 flex-grow"
              />
              <button
                className="bg-green-500 text-white px-2 py-1 rounded-r hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                onClick={handleCopy}
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Send Component */}
      {showSendBox && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ background: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div
            className="bg-white p-4 rounded shadow-md w-4/5 md:w-1/3 relative"
            ref={sendBoxRef}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowSendBox(false)}
            >
              <i className="fas fa-times"></i>
            </button>
            <h3 className="text-lg md:text-xl font-semibold mb-4">Send Bitcoin</h3>
            <div className="mb-4">
              <label htmlFor="amount" className="block text-sm md:text-base font-medium mb-2">
                Amount (BTC):
              </label>
              <input
                type="text"
                id="amount"
                value={amountInput}
                onChange={(e) => setAmountInput(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
              {amountError && <p className="text-red-500 text-sm mt-1">{amountError}</p>}
              {balanceError && <p className="text-red-500 text-sm mt-1">{balanceError}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="btcAddress" className="block text-sm md:text-base font-medium mb-2">
                BTC Address:
              </label>
              <input
                type="text"
                id="btcAddress"
                value={btcAddressInput}
                onChange={(e) => setBTCAddressInput(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
              {addressError && <p className="text-red-500 text-sm mt-1">{addressError}</p>}
            </div>
            <div className="flex justify-end">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                onClick={handleSend}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Transaction history component*/}
      {showTransactionsBox && (
        <div
          ref={transactionsBoxRef}
          className="absolute inset-0 flex items-center justify-center z-50"
        >
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-4xl">
            <h3 className="text-lg md:text-xl font-semibold mb-4">Transaction History</h3>
            {transactionsError && <p className="text-red-500">{transactionsError}</p>}
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Date/Time</th>
                  <th className="py-2 px-4 border-b">Transaction ID</th>
                  <th className="py-2 px-4 border-b">Amount (BTC)</th>
                  <th className="py-2 px-4 border-b">To Address</th>
                  <th className="py-2 px-4 border-b">Confirmations</th>
                  <th className="py-2 px-4 border-b">Type</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length > 0 ? (
                  transactions.map((transaction, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b">{transaction.timestamp}</td>
                      <td className="py-2 px-4 border-b">{transaction.txid}</td>
                      <td className="py-2 px-4 border-b">{transaction.amount}</td>
                      <td className="py-2 px-4 border-b">{transaction.to_address}</td>
                      <td className="py-2 px-4 border-b">{transaction.confirmations}</td>
                      <td className="py-2 px-4 border-b">{transaction.type}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-2 px-4 text-center">Nothing to see here</td>
                  </tr>
                )}
              </tbody>
            </table>
            <button
              className="bg-green-500 text-white px-4 py-2 mt-4 rounded shadow"
              onClick={() => setShowTransactionsBox(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default Dashboard;
