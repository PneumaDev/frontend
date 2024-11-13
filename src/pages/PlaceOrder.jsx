import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import toast from "react-hot-toast";

export default function PlaceOrder() {
  const [method, setMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    county: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      let orderItems = [];

      // Loop through each item in cartItems
      for (const items in cartItems) {
        const itemSizes = cartItems[items];

        // Loop through each size in the specific item's sizes
        for (const item in itemSizes) {
          if (itemSizes[item] > 0) {
            // Find product info based on product ID
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );

            if (itemInfo) {
              console.log("clicked");
              itemInfo.size = item; // Assign size to itemInfo
              itemInfo.quantity = itemSizes[item]; // Assign quantity
              orderItems.push(itemInfo); // Add itemInfo to orderItems
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };
      switch (method) {
        // <----Api Calls For COD orders----->
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }

          break;

        default:
          break;
      }
    } catch (error) {
      console.error("Error creating order items:", error);
    }
  };

  return (
    <form
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]"
      onSubmit={onSubmitHandler}
    >
      {/* ---------Left Side---------- */}
      <div
        className={`flex flex-col gap-4 w-full ${
          method === "" ? "bg-green-400" : ""
        } sm:max-w-[480px]`}
      >
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} tex2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            required
            type="text"
            placeholder="First name"
            className={`border border-gray-300 py-1.5 px-3.5 w-full ${
              method === "" ? "bg-green-400" : ""
            } font-imprima rounded-md`}
          />
          <input
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            required
            type="text"
            placeholder="Last name"
            className={`border border-gray-300 py-1.5 px-3.5 w-full ${
              method === "" ? "bg-green-400" : ""
            } font-imprima rounded-md`}
          />
        </div>
        <input
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          required
          type="email"
          placeholder="Email Address"
          className={`border border-gray-300 py-1.5 px-3.5 w-full ${
            method === "" ? "bg-green-400" : ""
          } font-imprima rounded-md`}
        />
        <input
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          required
          type="text"
          placeholder="Street"
          className={`border border-gray-300 py-1.5 px-3.5 w-full ${
            method === "" ? "bg-green-400" : ""
          } font-imprima rounded-md`}
        />
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            required
            type="text"
            placeholder="City"
            className={`border border-gray-300 py-1.5 px-3.5 w-full ${
              method === "" ? "bg-green-400" : ""
            } font-imprima rounded-md`}
          />
          <input
            onChange={onChangeHandler}
            name="county"
            value={formData.county}
            required
            type="text"
            placeholder="County"
            className={`border border-gray-300 py-1.5 px-3.5 w-full ${
              method === "" ? "bg-green-400" : ""
            } font-imprima rounded-md`}
          />
        </div>
        <input
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          required
          type="number"
          placeholder="Phone Number"
          className={`border border-gray-300 py-1.5 px-3.5 w-full ${
            method === "" ? "bg-green-400" : ""
          } font-imprima rounded-md`}
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
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className={`flex items-center gap-3 border p-2 px-3 cursor-pointer ${
                method === "stripe" ? "bg-red-100" : ""
              }`}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : "bg-white"
                }`}
              ></p>
              <img
                src={assets.stripe_logo}
                alt="Stripe"
                className="w-20 mr-4 object-cover"
              />
            </div>
            <div
              onClick={() => setMethod("razorpay")}
              className={`flex items-center gap-3 border p-2 px-3 cursor-pointer  ${
                method === "razorpay" ? "bg-red-100" : ""
              }`}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-green-400" : ""
                }`}
              ></p>
              <img
                src={assets.razorpay_logo}
                alt="Razorpay"
                className="h-5 w-16 mx-4"
              />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className={`flex items-center gap-3 border p-2 px-3 cursor-pointer  ${
                method === "cod" ? "bg-red-100" : ""
              }`}
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
              className="bg-black text-white px-16 py-3 text-sm font-muktaVaani"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
