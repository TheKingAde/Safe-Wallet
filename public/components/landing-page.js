import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import logo from '../assets/wallet.png';
import image1 from '../assets/c-image1.jpg'; // replace with your actual image paths
import image2 from '../assets/c-image2.jpg';
import image3 from '../assets/c-image3.jpg';
import image4 from '../assets/c-image4.jpg';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="bg-green-500 text-white p-4 flex justify-between items-center">
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
      <section className="relative">
      <div>
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          interval={3000}
          className="w-full h-full absolute top-0 left-0"
        >
          <div>
            <img src={image1} alt="Slide 1" className="object-cover w-full h-full" />
          </div>
          <div>
            <img src={image2} alt="Slide 2" className="object-cover w-full h-full" />
          </div>
          <div>
            <img src={image3} alt="Slide 3" className="object-cover w-full h-full" />
          </div>
          <div>
            <img src={image4} alt="Slide 4" className="object-cover w-full h-full" />
          </div>
        </Carousel>
        </div>
        <div className="relative z-10 text-center py-20">
          <h1 className="text-8xl font-bold mb-4">Welcome to Safe Wallet</h1>
          <p className="text-3xl text-gray-700 mb-8">Your secure Bitcoin wallet application</p>
          <Link
            to="/auth" className="btn btn-primary border-green bg-green-500 text-white text-lg font-bold py-3 px-6 rounded hover:text-green-500 hover:bg-white"
          >
            Get Started
          </Link>
        </div>
      </section>
      <section className="bg-white py-20">
        {/* Add more sections or components here as needed */}
      </section>
    </div>
  );
}

export default LandingPage;
