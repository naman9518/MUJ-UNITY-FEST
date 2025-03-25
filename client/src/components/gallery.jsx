import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Gallery = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // State to store clicked image

  const images = [
    "https://jina-ai-gmbh.ghost.io/content/images/2023/03/image--6-.jpg",
    "https://blog.pincel.app/wp-content/uploads/2023/09/0-add-hidden-text-or-symbol-into-AI-photo.jpg",
    "https://johneengle.com/wp-content/uploads/2023/05/ai-image-generator.jpg",
    "https://th.bing.com/th/id/OIP.-OPlR_eRVYNy5IbdXCW5rwHaDt?rs=1&pid=ImgDetMain",
    "https://th.bing.com/th/id/OIP.Y64zo6idinAtdWb-NOktKQHaHa?rs=1&pid=ImgDetMain",
    "https://img.freepik.com/premium-photo/sunset-river_948735-270276.jpg",
  ];

  const handleImageClick = (img) => {
    setSelectedImage(img); // Set clicked image to state
  };

  const closeModal = () => {
    setSelectedImage(null); // Close the modal
  };

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-3xl">
          {images.map((img, index) => (
            <div
              key={index}
              className={`relative h-52 w-full md:w-56 flex justify-center items-end transition-all duration-300 rounded-lg overflow-hidden ${
                hoveredIndex === index ? "scale-105 shadow-lg" : ""
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleImageClick(img)} // Handle image click
            >
              <img src={img} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 w-full bg-yellow-600 text-white text-center p-2 opacity-80">
                EVENT NAME
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button className="absolute right-[-60px] p-2 bg-yellow-400 rounded-full hidden md:block">
          <ArrowRight />
        </button>
      </div>

      {/* Modal for Enlarged Image */}
      {selectedImage && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div className="relative">
            <button
              className="absolute top-4 right-4 text-yellow-800 text-4xl"
              onClick={closeModal}
            >
              &times; {/* Close button */}
            </button>
            <img
              src={selectedImage}
              alt="Enlarged View"
              className="max-w-4xl max-h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
