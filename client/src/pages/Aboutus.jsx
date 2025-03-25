import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  "MSU Unity Fest was an unforgettable experience! It was amazing to meet people from different backgrounds, exchange ideas, and build connections that will last a lifetime. I feel more connected to my university community than ever before.",
  "The event was well-organized, and I loved how engaging it was. The activities, speakers, and overall atmosphere were fantastic!",
  "I met so many wonderful people at the fest. It was a great opportunity to learn, share, and grow with a diverse group of individuals.",
  "An incredible event that truly brought students together. I can't wait for next year's fest!"
];

const AboutUs = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // Function to go to the next testimonial
  const nextTestimonial = () => {
    setFade(false);
    setTimeout(() => {
      setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
      setFade(true);
    }, 300);
  };

  // Function to go to the previous testimonial
  const prevTestimonial = () => {
    setFade(false);
    setTimeout(() => {
      setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
      setFade(true);
    }, 300);
  };

  // Automatically change testimonial every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 3000); // Change every 3 seconds
    return () => clearInterval(interval); // Clean up the interval
  }, [index]);

  return (
    <div className="bg-white text-black">
      {/* About Us Header */}
      <div
        className="text-center py-10 px-5"
        style={{
          background: "linear-gradient(90deg, rgba(198, 110, 17, 0.933) 0%, rgba(255, 218, 51, 0.933) 100%)"
        }}
      >
        <h2 className="text-xl font-bold text-white">ABOUT US</h2>
      </div>

      {/* About Us Content */}
      <div className="flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto p-6 gap-6">
        <div className="w-full md:w-[70%] space-y-6">
          <h1 className="text-3xl font-bold">
            Uniting Students, Building Connections, <br /> Creating Lasting Memories Together
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-yellow-400 p-4 rounded-lg">
              <span className="bg-yellow-400 text-white px-3 py-1 rounded-lg font-semibold">Our Mission</span>
              <p className="mt-2 text-gray-700">
                To bring students together to network, collaborate, and form meaningful connections in an inclusive environment that celebrates diversity and fosters lasting friendships.
              </p>
            </div>
            <div className="border border-orange-400 p-4 rounded-lg">
              <span className="bg-orange-400 text-white px-3 py-1 rounded-lg font-semibold">Our Vision</span>
              <p className="mt-2 text-gray-700">
                To be the ultimate student event that nurtures connections, inspires growth, and creates unforgettable memories.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[30%] flex justify-center">
          <img
            src="https://i.pinimg.com/originals/2b/73/9b/2b739bab4d0a6f6eee1434c6e4e6942e.jpg"
            alt="Students Connecting"
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>
      </div>

       {/* Organizing Team */}
       <div className="max-w-6xl mx-auto py-12 px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold uppercase relative inline-block">
            Organizing Team
            <span className="block w-20 mx-auto h-1 bg-yellow-500 mt-2"></span>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 justify-center">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="border-2 border-yellow-500 rounded-lg shadow-lg overflow-hidden">
              <img src="https://s3-alpha-sig.figma.com/img/8ee2/eefd/836175e893c06e49d7079abc8c400140?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=emjGNx6gmuRTt0bvX10fsuWBzbuepqqmVM0gbVhRhGZbvPfD4HTBwsAFh8pRoM59nSBYl1Tvx6SYp5deTKSXSQBQNFniQkbYqoC8fpVoockbnHSW8z1Fn0ltBt7nATzVLv7DwjmhO8xnRX2YVT8AsJ~UdRW84cijnIIc6NeIYFk3gQwosdiPN~20H6B-YkvyL~1C9TMgtGuzm9KLbIy-TlDeHd3OZ0JhQVmQyDSB8JMD7iCQpoMDnYn6~~SIOpd5k8pvxwCTp-7GfV1gdtMcOyUpPdZ4kuZwyOQdf9ZEfFE2AfB2YL9gkADOGz4KrxaAf8iSOllzZaX-gG3HeWT5Iw__" alt="Team Member" className="w-full h-40 object-cover" />
              <div className="text-center py-3">
                <h3 className="font-semibold">Name</h3>
                <p className="text-gray-600 text-sm">Position</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tech Team */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold uppercase relative inline-block">
            Tech Team
            <span className="block w-20 mx-auto h-1 bg-yellow-500 mt-2"></span>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 justify-center">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="border-2 border-yellow-500 rounded-lg shadow-lg overflow-hidden">
              <img src="https://s3-alpha-sig.figma.com/img/8ee2/eefd/836175e893c06e49d7079abc8c400140?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=emjGNx6gmuRTt0bvX10fsuWBzbuepqqmVM0gbVhRhGZbvPfD4HTBwsAFh8pRoM59nSBYl1Tvx6SYp5deTKSXSQBQNFniQkbYqoC8fpVoockbnHSW8z1Fn0ltBt7nATzVLv7DwjmhO8xnRX2YVT8AsJ~UdRW84cijnIIc6NeIYFk3gQwosdiPN~20H6B-YkvyL~1C9TMgtGuzm9KLbIy-TlDeHd3OZ0JhQVmQyDSB8JMD7iCQpoMDnYn6~~SIOpd5k8pvxwCTp-7GfV1gdtMcOyUpPdZ4kuZwyOQdf9ZEfFE2AfB2YL9gkADOGz4KrxaAf8iSOllzZaX-gG3HeWT5Iw__" alt="Team Member" className="w-full h-40 object-cover" />
              <div className="text-center py-3">
                <h3 className="font-semibold">Name</h3>
                <p className="text-gray-600 text-sm">Position</p>
              </div>
            </div>
          ))}
        </div>
      </div> 

      {/* Testimonials Section */}
      <section className="max-w-4xl mx-auto py-12 px-6 text-center relative">
        <h3 className="text-2xl font-bold uppercase relative inline-block">
          Testimonials
          <span className="block w-20 mx-auto h-1 bg-yellow-500 mt-2"></span>
        </h3>

        <div className="mt-6 flex items-center justify-center">
          {/* Left Arrow */}
          <div
            className="absolute left-0 top-1/ transform -translate-y-1/2 cursor-pointer z-10"
            onClick={prevTestimonial}
          >
            <ChevronLeft className="text-3xl text-yellow-500" />
          </div>

          {/* Testimonial Content */}
          <div
            className={`w-full h-20 transition-opacity duration-300 ${
              fade ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"
            }`}
          >
            <p className="text-lg italic text-gray-800">
              <span className="text-3xl font-bold text-yellow-500">“</span>
              {testimonials[index]}
              <span className="text-3xl font-bold text-yellow-500">”</span>
            </p>
          </div>

          {/* Right Arrow */}
          <div
            className="absolute right-0 top-1/ transform -translate-y-1/2 cursor-pointer z-10"
            onClick={nextTestimonial}
          >
            <ChevronRight className="text-3xl text-yellow-500" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
