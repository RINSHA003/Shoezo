import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {/* About Us */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-white">About Us</h3>
          <p className="text-gray-400">We are committed to providing the best shoes for every occasion, combining comfort, style, and durability.</p>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-white">Shop</h3>
          <ul>
            <li className="mb-2"><Link to="/men" className="hover:text-white">Shop Men</Link></li>
            <li className="mb-2"><Link to="/women" className="hover:text-white">Shop Women</Link></li>
            <li className="mb-2"><Link to="/collection" className="hover:text-white">Collection</Link></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-white">Customer Service</h3>
          <ul>
            <li className="mb-2"><Link to="/faq" className="hover:text-white">FAQs</Link></li>
            <li className="mb-2"><Link to="/shipping-returns" className="hover:text-white">Shipping & Returns</Link></li>
            <li className="mb-2"><Link to="/size-guide" className="hover:text-white">Size Guide</Link></li>
            <li className="mb-2"><Link to="/track-order" className="hover:text-white">Track Order</Link></li>
          </ul>
        </div>
      </div>

      {/* Social Links */}
      <div className="flex justify-center mt-8 space-x-6 text-2xl">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
          <FaFacebook />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
          <FaInstagram />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
          <FaTwitter />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
          <CiLinkedin />
        </a>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-gray-500">
        <p>&copy; 2024 Shoezo. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
