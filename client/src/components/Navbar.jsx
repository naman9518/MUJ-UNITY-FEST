import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.png";
import instagram from "../assets/instagram.svg";
import whatsapp from "../assets/whatsapp.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full shadow-md">
      {/* Social Links */}
      <div className="bg-secondary text-white py-3 px-6 flex justify-between items-center md:justify-end gap-6 text-sm md:text-md">
        <div className="flex items-center gap-2">
          <img src={instagram} className="h-5 md:h-6" alt="Instagram" />
          <span>Instagram</span>
        </div>
        <div className="flex items-center gap-2">
          <img src={whatsapp} className="h-4 md:h-5" alt="WhatsApp" />
          <span>Whatsapp</span>
        </div>
      </div>

      {/* Navbar Section */}
      <div className="bg-[#FFC857] flex items-center justify-between px-6 md:px-10 relative">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" className="h-18 md:h-25" />
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-black text-3xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaBars />
        </button>

        {/* Nav Links */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex absolute md:static top-full left-0 w-full bg-white md:w-auto shadow-md md:shadow-none p-10 md:p-0 z-50 rounded-xl`}
        >
          <ul className="flex flex-col md:flex-row gap-4 md:gap-6 text-black font-medium text-base p-4 rounded-xl 
            md:border-2 md:border-yellow-700 md:shadow-md">
            {[
              { name: "Home", path: "/" },
              { name: "Competitions", path: "/competitions" },
              { name: "Sponsor", path: "/sponsor" },
              { name: "About Us", path: "/aboutus" },
              { name: "Contact Us", path: "#contact", isAnchor: true }
            ].map((item, index) => (
              <li
                key={item.name}
                className={`flex items-center gap-6 pr-4 md:pr-6 ${
                  index !== 4 ? "md:border-r-2 md:border-yellow-500" : ""
                }`}
              >
                <Link
                  to={item.path}
                  className="relative hover:underline hover:decoration-secondary hover:decoration-4 hover:transition-all hover:duration-400"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Login & Signup */}
        <div className="hidden md:flex gap-4">
          <Link
            to="/signin"
            className="bg-secondary hover:bg-primary text-white hover:text-black px-6 py-2 rounded shadow font-semibold"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="border bg-white border-[#C87826] px-6 py-2 rounded shadow font-semibold"
          >
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
