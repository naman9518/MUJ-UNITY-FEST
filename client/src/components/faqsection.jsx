import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { question: "WHEN DOES THE EVENT RUN?", answer: "The event starts at 10 AM and runs till midnight." },
    { question: "HOW CAN I REGISTER?", answer: "You can register online via our official website." },
    { question: "IS THERE AN ENTRY FEE?", answer: "No, the event is completely free for all attendees." },
    { question: "WHERE IS THE VENUE?", answer: "The event is held at XYZ Convention Center, New York." },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-3xl mx-auto text-center py-10 px-4">
      {/* Heading */}
      <p className="text-yellow-600 font-semibold uppercase">
        All About
      </p>
      <h2 className="text-2xl md:text-3xl font-bold">Frequently Asked Questions</h2>
      <div className="w-16 h-1 bg-yellow-500 mx-auto my-3"></div>

      {/* FAQ List */}
      <div className="mt-6 space-y-3">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            {/* Question */}
            <button
              className="w-full flex items-center justify-between px-6 py-5 text-left text-lg font-semibold text-white 
              bg-yellow-600 hover:bg-yellow-700 transition-all duration-300"
              onClick={() => toggleFAQ(index)}
            >
              <span>{faq.question}</span>
              {openIndex === index ? (
                <FaMinus className="text-white text-xl" />
              ) : (
                <FaPlus className="text-white text-xl" />
              )}
            </button>

            {/* Answer */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-40 p-6 bg-gray-50" : "max-h-0 p-0"
              }`}
            >
              <p className="text-gray-700 text-md">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
