import React, { useState } from "react";
import { PiWhatsappLogoFill } from "react-icons/pi";
import { FaInstagramSquare } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from "../assets/main/logo.jpg";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="w-full relative z-50">
      {/* Top social bar */}
      <div className="bg-secondary px-4 py-2 flex justify-end space-x-4 text-white text-sm font-medium">
        <a href="#" className="flex items-center space-x-1 hover:underline">
          <FaInstagramSquare size={18} className="text-pink-500" />
          <span>Instagram</span>
        </a>
        <a href="#" className="flex items-center space-x-1 hover:underline">
          <PiWhatsappLogoFill size={18} className="text-green-500" />
          <span>Whatsapp</span>
        </a>
      </div>

      {/* Main navbar */}
      <div className="w-full bg-primary px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img src={logo} alt="Logo" className="h-12 md:h-16 object-contain" />
        </div>

        {/* Center Navigation - Hidden on mobile */}
        <div className="hidden md:flex bg-white border-2 border-secondary rounded-full shadow-md px-6 py-4 items-center space-x-4 lg:space-x-6">
          {["Home", "Competitions", "Sponsor", "About-Us", "Contact-Us"].map(
            (item, index) => {
              const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
              return (
                <NavLink
                  key={index}
                  to={path}
                  className={({ isActive }) =>
                    `text-black font-medium px-2 hover:text-orange-500 relative ${
                      isActive
                        ? "text-orange-600 font-semibold underline underline-offset-4"
                        : ""
                    }`
                  }
                >
                  {item}
                </NavLink>
              );
            }
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            <GiHamburgerMenu size={26} className="text-white" />
          </button>
        </div>

        {/* Buttons */}
        <div className="hidden sm:flex items-center space-x-2 sm:space-x-4">
          <button className="bg-secondary text-white font-semibold py-1.5 sm:py-2 px-4 sm:px-8 rounded-md shadow hover:bg-[#b26617] text-sm sm:text-base">
            Login
          </button>
          <button className="bg-white text-black font-semibold py-1.5 sm:py-2 px-4 sm:px-8 hover:text-white hover:bg-secondary rounded-md border text-sm sm:text-base">
            Signup
          </button>
        </div>
      </div>

      {/* Mobile Full Screen Menu (only page links) */}
      {menuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-white z-50 flex flex-col items-center justify-center space-y-8 transition-all duration-300">
          <button
            onClick={closeMenu}
            className="absolute top-6 right-6 text-3xl text-secondary"
          >
            <IoClose />
          </button>
          {["Home", "Competitions", "Sponsor", "About-Us", "Contact-Us"].map(
            (item, index) => {
              const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
              return (
                <NavLink
                  key={index}
                  to={path}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `text-2xl font-semibold ${
                      isActive ? "text-orange-500 underline" : "text-black"
                    }`
                  }
                >
                  {item}
                </NavLink>
              );
            }
          )}
        </div>
      )}
    </div>
  );
}
