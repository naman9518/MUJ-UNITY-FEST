import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Gallery = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const images = [1, 2, 3, 4, 5, 6];

  return (
    <div className="flex flex-col items-center py-10 px-4">
      <h2 className="text-yellow-600 font-semibold uppercase">ALL ABOUT</h2>
      <h1 className="text-2xl md:text-3xl font-bold">GALLERY</h1>
      <div className="w-16 h-1 bg-yellow-400 mt-2 mb-6"></div>

      {/* Centered Grid with Balanced Arrow Spacing */}
      <div className="relative flex justify-center items-center w-full max-w-5xl mx-auto">
        {/* Left Arrow */}
        <button className="absolute left-[-60px] p-2 bg-yellow-400 rounded-full hidden md:block">
          <ArrowLeft />
        </button>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
          {images.map((img, index) => (
            <div
              key={index}
              className={`relative bg-gray-300 h-40 w-full md:w-56 flex justify-center items-end transition-all duration-300 ${
                hoveredIndex === index ? "scale-110 bg-yellow-400" : ""
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="absolute bottom-0 w-full bg-black text-white text-center p-2 opacity-80">
                EVENT NAME
              </div>
              {hoveredIndex === index && (
                <button className="absolute top-1/2 transform -translate-y-1/2 bg-white px-4 py-2 text-black rounded-md shadow-md">
                  ENLARGE IMAGE ↗
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button className="absolute right-[-60px] p-2 bg-yellow-400 rounded-full hidden md:block">
          <ArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Gallery;
