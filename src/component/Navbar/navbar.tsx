import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-slate py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="brand text-white">
        <img className="w-40 h-250" src="logo-full.png" alt="RHSync Hub"  />
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-white"
            aria-label="Toggle mobile menu"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
        <nav
          className={`${
            isMobileMenuOpen ? "block" : "hidden md:flex md:items-center md:space-x-6"
          }`}
        >
          <ul className="md:flex space-x-4 text-white">
            <li>
              <a href="#!" className="hover:text-indigo-500 transition duration-300">
                Home
              </a>
            </li>
            <li>
              <a href="#!" className="hover:text-indigo-500 transition duration-300">
                About
              </a>
            </li>
            {/* Add more menu items as needed */}
          </ul>
        </nav>
        <div className="hidden md:flex items-center space-x-4">
          <img src="user.jpg" alt="User" className="w-12 h-10 rounded-full" />
          {/* Add user image */}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
