import React from "react";

const EventSection = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between p-15 max-w-6xl mx-auto">
      <div className="md:w-1/2 text-center md:text-left">
        <p className="text-yellow-600 font-semibold uppercase">All About</p>
        <h2 className="text-2xl md:text-3xl font-bold">The Event</h2>
        <div className="w-16 h-1 bg-yellow-500 my-2 mx-auto md:mx-0"></div>
        <p className="text-gray-600 mt-4">
          The event The event The event The event The event The event The event The event The event
          The event The event The event The event The event The event The event The event.
        </p>

      
        <div className="flex justify-center md:justify-start gap-8 mt-6">
          <div className="text-center">
            <p className="text-2xl font-bold">20</p>
            <p className="text-gray-600">Bands</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">15</p>
            <p className="text-gray-600">Food Trucks</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">20+</p>
            <p className="text-gray-600">Events</p>
          </div>
        </div>

        {/* Button */}
        <button className="mt-6 bg-yellow-600 text-white px-6 py-2 rounded-md hover:bg-yellow-700">
          Register Now
        </button>
      </div>

      {/* Right Side - Image */}
      <div className="relative mt-8 md:mt-0 md:w-1/2 flex justify-center">
        <div className="relative">
          <img
            src="https://wallpaperaccess.com/full/6133765.jpg" 
            alt="Event Fireworks"
            className="w-64 h-64 object-cover rounded-full border-4 border-white shadow-lg"
          />
    
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full"></div>
          <div className="absolute top-8 -left-6 w-6 h-6 bg-yellow-500 rounded-full"></div>
          <div className="absolute -bottom-6 right-6 w-4 h-4 border-2 border-black rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default EventSection;
