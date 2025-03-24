import React from "react";
import { FaFacebook, FaTwitter, FaYoutube, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white text-black py-10 font-[Poppins]">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border rounded-lg p-6 shadow-lg">
        {/* Contact Section */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">📞 Contact Us Anytime</h3>
          <p className="text-gray-600">32324313</p>

          <h3 className="font-semibold text-lg">📧 Mail Us</h3>
          <p className="text-gray-600">example@mail.com</p>
        </div>

        {/* Video Meet & Office Location */}
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
            <FaFacebook className="text-[#C66E11] text-2xl cursor-pointer" />
            <FaTwitter className="text-[#C66E11] text-2xl cursor-pointer" />
            <FaYoutube className="text-[#C66E11] text-2xl cursor-pointer" />
            <FaLinkedin className="text-[#C66E11] text-2xl cursor-pointer" />
            <FaInstagram className="text-[#C66E11] text-2xl cursor-pointer" />
          </div>

          <div className="flex items-center border rounded-md overflow-hidden">
            <input
              type="email"
              placeholder="Enter Your Email"
              className="flex-grow px-4 py-2 outline-none"
            />
            <button className="bg-[#C66E11] text-white px-4 py-2 font-medium hover:bg-[#A55C0B]">Subscribe</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
