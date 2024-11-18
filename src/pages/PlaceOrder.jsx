import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets, shippingMethods } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import toast from "react-hot-toast";
import ShippingMethodSelector from "../components/ShippingMethodSelector";

function Modal({ isOpen, onClose, children, onSubmitHandler }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70 px-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>
        <h2 className="font-bold text-xl text-center mb-4 font-muktaVaani border-b-[1px] pb-2">
          Order Payment Confirmation
        </h2>
        <div className="mb-6">{children}</div>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onSubmitHandler}
            className="bg-green-600 text-white px-5 py-2 rounded-md font-muktaVaani hover:bg-green-700 transition duration-200"
          >
            Pay Now
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-5 py-2 font-muktaVaani rounded-md hover:bg-red-600 transition duration-200"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PlaceOrder() {
  const [method, setMethod] = useState("mpesa");
  const [openModal, setOpenModal] = useState(false);

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
    deliveryFee,
    products,
  } = useContext(ShopContext);

  const toggleModalOpen = (e) => {
    e.preventDefault();
    setOpenModal(true);
  };
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    console.log(method);
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
        amount: getCartAmount() + deliveryFee,
      };
      switch (method) {
        // <----Api Calls For COD orders----->
        case "cod": {
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
        }

        case "mpesa":
          console.log("clicked");
          const response = await axios.post(
            backendUrl + "/api/order/mpesa",
            orderData,
            { headers: { token } }
          );

          console.log(response.data);

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
      onSubmit={toggleModalOpen}
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
        <div className="flex gap-3">
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
        <ShippingMethodSelector />
      </div>

      {/* -----------Right Side------------- */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} tex2={"METHOD"} />

          {/* --------Payment Methods---------- */}
          <div className="flex flex-col lg:flex-row gap-5 lg:gap- w-2/3 sm:w-full justify-end">
            {[
              {
                id: "cod",
                label: "Card",
                logo: assets.stripe_logo,
                logoWidth: "w-8",
              },
              {
                id: "mpesa",
                label: "",
                logo: assets.mpesa_logo,
                logoWidth: "w-24",
              },
            ].map(({ id, label, logo, logoWidth = "" }) => (
              <div
                key={id}
                onClick={() => setMethod(id)}
                className={`flex items-center  gap-4 border p-2 px-3 rounded-lg cursor-pointer shadow-sm transition-all
        ${
          method === id
            ? "bg-blue-50 border-blue-400 shadow-lg"
            : "bg-white border-gray-300"
        }`}
                aria-pressed={method === id}
              >
                {/* Radio Indicator */}
                <span
                  className={`w-4 h-4 flex-shrink-0 border rounded-full ${
                    method === id ? "bg-blue-500" : "bg-gray-200"
                  }`}
                ></span>

                {/* Payment Logo */}
                <img
                  src={logo}
                  alt={label}
                  className={`${logoWidth} object-cover`}
                />

                {/* Label */}
                <p className="text-lg font-medium text-gray-700">{label}</p>
              </div>
            ))}
          </div>

          <div className="w-full text-center justify-end mt-8 flex">
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm font-semibold"
            >
              PLACE ORDER
            </button>
            <Modal
              isOpen={openModal}
              onClose={() => setOpenModal(false)}
              onSubmitHandler={onSubmitHandler}
            >
              <div className="space-y-6">
                <p className="text-base text-gray-500 font-muktaVaani">
                  Hello, {formData.firstName + " " + formData.lastName}.
                </p>
                <p className="text-base text-gray-500 font-imprima">
                  Please confirm Payment of{" "}
                  <span className="font-semibold">
                    Ksh. {getCartAmount() + deliveryFee}
                  </span>{" "}
                  to Eridanus Mall. You'll receive a prompt on your phone to the
                  number{" "}
                  <span className="bg-slate-300 p-[1px] px-1 rounded-md font-medium">
                    {formData.phone}
                  </span>
                  . Kindly enter your PIN and wait for confirmation after
                  payment.
                </p>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </form>
  );
}
