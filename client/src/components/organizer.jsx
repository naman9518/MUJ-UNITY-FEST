import React from "react";
import { FaStar } from "react-icons/fa";

export default function EventOrganizer() {
  return (
    <div className="flex items-center justify-center min-h-[80vh] px-6 py-8 bg-white">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-10 max-w-5xl">
        {/* Left Side - Image with Design */}
        <div className="relative flex justify-center items-center">
          <div className="absolute w-40 h-40 bg-yellow-500 rounded-full -z-10 md:w-48 md:h-48" />
          <div className="absolute w-32 h-32 bg-orange-500 rounded-full -z-20 md:w-40 md:h-40" />
          <div className="absolute w-44 h-44 bg-yellow-300 rounded-full -z-30 md:w-52 md:h-52" />
          <img
            src="https://www.vdainc.com/wp-content/uploads/2018/09/Emerson-College-Alumni-Weekend-2017_1100x688.jpg"
            alt="Event"
            className="w-48 h-48 object-cover rounded-full shadow-lg md:w-64 md:h-64"
          />
          
        </div>

        {/* Right Side - Text and Bullet Points */}
        <div className="text-center md:text-left">
          <p className="text-yellow-600 font-semibold uppercase">
            All About
          </p>
          <h2 className="text-2xl md:text-3xl font-bold">Our Organizer</h2>
          <div className="w-16 h-1 bg-yellow-500 my-2 mx-auto md:mx-0"></div>
          <p className="text-gray-600 my-4 text-sm md:text-base">
            The event details go here. Describe the organizer, purpose, and key aspects of the event.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-2 justify-center md:justify-start">
                <FaStar className="text-yellow-500" />
                <p className="text-gray-700 font-semibold text-sm md:text-base">
                  Bullet Point {i + 1}
                </p>
              </div>
            ))}
          </div>

          <button className="mt-6 bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-all shadow-lg">
            REGISTER NOW
          </button>
        </div>
      </div>
    </div>
  );
}
