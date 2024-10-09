import React from "react";

export default function Title({ text1, tex2 }) {
  return (
    <div className="inline-flex gap-2 items-center mb-3">
      <p className="text-gray-500 font-yantramanav">{text1}</p>{" "}
      <span className="text-gray-700 font-medium font-yantramanav">{tex2}</span>
      <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
    </div>
  );
}
