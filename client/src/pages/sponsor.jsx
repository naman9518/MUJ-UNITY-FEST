import React from "react";

const Sponsors = () => {
  return (
    <div className="w-full bg-white">
      {/* Header */}
      <div
        className="text-center py-10 px-5"
        style={{
          background:
            "linear-gradient(90deg, rgba(198, 110, 17, 0.933) 0%, rgba(255, 218, 51, 0.933) 100%)",
        }}
      >
        <h2 className="text-xl font-bold text-white">SPONSORS</h2>
      </div>

      {/* Sponsor Cards (Single Row) */}
      <div className="w-full flex justify-center overflow-x-auto gap-6 p-6">
  <div className="max-w-5xl flex flex-nowrap gap-6">
    {[1, 2, 3].map((item) => (
      <div key={item} className="border p-6 text-center shadow-md min-w-[250px]">
        <h3 className="text-lg font-medium">Sponsor type</h3>
        <p className="text-gray-500">Name of Sponsor</p>
      </div>
    ))}
  </div>
</div>


      {/* Sponsor Types */}
      {[1, 2].map((section) => (
        <div
          key={section}
          className="border p-6 max-w-5xl mx-auto mb-4 shadow-md"
        >
          <h3 className="text-xl font-bold">Sponsor type</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mt-2 text-gray-600">
            {[...Array(6)].map((_, idx) => (
              <p key={idx}>Name of Sponsor</p>
            ))}
          </div>
        </div>
      ))}

      {/* Button */}
      <div className="text-center mt-6">
        <button className="bg-yellow-500 text-white py-2 px-6 rounded shadow-md">
          Become a Sponsor
        </button>
      </div>

      {/* Contact Form */}
      <div className="max-w-4xl mx-auto mt-10 mb-10 p-6 border-2 border-yellow-500 rounded-lg shadow-md">
        <h3 className="text-lg font-bold mb-4">
          Contact Us For More Information Regarding Sponsorship
        </h3>
        <p className="text-gray-600 mb-4">Write us your email</p>
        <div className="flex">
          <input
            type="email"
            placeholder="Write your email"
            className="flex-1 p-2 border rounded-l-lg focus:outline-none"
          />
          <button className="bg-yellow-500 text-white px-6 py-2 rounded-r-lg shadow-md">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
