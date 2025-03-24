import React from "react";

const Hero = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Full-Screen Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/herovideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Background Overlay (For Better Visibility) */}
      <div className="absolute inset-0 bg-black/40 md:bg-black/20"></div>

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 md:px-10">
        <h1 className="text-3xl md:text-5xl font-bold">Welcome to Our World</h1>
        <p className="text-sm md:text-lg mt-3 max-w-2xl">
          Experience the beauty of immersive storytelling through stunning visuals.
        </p>
        <button className="mt-6 px-6 py-2 text-lg bg-yellow-400 text-black rounded-lg shadow-md hover:bg-yellow-500 transition">
          Explore More
        </button>
      </div>
    </div>
  );
};

export default Hero;
