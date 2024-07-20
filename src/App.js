import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import Layout from './components/Layout';
import { useAuthForm } from './hooks/useAuthForm';
import Dashboard from './components/Dashboard';
<<<<<<< HEAD
=======
import LandingPage from './components/landing-page';
>>>>>>> master

function App() {
  const { isLogin, handleSwitch } = useAuthForm();

  return (
    <Router>
      <Routes>
<<<<<<< HEAD
        <Route
          path="/"
=======
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/auth"
>>>>>>> master
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
