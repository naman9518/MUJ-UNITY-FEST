import React, { useState } from "react";
import { PiWhatsappLogoFill } from "react-icons/pi";
import { FaInstagramSquare } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from "../assets/IMG-20250408-WA0000-Photoroom.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="w-full p-8  h-25  bg-white -mt-5 -ml-8 relative   z-50">
  

      {/* Main navbar */}
      <div className="w-full h-25 -mt-3  backdrop-blur-xl bg-blend-color  bg-white/70  fixed   flex items-center justify-between">
        {/* Logo */}
        <div className=" ml-9 ">
          <img src={logo} alt="Logo" className="w-15   h-20 " />
        </div>

        {/* Center Navigation - Hidden on mobile */}
        <div className="  items-center  font-['Poppins']  gap-1 m  border-b-4 border-b-transparent  ">
          {["Home", "Competitions", "Sponsor", "About-Us", "Contact-Us"].map(
            (item, index) => {
              const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
              return (
                <NavLink
                  key={index}
                  to={path}
                  className={({ isActive }) =>
                    `text-neutral-400 mr-20 font-medium px-2 text-sm   hover:text-neutral-600 hover:text-sm hover:border-b-4 hover:border-b-orange-500 ${
                      isActive
                        ? "text-neutral-600 text-base border-b-4 border-b-orange-500  "
                        : "  text-base border-b-4 border-b-transparent"
                    }  `
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
        <div className=" gap-3 flex mr-30   items-center  ">
          <button className="  text-white bg-orange-500 font-semibold py-1.5 sm:py-1  sm:px-4 rounded-md shadow hover:bg-white hover: hover:cursor-pointer hover:border-1 border-orange-500 hover:text-black text-sm sm:text-base">
            Login
          </button>
          <button className="bg-white border-1 border-orange-500 text-black font-semibold py-1.5 sm:py-1 px-3 sm:px-4 hover:text-white hover:bg-orange-400  hover:cursor-pointer rounded-md text-sm sm:text-base">
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
