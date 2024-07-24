import React from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaLock, FaBitcoin, FaChartLine, FaPaperPlane, FaInbox, FaHistory, FaComments, FaEnvelopeOpenText, FaHeadset, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Import additional icons
import logo from '../assets/wallet.png';
import './LandingPage.css'; // Import custom CSS

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="bg-green-500 text-white p-4 flex justify-between items-center fixed w-full top-0 z-50">
        <div className="flex items-center">
          <img src={logo} alt="logo" className="w-8 h-8 mr-2" />
          <div className="text-lg font-bold">Safe Wallet</div>
        </div>
        <div>
          <Link
            to="/auth" className="mr-4 btn btn-primary border-2 border-white text-white text-lg px-4 py-2 rounded hover:bg-white hover:text-green-500 font-bold"
          >
            Login
          </Link>
          <Link
            to="/auth" className="btn btn-primary border-2 border-white text-white text-lg px-4 py-2 rounded hover:bg-white hover:text-green-500 font-bold"
          >
            Sign Up
          </Link>
        </div>
      </header>
      <section className="welcome-section relative text-center py-20 bg-green-500 pt-24">
        <div className="welcome-text-wrapper relative z-10">
          <h1 className="welcome-text text-6xl font-bold mb-4">Welcome to</h1>
          <h2 className="welcome-text text-6xl font-bold mb-4">Safe Wallet</h2>
          <p className="text-2xl text-white mb-8">Your secure Bitcoin Wallet</p>
          <Link
            to="/auth" className="btn btn-primary border-2 border-white bg-green-500 text-white text-lg font-bold py-3 px-6 rounded hover:text-green-500 hover:bg-white"
          >
            Get Started
          </Link>
        </div>
      </section>
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-12">Safe and Secure</h2>
          <div className="flex flex-wrap justify-center items-center">
            <div className="w-full md:w-1/3 p-4 text-center flex-center">
              <FaShieldAlt className="text-6xl text-green-500 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Highly Secure</h3>
              <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac leo nunc. Vestibulum et mauris vel ante finibus maximus nec ut leo.</p>
            </div>
            <div className="w-full md:w-1/3 p-4 text-center flex-center">
              <FaLock className="text-6xl text-green-500 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Encrypted</h3>
              <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac leo nunc. Vestibulum et mauris vel ante finibus maximus nec ut leo.</p>
            </div>
            <div className="w-full md:w-1/3 p-4 text-center flex-center">
              <FaBitcoin className="text-6xl text-green-500 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Trusted</h3>
              <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac leo nunc. Vestibulum et mauris vel ante finibus maximus nec ut leo.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white-100 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-12">Features</h2>
          <div className="flex flex-wrap justify-center items-center">
            <div className="w-full md:w-1/5 p-4 text-center flex-center">
              <FaChartLine className="text-6xl text-green-500 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Bitcoin Chart</h3>
              <p className="text-gray-700">View real-time Bitcoin price charts and historical data.</p>
            </div>
            <div className="w-full md:w-1/5 p-4 text-center flex-center">
              <FaPaperPlane className="text-6xl text-green-500 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Send BTC</h3>
              <p className="text-gray-700">Easily send Bitcoin to any wallet address with a few clicks.</p>
            </div>
            <div className="w-full md:w-1/5 p-4 text-center flex-center">
              <FaInbox className="text-6xl text-green-500 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Receive BTC</h3>
              <p className="text-gray-700">Generate unique addresses to receive Bitcoin securely.</p>
            </div>
            <div className="w-full md:w-1/5 p-4 text-center flex-center">
              <FaHistory className="text-6xl text-green-500 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Transaction History</h3>
              <p className="text-gray-700">View your transaction history and keep track of your transfers.</p>
            </div>
            <div className="w-full md:w-1/5 p-4 text-center flex-center">
              <FaLock className="text-6xl text-green-500 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Store BTC Safely</h3>
              <p className="text-gray-700">Keep your Bitcoin safe with our advanced security features.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-green-500 text-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-12">Help</h2>
          <div className="flex flex-wrap justify-center items-center">
            <div className="w-full md:w-1/3 p-4 text-center flex-center">
              <FaHeadset className="text-6xl text-white mb-4" />
              <h3 className="text-2xl font-bold mb-2">Questions?</h3>
              <p className="text-gray-200">We’re here for you</p>
            </div>
            <div className="w-full md:w-1/3 p-4 text-center flex-center">
              <FaComments className="text-6xl text-white mb-4" />
              <h3 className="text-2xl font-bold mb-2">Community</h3>
              <p className="text-gray-200">Join our online community so you can be the first to hear about company news, new products and more.</p>
              <Link
                to="/community" className="btn btn-secondary border-2 border-white text-white text-lg px-4 py-2 rounded hover:bg-white hover:text-green-500 font-bold mt-4"
              >
                Join us
              </Link>
            </div>
            <div className="w-full md:w-1/3 p-4 text-center flex-center">
              <FaEnvelopeOpenText className="text-6xl text-white mb-4" />
              <h3 className="text-2xl font-bold mb-2">Contact us</h3>
              <p className="text-gray-200">Our Helpdesk is filled with in-depth articles, and if you need more help, we are always available to lend a helping hand through our contact form.</p>
              <Link
                to="/helpdesk" className="btn btn-secondary border-2 border-white text-white text-lg px-4 py-2 rounded hover:bg-white hover:text-green-500 font-bold mt-4"
              >
                Go to Helpdesk
              </Link>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6">
            <img src={logo} alt="logo" className="w-12 h-12 mx-auto mb-4" />
            <p className="text-lg font-bold">Safe Wallet</p>
            <p className="text-gray-400">Your secure Bitcoin Wallet</p>
          </div>
          <div className="flex justify-center mb-6">
            <Link to="/facebook" className="mx-2 text-white hover:text-gray-400">
              <FaFacebook size={24} />
            </Link>
            <Link to="/twitter" className="mx-2 text-white hover:text-gray-400">
              <FaTwitter size={24} />
            </Link>
            <Link to="/instagram" className="mx-2 text-white hover:text-gray-400">
              <FaInstagram size={24} />
            </Link>
            <Link to="/linkedin" className="mx-2 text-white hover:text-gray-400">
              <FaLinkedin size={24} />
            </Link>
          </div>
          <div className="text-gray-400">
            <p>&copy; 2024 Safe Wallet. All rights reserved.</p>
            <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link> | <Link to="/terms-of-service" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
