import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

export default function Cart() {
  const { products, currency, cartItems } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }

    setCartData(tempData);
    console.log(tempData);
  }, [cartItems]);
  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} tex2={"CART"} />
      </div>

      <div className="">
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );
          console.log(products);
          return (
            <div className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
              <div className="flex items-start gap-6">
                <img
                  className="w-16 sm:w-20"
                  src={productData.image[0]}
                  alt=""
                />
                <p className="text-sm sm:text-lg font-medium">
                  {productData.name}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
