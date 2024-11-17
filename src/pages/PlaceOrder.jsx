import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets, shippingMethods } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import toast from "react-hot-toast";
import { Button, Label, Modal, Radio, Select } from "flowbite-react";

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
    delivery_fee,
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
        amount: getCartAmount() + delivery_fee,
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
            className={`border border-gray-300 py-1.5 px-3.5 ${
              method === "" ? "bg-green-400" : ""
            } font-imprima rounded-md`}
          />
        </div>
        <div className="max-w-md bg-gray-100 shadow-lg p-4 rounded-md mx-auto">
          <div className="mb-2">
            <Label
              htmlFor="countries"
              className="font-muktaVaani text-lg font-medium text-gray-700"
              value="Shipping Method:"
            />
          </div>
          <div className="relative">
            <Select
              id="countries"
              className="block w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              {shippingMethods.map((method, index) => (
                <option key={index} className="truncate">
                  {method.method}
                </option>
              ))}
            </Select>
          </div>
        </div>
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

          <div className="w-full text-end mt-8">
            <>
              <button
                type="submit"
                // onClick={() => setOpenModal(true)}
                className="bg-black text-white px-16 py-3 text-sm font-muktaVaani"
              >
                PLACE ORDER
              </button>
              <Modal
                dismissible
                show={openModal}
                onClose={() => setOpenModal(false)}
              >
                <Modal.Header className="font-muktaVaani">
                  Order Payment Confirmation
                </Modal.Header>
                <Modal.Body>
                  <div className="space-y-6">
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 font-yantramanav">
                      Hello, {formData.firstName + " " + formData.lastName}.
                    </p>
                    <p className="text-base leading-relaxed font-imprima text-gray-500 dark:text-gray-400">
                      Please confirm Payment of{" "}
                      <span className="font-semibold">
                        Ksh.
                        {getCartAmount() + delivery_fee}
                      </span>{" "}
                      to Eridanus Mall. You'll recieve a prompt on your phone to
                      the number{" "}
                      <span className="bg-slate-300 p-[1px] px-1 rounded-md font-medium shadow-md">
                        {formData.phone}
                      </span>
                      . Kindly enter your PIN and wait for confirmation after
                      payment
                    </p>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={() => setOpenModal(false)}>Pay Now</Button>
                  <Button color="gray" onClick={() => setOpenModal(false)}>
                    Decline
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          </div>
        </div>
      </div>
    </form>
  );
}
