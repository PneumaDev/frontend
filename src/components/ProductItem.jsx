import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProductItem({ id, image, price, name }) {
  const { currency } = useContext(ShopContext);

  return (
    <div className="relative text-gray-700 shadow-sm hover:shadow-lg p-4 rounded-md">
      <Link to={`/product/${id}`} className="cursor-pointer">
        <div className="overflow-hidden relative">
          <img
            src={image[0]}
            alt={name}
            className="hover:scale-110 transition ease-in-out rounded-md hover:rounded-md"
          />
          <BadgeCheck
            className="absolute z-10 top-2 right-2 cursor-pointer"
            fill="#4dff88"
            stroke="#FFFFFF"
          />
        </div>
        <p className="pt-3 pb-1 text-sm font-muktaVaani">{name}</p>
        <p className="text-md font-yantramanav">
          {currency} <span className="font-bold">{price}</span>
        </p>
      </Link>
    </div>
  );
}
