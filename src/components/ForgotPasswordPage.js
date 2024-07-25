import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

function ForgotPasswordPage() {
  const [mnemonic, setMnemonic] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // define async function
  const handleSubmit = async (e) => {
    // stop default action assocaited with an event
    e.preventDefault();
    let newErrors = {};

    if (!mnemonic) {
      newErrors.mnemonic = 'Mnemonic key phrase is required';
    }

    // If errors, update state and stop execution.
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/verify-mnemonic/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mnemonic }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/reset-password', { state: { token: data.token } });
        }, 3000); // 3 seconds delay
      } else {
        console.error('Mnemonic verification failed', data);
        setErrors({ mnemonic: data.detail || 'Invalid mnemonic key phrase' });
      }
    } catch (error) {
      console.error('Network error:', error);
      setErrors({ network: 'Network error occurred. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-lg px-4">
      <h2 className="text-3xl lg:text-4xl font-bold mb-6">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="w-full">
        <textarea
          placeholder="Enter your 12 mnemonic key phrase"
          className={`mb-4 p-3 lg:p-4 border border-gray-300 rounded text-base lg:text-lg w-full ${errors.mnemonic ? 'border-red-500' : ''}`}
          value={mnemonic}
          onChange={(e) => setMnemonic(e.target.value)}
          disabled={loading || success}
        />
        <button
          type="submit"
          className={`bg-green-500 text-white px-6 py-3 lg:py-4 rounded text-base lg:text-lg w-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 ${loading || success ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading || success}
        >
          {loading ? <FaSpinner className="animate-spin w-6 h-6 mx-auto" /> : 'Submit'}
        </button>
      </form>
      <div className="mt-4">
        {errors.mnemonic && <p className="text-red-500 text-sm mt-1">{errors.mnemonic}</p>}
        {errors.network && <p className="text-red-500 text-sm mt-1">{errors.network}</p>}
        {success && <p className="text-green-500 text-sm mt-1">Mnemonic key phrase verified successfully. Redirecting...</p>}
      </div>
      <div className="mt-4">
        <button
          onClick={() => navigate('/auth')}
          className="text-green-500 hover:text-green-700 text-base lg:text-lg focus:outline-none"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
