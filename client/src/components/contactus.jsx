import React from "react";

const ContactUs = () => {
  return (
    <div id="contact" className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      {/* Heading Section */}
      <h3 className="text-yellow-600 font-semibold uppercase">All About</h3>
      <h1 className="text-2xl md:text-3xl font-bold">Contact Us</h1>
      <div className="w-16 h-1 my-2 bg-[#C66E11]"></div>

      {/* Contact Form */}
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl flex flex-col md:flex-row items-center justify-center">
        {/* Left Side */}
        <div 
          className="w-full md:w-1/3 text-white p-6 rounded-t-lg md:rounded-l-lg md:rounded-tr-none flex flex-col items-center text-center py-29"
          style={{ backgroundColor: "rgba(198, 110, 17, 0.93)" }}
        >
          <h2 className="text-xl font-bold mb-4">Contact Us</h2>
          <p className="text-sm mb-4">
            Fill up the form and our team will get back to you or get in contact with us today to discuss your needs.
          </p>
          <div className="space-y-3">
            <p>📞 +91-5353535353</p>
            <p>💬 harjitkapoor3</p>
            <p>✉️ info@fd.ca</p>
            <div className="flex space-x-2 mt-2">
              <span className="bg-yellow-500 p-2 rounded-full">📷</span>
              <span className="bg-yellow-500 p-2 rounded-full">🔗</span>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-2/3 p-6">
          <h2 className="text-xl font-bold mb-4">Share your queries with us, Get in touch now!</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Enter Full Name" className="border p-2 rounded w-full" />
            <input type="text" placeholder="Enter City Name" className="border p-2 rounded w-full" />
            <input type="email" placeholder="Example@mail.com" className="border p-2 rounded col-span-2 w-full" />
            <div className="flex col-span-2 space-x-2">
              <select className="border p-2 rounded w-1/3">
                <option>IN</option>
                <option>US</option>
              </select>
              <input type="text" placeholder="+91 XXXXX XXXXX" className="border p-2 rounded flex-grow" />
            </div>
            <input type="text" placeholder="Enter Subject" className="border p-2 rounded col-span-2 w-full" />
            <textarea placeholder="Type Your Message Here..." className="border p-2 rounded col-span-2 w-full h-24"></textarea>
          </div>

          <div className="flex flex-wrap space-x-2 mt-4">
            <button className="border px-4 py-2 rounded  hover:bg-yellow-200">Event</button>
            <button className="border px-4 py-2 rounded hover:bg-gray-200">Sponsor</button>
            <button className="border px-4 py-2 rounded hover:bg-gray-200">Competition</button>
            <button className="border px-4 py-2 rounded hover:bg-gray-200">Other</button>
          </div>

          <button className="bg-[#C66E11] text-white px-6 py-2 mt-4 rounded flex items-center justify-center hover:bg-orange-700 transition duration-300">
            Send Message ➜
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
