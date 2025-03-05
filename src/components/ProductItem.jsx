import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { AdvancedImage } from "@cloudinary/react";
import { scale } from "@cloudinary/url-gen/actions/resize";
import { lazyload } from "@cloudinary/react";

export default function ProductItem({ id, image, price, name }) {
  const { currency, cloudinary } = useContext(ShopContext);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const publicId = image[0].split("/").slice(-2).join("/").split(".")[0];

  // Generate optimized Cloudinary URL
  const cldImg = cloudinary
    .image(publicId)
    .format("auto")
    .quality("auto")
    .resize(scale().width(300));

  return (
    <div className="relative text-gray-700 shadow-sm hover:shadow-lg p-4 rounded-md">
      <Link to={`/product/${id}`} className="cursor-pointer">
        <div className="overflow-hidden relative">
          {!isImageLoaded && (
            <div className="flex">
              <div className="w-[300px] h-[200px] md:h-[300px] bg-gray-200 animate-pulse rounded-md"></div>
            </div>
          )}

          {/* Use AdvancedImage to display the optimized image */}
          <AdvancedImage
            plugins={[lazyload()]}
            cldImg={cldImg}
            alt={name}
            className={`hover:scale-110 transition ease-in-out rounded-md hover:rounded-md ${
              isImageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setIsImageLoaded(true)}
          />

          <BadgeCheck
            className="absolute z-10 top-2 right-2 cursor-pointer"
            fill="#4dff88"
            stroke="#FFFFFF"
          />
        </div>
        <p className="pt-3 pb-1 text-sm font-muktaVaani text-gray-500">
          {name}
        </p>
        <p className="text-md font-yantramanav">
          {currency} <span className="font-bold">{price}</span>
        </p>
      </Link>
    </div>
  );
}
