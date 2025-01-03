import React, { useState } from "react";

const Accordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full space-y-2 mb-8">
      {items.map((item, index) => (
        <div key={index} className="border rounded-lg shadow-md">
          {/* Header */}
          <button
            className="flex justify-between items-center w-full p-4 text-left font-medium text-gray-800 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring focus:ring-blue-200"
            onClick={() => toggleAccordion(index)}
            aria-expanded={activeIndex === index}
            aria-controls={`content-${index}`}
          >
            <span className="font-yantramanav">{item.title}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 transform transition-transform duration-300 ${
                activeIndex === index ? "rotate-180" : ""
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.58l3.71-3.35a.75.75 0 111.04 1.08l-4 3.6a.75.75 0 01-1.04 0l-4-3.6a.75.75 0 01-.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {/* Content */}
          <div
            id={`content-${index}`}
            className={`overflow-hidden transition-all duration-300 ${
              activeIndex === index ? "max-h-screen p-4" : "max-h-0"
            }`}
            style={{
              maxHeight: activeIndex === index ? "200px" : "0",
            }}
          >
            <p className="text-gray-700 font-imprima">{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
