import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaSpinner } from 'react-icons/fa';

function SignUpForm({ onSwitch }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mnemonic, setMnemonic] = useState('');

  const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    return usernameRegex.test(username);
  };

  const validatePassword = (password) => {
    const minLength = 7;
    const hasCapitalLetter = /[A-Z]/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    return password.length >= minLength && hasCapitalLetter && hasSpecialCharacter && hasNumber;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!username) {
      newErrors.username = 'Username is required';
    } else if (!validateUsername(username)) {
      newErrors.username = 'Username can only contain a-z, A-Z, 0-9 and underscores';
    }
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!email.includes('@')) {
      newErrors.email = 'Invalid email';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 7 characters long, contain a capital letter, a number and a special character';
    }
    if (!confirmPassword) {
      newErrors.password2 = 'Confirm Password is required';
    } else if (!(password === confirmPassword)) {
      newErrors.password2 = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, password2: confirmPassword }),
      });
      const data = await response.json();
      if (response.ok) {
        setMnemonic(data.mnemonic_phrase);
        setSuccess(true);
      } else {
        console.error('Registration failed', data);
        setErrors(data);
      }
    } catch (error) {
      console.error('Network error:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCopy = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(mnemonic).then(() => {
        alert('Mnemonic copied to clipboard');
      }).catch((err) => {
        console.error('Failed to copy mnemonic: ', err);
        alert('Failed to copy mnemonic');
      });
    } else {
      alert('Clipboard API not available');
    }
  };

  const handleContinue = () => {
    onSwitch(); // Switch to login page
  };

  return (
    <div className="flex flex-col items-center w-full max-w-lg px-4">
      <h2 className="text-3xl lg:text-4xl font-bold mb-6">Sign Up</h2>
      {!success ? (
        <>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4">
              <label htmlFor="username" className="block text-base lg:text-lg font-medium text-gray-700">Username</label>
              <input
                id="username"
                type="text"
                className={`mt-1 p-3 lg:p-4 border border-gray-300 rounded text-base lg:text-lg w-full pr-10 ${errors.username ? 'border-red-500' : ''}`}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-base lg:text-lg font-medium text-gray-700">Email</label>
              <input
                id="email"
                type="email"
                className={`mt-1 p-3 lg:p-4 border border-gray-300 rounded text-base lg:text-lg w-full pr-10 ${errors.email ? 'border-red-500' : ''}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4 relative">
              <label htmlFor="password" className="block text-base lg:text-lg font-medium text-gray-700">Password</label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className={`mt-1 p-3 lg:p-4 border border-gray-300 rounded text-base lg:text-lg w-full pr-10 ${errors.password ? 'border-red-500' : ''}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-1 text-gray-500"
                onClick={toggleShowPassword}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <div className="mb-6 relative">
              <label htmlFor="confirmPassword" className="block text-base lg:text-lg font-medium text-gray-700">Confirm Password</label>
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                className={`mt-1 p-3 lg:p-4 border border-gray-300 rounded text-base lg:text-lg w-full pr-10 ${errors.password2 ? 'border-red-500' : ''}`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-1 text-gray-500"
                onClick={toggleShowPassword}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <button
              type="submit"
              className={`bg-green-500 text-white px-6 py-3 lg:py-4 rounded text-base lg:text-lg w-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? <FaSpinner className="animate-spin w-6 h-6 mx-auto" /> : 'Sign Up'}
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={onSwitch}
              className="text-green-500 hover:text-green-700 focus:outline-none"
            >
              Login
            </button>
          </p>
        </>
      ) : (
        <div className="mt-6 bg-green-100 text-green-700 p-4 rounded text-center">
          <p className="text-lg font-bold mb-4">Sign Up Successful!</p>
          <p className="mb-4">Your mnemonic phrase:</p>
          <div className="mb-4 bg-white p-2 rounded shadow-md">
            <p className="text-lg font-bold text-red-500">{mnemonic}</p>
          </div>
          <p className="text-sm text-yellow-600">
            Do not share these phrases with anyone. Losing these phrases means you could lose access to your funds. These phrases are used for account recovery.
          </p>
          <button
            onClick={handleCopy}
            className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
          >
            Copy
          </button>
          <button
            onClick={handleContinue}
            className="bg-green-500 text-white px-4 py-2 rounded mt-4 ml-4 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
          >
            Continue
          </button>
        </div>
      )}
      {Object.keys(errors).length > 0 && (
        <div className="mt-4 text-red-500">
          {Object.keys(errors).map((key) => (
            <p key={key}>{errors[key]}</p>
          ))}
        </div>
      )}
    </div>
  );
}

SignUpForm.propTypes = {
  onSwitch: PropTypes.func.isRequired,
};

export default SignUpForm;
