import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-white text-black">
      {/* About Us Section */}
      <div
        className="text-center py-10 px-5"
        style={{ background: "linear-gradient(90deg, rgba(198, 110, 17, 0.933333) 0%, rgba(255, 218, 51, 0.933333) 100%)" }}
      >
        <h2 className="text-xl font-bold text-white">ABOUT US</h2>
      </div>

      <div className="max-w-5xl mx-auto py-10 px-5 text-center">
        <h3 className="text-2xl font-bold">Uniting Students, Building Connections, Creating Lasting Memories Together</h3>
        <div className="flex flex-col md:flex-row justify-center items-center gap-5 mt-5">
          <div className="border border-yellow-600 p-5 rounded-md text-left w-80">
            <h4 className="bg-yellow-400 inline-block px-2 py-1 rounded-md font-semibold">Our Mission</h4>
            <p className="mt-2 text-sm">To bring students together to network, collaborate, and form meaningful connections in an inclusive environment that celebrates diversity and fosters lasting friendships.</p>
          </div>
          <div className="border border-yellow-600 p-5 rounded-md text-left w-80">
            <h4 className="bg-yellow-400 inline-block px-2 py-1 rounded-md font-semibold">Our Vision</h4>
            <p className="mt-2 text-sm">To be the ultimate student event that nurtures connections, inspires growth, and creates unforgettable memories.</p>
          </div>
        </div>
      </div>

      {/* Organizing Team */}
      <section className="text-center py-10">
        <h3 className="text-xl font-bold">ORGANIZING TEAM</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-5xl mx-auto py-5">
          {Array(6).fill(0).map((_, index) => (
            <div key={index} className="border border-yellow-600 p-4 rounded-md text-center">
              <div className="w-32 h-32 bg-gray-300 mx-auto rounded-md"></div>
              <h4 className="mt-3 font-bold">Name</h4>
              <p className="text-sm text-gray-600">Position</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Team */}
      <section className="text-center py-10">
        <h3 className="text-xl font-bold">TECH TEAM</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-5xl mx-auto py-5">
          {Array(6).fill(0).map((_, index) => (
            <div key={index} className="border border-yellow-600 p-4 rounded-md text-center">
              <div className="w-32 h-32 bg-gray-300 mx-auto rounded-md"></div>
              <h4 className="mt-3 font-bold">Name</h4>
              <p className="text-sm text-gray-600">Position</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="text-center py-10 max-w-5xl mx-auto">
        <h3 className="text-xl font-bold">TESTIMONIALS</h3>
        <p className="italic mt-5">“MSU Unity Fest was an unforgettable experience! It was amazing to meet people from different backgrounds, exchange ideas, and build connections that will last a lifetime. I feel more connected to my university community than ever before.”</p>
      </section>
    </div>
  );
};

export default AboutUs;
