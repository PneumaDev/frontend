import React from "react";
import NotFoundSVG from "/404.svg";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="justify-center mx-4 items-center pt-10 gap-10 flex flex-col">
      <div className="sm:w-1/3">
        <img src={NotFoundSVG} alt="Not Found" />
      </div>
      <button
        className="p-3 rounded-md font-imprima bg-blue-500 hover:bg-blue-600 hover:shadow-lg text-white"
        onClick={handleGoBack}
      >
        Go Back
      </button>
    </div>
  );
}
