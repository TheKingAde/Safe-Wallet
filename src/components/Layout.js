import React from 'react';
import logo from '../assets/wallet.png';

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 bg-green-500 flex items-center justify-center p-6 lg:p-0">
        <div className="text-white text-center">
          <img src={logo} alt="Safe Wallet Logo" className="mb-4 mx-auto w-24 lg:w-32" />
          <h1 className="text-4xl lg:text-6xl font-bold">Safe Wallet</h1>
        </div>
      </div>
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-6 lg:p-0">
        {children}
      </div>
    </div>
  );
}

export default Layout;
