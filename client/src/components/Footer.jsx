import React from "react";
import logo from "../assets/logo.png";
import { FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#C66E11] to-[#FFDA33] py-10 px-5">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Section - Logo & Description */}
        <div className="bg-white rounded-tl-3xl rounded-br-3xl p-6 shadow-md flex flex-col items-center w-full">
         <img src={logo} alt="Unity Fest Logo" className="w-28" />
          <p className="text-gray-700 mt-4 text-center">
            Muj unity fest about Muj unity fest about Muj unity fest about Muj unity fest about Muj unity fest about
          </p>
        </div>

        {/* Middle Section - Navigation */}
        <div className="bg-white rounded-lg p-6 shadow-md flex flex-col items-center w-full">
          <h3 className="text-lg font-bold">Navigation</h3>
          <div className="w-10 h-[3px] bg-yellow-400 mt-2 mb-3"></div>
          <ul className="space-y-2 text-gray-700 text-center">
            <li className="hover:text-[#C66E11] cursor-pointer">Home</li>
            <li className="hover:text-[#C66E11] cursor-pointer">Competitions</li>
            <li className="hover:text-[#C66E11] cursor-pointer">Sponsor</li>
            <li className="hover:text-[#C66E11] cursor-pointer">About Us</li>
            <li className="hover:text-[#C66E11] cursor-pointer">Contact Us</li>
          </ul>
        </div>

        {/* Right Section - Map & QR Code */}
        <div className="bg-white rounded-lg p-6 shadow-md flex w-full gap-6">
          <div className="w-1/2 flex items-center justify-center bg-gray-300 h-50 font-bold text-xl">
            Map
          </div>
          <div className="w-1/2 flex items-center justify-center bg-gray-300 h-50 font-bold text-xl border-l-2 border-gray-300">
            QR
          </div>
        </div>
      </div>

     {/* Contact Section */}
<div className="w-full px-6">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border rounded-lg p-6 shadow-lg mt-6 bg-white">
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">📞 Contact Us Anytime</h3>
      <p className="text-gray-600">32324313</p>

      <h3 className="font-semibold text-lg">📧 Mail Us</h3>
      <p className="text-gray-600">example@mail.com</p>
    </div>

    <div className="space-y-4">
      <h3 className="font-semibold text-lg">📹 Video Meet With Us</h3>
      <p className="text-gray-600">Join our virtual meeting</p>

      <h3 className="font-semibold text-lg">📍 Office Location</h3>
      <p className="text-gray-600">123 Business Street, City</p>
    </div>

    {/* Follow/Subscribe Section */}
    <div className="text-center">
      <h3 className="text-lg font-semibold">Follow/Subscribe Us</h3>
      <div className="w-20 h-[3px] bg-yellow-400 mx-auto my-2"></div>
      <div className="flex justify-center items-center gap-4 my-4">
        <FaFacebookF className="text-[#C66E11] text-2xl cursor-pointer hover:text-[#A55C0B]" />
        <FaTwitter className="text-[#C66E11] text-2xl cursor-pointer hover:text-[#A55C0B]" />
        <FaYoutube className="text-[#C66E11] text-2xl cursor-pointer hover:text-[#A55C0B]" />
        <FaLinkedinIn className="text-[#C66E11] text-2xl cursor-pointer hover:text-[#A55C0B]" />
        <FaInstagram className="text-[#C66E11] text-2xl cursor-pointer hover:text-[#A55C0B]" />
      </div>

      <div className="flex items-center border rounded-md overflow-hidden">
        <input
          type="email"
          placeholder="Enter Your Email"
          className="flex-grow px-4 py-2 outline-none"
        />
        <button className="bg-[#C66E11] text-white px-4 py-2 font-medium hover:bg-[#A55C0B]">
          Subscribe
        </button>
      </div>
    </div>
  </div>
</div>

    </footer>
  );
};

export default Footer;
