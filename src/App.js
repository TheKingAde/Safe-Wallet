import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import Layout from './components/Layout';
import { useAuthForm } from './hooks/useAuthForm';
import Dashboard from './components/Dashboard';
import LandingPage from './components/landing-page';
import ForgotPasswordPage from './components/ForgotPasswordPage'; // Import the ForgotPasswordPage
import ResetPasswordPage from './components/ResetPasswordPage'; // Import the ResetPasswordPage

function App() {
  const { isLogin, handleSwitch } = useAuthForm();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/auth"
          element={
            <Layout>
              {isLogin ? <LoginForm onSwitch={handleSwitch} /> : <SignUpForm onSwitch={handleSwitch} />}
            </Layout>
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/forgot-password"
          element={
            <Layout>
              <ForgotPasswordPage />
            </Layout>
          }
        />
        <Route
          path="/reset-password"
          element={
            <Layout>
              <ResetPasswordPage />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
