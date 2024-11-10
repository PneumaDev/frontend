import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

export default function PlaceOrder() {
  const [method, setMethod] = useState("cod");

  const { navigate } = useContext(ShopContext);

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]">
      {/* ---------Left Side---------- */}
      <div className="flex flex-col gap-4 w-full ${method === '' ? 'bg-green-400' : ''} sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} tex2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            required
            type="text"
            placeholder="First name"
            className="border border-gray-300 py-1.5 px-3.5 w-full ${method === '' ? 'bg-green-400' : ''} font-imprima rounded-md"
          />
          <input
            required
            type="text"
            placeholder="Last name"
            className="border border-gray-300 py-1.5 px-3.5 w-full ${method === '' ? 'bg-green-400' : ''} font-imprima rounded-md"
          />
        </div>
        <input
          required
          type="email"
          placeholder="Email Address"
          className="border border-gray-300 py-1.5 px-3.5 w-full ${method === '' ? 'bg-green-400' : ''} font-imprima rounded-md"
        />
        <input
          required
          type="text"
          placeholder="Street"
          className="border border-gray-300 py-1.5 px-3.5 w-full ${method === '' ? 'bg-green-400' : ''} font-imprima rounded-md"
        />
        <div className="flex gap-3">
          <input
            required
            type="text"
            placeholder="City"
            className="border border-gray-300 py-1.5 px-3.5 w-full ${method === '' ? 'bg-green-400' : ''} font-imprima rounded-md"
          />
          <input
            required
            type="text"
            placeholder="County"
            className="border border-gray-300 py-1.5 px-3.5 w-full ${method === '' ? 'bg-green-400' : ''} font-imprima rounded-md"
          />
        </div>
        <input
          required
          type="number"
          placeholder="Phone Number"
          className="border border-gray-300 py-1.5 px-3.5 w-full ${method === '' ? 'bg-green-400' : ''} font-imprima rounded-md"
        />
      </div>

      {/* -----------Right Side------------- */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} tex2={"METHOD"} />

          {/* --------Payment Methods---------- */}
          <div className="flex gap-3  flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer bg-red-100"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img
                src={assets.stripe_logo}
                alt=""
                className="w-20 mr-4 object-cover"
              />
            </div>
            {/* <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-green-400" : ""
                }`}
              ></p>
              <img src={assets.razorpay_logo} alt="" className="h5 mx-4" />
            </div> */}
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4 font-muktaVaani">
                CASH ON DELIVERY
              </p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              type="submit"
              onClick={() => navigate("/orders")}
              className="bg-black text-white px-16 py-3 text-sm font-muktaVaani"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
