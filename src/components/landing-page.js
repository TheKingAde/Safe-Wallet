// LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaLock, FaBitcoin, FaChartLine, FaPaperPlane, FaInbox, FaHistory, FaComments, FaEnvelopeOpenText, FaHeadset, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import logo from '../assets/wallet.png';

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
          <Carousel showThumbs={false} showStatus={false} autoPlay infiniteLoop interval={5000} showIndicators={false}>
            <div>
              <h1 className="welcome-text text-6xl font-bold mb-4 text-white">Welcome to Safe Wallet</h1>
            </div>
            <div>
              <h2 className="welcome-text text-6xl font-bold mb-4 text-white">Your secure Crypto Wallet</h2>
            </div>
          </Carousel>
        </div>
      </section>
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 text-center">
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
              <FaShieldAlt className="text-6xl text-green-500 mb-4 mx-auto" />
              <h3 className="text-2xl font-bold mb-2">Highly Secure</h3>
              <p className="text-gray-700">Our wallet uses state-of-the-art encryption to protect your assets, ensuring that only you have access to your funds.</p>
            </div>
            <div className="w-full md:w-1/3 p-4 text-center flex-center">
              <FaLock className="text-6xl text-green-500 mb-4 mx-auto" />
              <h3 className="text-2xl font-bold mb-2">Encrypted</h3>
              <p className="text-gray-700">We utilize robust encryption methods to keep your private keys and data secure from unauthorized access.</p>
            </div>
            <div className="w-full md:w-1/3 p-4 text-center flex-center">
              <FaBitcoin className="text-6xl text-green-500 mb-4 mx-auto" />
              <h3 className="text-2xl font-bold mb-2">Trusted</h3>
              <p className="text-gray-700">Join millions of users who trust Safe Wallet to manage and protect their cryptocurrency investments.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white-100 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-12">Features</h2>
          <div className="flex flex-wrap justify-center items-center">
            <div className="w-full md:w-1/5 p-4 text-center flex-center">
              <FaChartLine className="text-6xl text-green-500 mb-4 mx-auto" />
              <h3 className="text-2xl font-bold mb-2">Bitcoin Chart</h3>
              <p className="text-gray-700">Monitor Bitcoin price trends and analyze historical data to make informed decisions.</p>
            </div>
            <div className="w-full md:w-1/5 p-4 text-center flex-center">
              <FaPaperPlane className="text-6xl text-green-500 mb-4 mx-auto" />
              <h3 className="text-2xl font-bold mb-2">Send BTC</h3>
              <p className="text-gray-700">Send Bitcoin to any address quickly and securely with our easy-to-use interface.</p>
            </div>
            <div className="w-full md:w-1/5 p-4 text-center flex-center">
              <FaInbox className="text-6xl text-green-500 mb-4 mx-auto" />
              <h3 className="text-2xl font-bold mb-2">Receive BTC</h3>
              <p className="text-gray-700">Generate unique wallet addresses to receive Bitcoin safely and efficiently.</p>
            </div>
            <div className="w-full md:w-1/5 p-4 text-center flex-center">
              <FaHistory className="text-6xl text-green-500 mb-4 mx-auto" />
              <h3 className="text-2xl font-bold mb-2">Transaction History</h3>
              <p className="text-gray-700">Keep track of all your transactions with our detailed history feature.</p>
            </div>
            <div className="w-full md:w-1/5 p-4 text-center flex-center">
              <FaLock className="text-6xl text-green-500 mb-4 mx-auto" />
              <h3 className="text-2xl font-bold mb-2">Store BTC Safely</h3>
              <p className="text-gray-700">Our wallet offers advanced security features to ensure your Bitcoin is stored safely and securely.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-green-500 text-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-12">Help</h2>
          <div className="flex flex-wrap justify-center items-center">
            <div className="w-full md:w-1/3 p-4 text-center flex-center">
              <FaHeadset className="text-6xl text-white mb-4 mx-auto" />
              <h3 className="text-2xl font-bold mb-2">Questions?</h3>
              <p className="text-gray-200 mb-4">Our support team is here to assist you with any questions or issues you may have.</p>
            </div>
            <div className="w-full md:w-1/3 p-4 text-center flex-center">
              <FaComments className="text-6xl text-white mb-4 mx-auto" />
              <h3 className="text-2xl font-bold mb-2">Community</h3>
              <p className="text-gray-200 mb-4">Join our community to stay updated on the latest news, product updates, and more.</p>
              <Link
                to="/community"
                className="btn btn-secondary border-2 border-white text-white text-lg px-4 py-2 rounded hover:bg-white hover:text-green-500 font-bold mt-6"
              >
                Join us
              </Link>
            </div>
            <div className="w-full md:w-1/3 p-4 text-center flex-center">
              <FaEnvelopeOpenText className="text-6xl text-white mb-4 mx-auto" />
              <h3 className="text-2xl font-bold mb-2">Contact us</h3>
              <p className="text-gray-200 mb-4">For inquiries or support, feel free to reach out to us directly.</p>
              <Link
                to="/contact"
                className="btn btn-secondary border-2 border-white text-white text-lg px-4 py-2 rounded hover:bg-white hover:text-green-500 font-bold mt-6"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-green-500 text-white py-6">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-sm">
            &copy; {new Date().getFullYear()} Safe Wallet. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-green-200">
              <FaFacebook />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-green-200">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-green-200">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-green-200">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
