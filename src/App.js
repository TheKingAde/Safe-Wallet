import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import Layout from './components/Layout';
import { useAuthForm } from './hooks/useAuthForm';
import Dashboard from './components/Dashboard';

function App() {
  const { isLogin, handleSwitch } = useAuthForm();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              {isLogin ? <LoginForm onSwitch={handleSwitch} /> : <SignUpForm onSwitch={handleSwitch} />}
            </Layout>
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
