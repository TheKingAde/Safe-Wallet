import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function LoginForm({ onSwitch }) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!identifier) {
      newErrors.identifier = 'Email or Username is required';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log(`Logging in with Identifier: ${identifier}, Password: ${password}`);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.access) {
          console.log('Login successful', data.access);
          localStorage.setItem('token', data.access);
          navigate('/dashboard', { state: { walletAddress: data.wallet_address, balance: data.balance, username:data.username } });
        } else {
          console.error('Login response did not include a token');
          setErrors({ login: 'Login response did not include a token' });
        }
      } else {
        console.error('Login failed', data);
        setErrors({ login: data.detail || 'Incorrect username or password' });
      }
    } catch (error) {
      console.error('Network error:', error);
      setErrors({ network: 'Network error occurred. Please try again later.' });
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-lg px-4">
      <h2 className="text-3xl lg:text-4xl font-bold mb-6">Login</h2>
      <form onSubmit={handleSubmit} className="w-full">
        <input
          type="text"
          placeholder="Email or Username"
          className={`mb-4 p-3 lg:p-4 border border-gray-300 rounded text-base lg:text-lg w-full ${errors.identifier ? 'border-red-500' : ''}`}
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className={`p-3 lg:p4 border border-gray-300 rounded text-base lg:text-lg w-full pr-10 ${errors.password ? 'border-red-500' : ''}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-500"
            onClick={toggleShowPassword}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <button type="submit" className="bg-green-500 text-white px-6 py-3 lg:py-4 rounded text-base lg:text-lg w-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50">
          Login
        </button>
      </form>
      <div className="mt-4">
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        {errors.identifier && <p className="text-red-500 text-sm mt-1">{errors.identifier}</p>}
        {errors.login && <p className="text-red-500 text-sm mt-1">{errors.login}</p>}
        {errors.network && <p className="text-red-500 text-sm mt-1">{errors.network}</p>}
      </div>
      <p className="mt-6 text-base lg:text-lg">
        Don't have an account? <button onClick={onSwitch} className="text-green-500 hover:underline">Sign Up</button>
      </p>
    </div>
  );
}

LoginForm.propTypes = {
  onSwitch: PropTypes.func.isRequired,
};

export default LoginForm;
