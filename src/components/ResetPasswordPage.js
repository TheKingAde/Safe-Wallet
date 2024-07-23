import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = location.state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!password) {
      newErrors.password = 'Password is required';
    }

    if (password !== password2) {
      newErrors.password2 = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/reset-password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, token }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/auth');
      } else {
        console.error('Password reset failed', data);
        setErrors({ password: data.detail || 'Password reset failed' });
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
      <h2 className="text-3xl lg:text-4xl font-bold mb-6">Reset Password</h2>
      <form onSubmit={handleSubmit} className="w-full">
        <input
          type="password"
          placeholder="New Password"
          className={`mb-4 p-3 lg:p-4 border border-gray-300 rounded text-base lg:text-lg w-full ${errors.password ? 'border-red-500' : ''}`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          className={`mb-4 p-3 lg:p-4 border border-gray-300 rounded text-base lg:text-lg w-full ${errors.password2 ? 'border-red-500' : ''}`}
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
        <button
          type="submit"
          className={`bg-green-500 text-white px-6 py-3 lg:py-4 rounded text-base lg:text-lg w-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? <FaSpinner className="animate-spin w-6 h-6 mx-auto" /> : 'Reset Password'}
        </button>
      </form>
      <div className="mt-4">
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        {errors.password2 && <p className="text-red-500 text-sm mt-1">{errors.password2}</p>}
        {errors.network && <p className="text-red-500 text-sm mt-1">{errors.network}</p>}
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

export default ResetPasswordPage;
