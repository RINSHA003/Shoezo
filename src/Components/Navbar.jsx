import React, { useContext } from "react";
import { CgProfile } from "react-icons/cg";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Mycontext } from "../App";

const Navbar = () => {
  const { cartfetch } = useContext(Mycontext);

     const navigate=useNavigate()

    const handleLogout = () => {
      localStorage.removeItem('id');
      navigate('/login');
    };
  

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4 flex items-center justify-between py-4">
        {/* Logo */}
        <div className="font-bold text-2xl text-gray-800">
          <Link to="/">SHOEZO</Link>
        </div>

        {/* Links for Desktop */}
        <div className="hidden md:flex space-x-8 mr-1">
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:text-blue-500 cursor-pointer">
                Home
              </Link>
            </li>
            <li>
              <Link
                to={`/category/${`Men`}`}
                className="hover:text-blue-500 cursor-pointer"
              >
                Men
              </Link>
            </li>
            <li>
              <Link
                to={`/category/${"Women"}`}
                className="hover:text-blue-500 cursor-pointer"
              >
                Women
              </Link>
            </li>
            <li>
              <Link
                to={`/category/${`Kids`}`}
                className="hover:text-blue-500 cursor-pointer"
              >
                Kids
              </Link>
            </li>
            <li>
              <Link to="/brands" className="hover:text-blue-500 cursor-pointer">
                Brands
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact and Icons */}
        <div className="flex items-center space-x-4">
          <ul className="flex space-x-6 items-center">
            <Link to="/contactus">
              <li className="hover:text-blue-500 cursor-pointer">Contact</li>
            </Link>
            <li className="hover:text-blue-500 cursor-pointer relative">
              <Link to="/cart">
                <FaShoppingCart
                  className="text-xl"
                  aria-label="Shopping Cart"
                />
                {cartfetch.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartfetch.length}
                  </span>
                )}
              </Link>
            </li>
            <li className="hover:text-blue-500 cursor-pointer">
              <Link to="/login">
                <CgProfile className="text-2xl" aria-label="Profile" />
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="mt-auto px-3 py-1 bg-red-400 rounded-lg hover:bg-red-600 transition duration-200">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
