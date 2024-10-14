import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

export default function Product() {
  const { productId } = useParams();
  const { products, currency } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const ref = useRef(null);

  const fetchProductData = async () => {
    const product = products.find((product) => product._id === productId);
    if (product) {
      setImage(product.image[0]);
      setProductData(product);
    } else {
      console.error("Product not found!");
    }
  };

  useEffect(() => {
    if (ref.current) ref.current.scrollIntoView({ behavior: "smooth" });
  }, [window.location.pathname]);

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  return productData ? (
    <div
      className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100"
      ref={ref}
    >
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Products images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex scroller sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((image, index) => (
              <img
                onClick={() => setImage(image)}
                key={index}
                src={image}
                alt=""
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} alt="" className="w-full h-auto" />
          </div>
        </div>

        {/* Product info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2 font-muktaVaani">
            {productData.name}
          </h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className="pl-2 font-imprima">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium font-yantramanav">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5 font-imprima">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p className="font-yantramanav">Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border font-imprima py-2 px-4 bg-gray-100 ${
                    item === size ? "border-orange-500" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button className="bg-black font-muktaVaani text-white px-8 py-3 text-sm active:bg-gray-700">
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p className="font-muktaVaani">100% Original Product</p>
            <p className="font-muktaVaani">
              Cash on delivery is available for this product.
            </p>
            <p className="font-muktaVaani">
              Easy return and exchange policy within 7 days.
            </p>
          </div>
        </div>
      </div>

      {/* Description and review section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm font-muktaVaani">
            Description
          </b>
          <p className="border px-5 py-3 text-sm font-muktaVaani">
            Reviews (122)
          </p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-600">
          <p className="font-imprima">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod
            lorem arcu, condimentum interdum ante tristique rhoncus. Nam nec
            aliquam velit.
          </p>
          <p className="font-imprima">
            Nulla eu accumsan sem. Donec vitae ornare enim. Curabitur porttitor
            diam quis dui consequat consequat. Fusce convallis sed leo posuere
            facilisis. Integer non laoreet ex, eget consectetur quam. Aenean
            tempus maximus magna non molestie. Pellentesque semper vitae erat ac
            dignissim. Vivamus vitae dui vitae dui lobortis ultrices dignissim
            et sem.
          </p>
        </div>
      </div>

      {/* ----- display related products. */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
}
