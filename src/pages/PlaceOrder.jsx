import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import ShippingMethodSelector from "../components/ShippingMethodSelector";
import Spinner from "./../components/Spinner";
import Modal from "../components/Modal";
import InfoMessage from "../components/InfoComponent";
import toast from "react-hot-toast";
import { useCookies } from "react-cookie";
import ScrollToTop from "../components/ScrollToTop";

export default function PlaceOrder() {
  const [method, setMethod] = useState("mpesa");
  const [openModal, setOpenModal] = useState(false);
  const [sendingData, setSendingData] = useState(false);
  const [paymentProcessed, setPaymentProcessed] = useState(false);
  const [delay, setDelay] = useState(15);
  const [cookies, setCookie] = useCookies(["userAddress"]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    constituency: "",
    county: "",
    phone: "",
    defaultAddress: false,
  });

  useEffect(() => {
    const userAddress = cookies.userAddress;
    if (userAddress) {
      setFormData(userAddress);
    }
  }, []);

  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    delivery,
    totalAmount,
    cartProducts,
    user,
  } = useContext(ShopContext);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (paymentProcessed) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    // Add the event listener
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [paymentProcessed]);

  const pollPayment = async (order) => {
    setTimeout(async () => {
      const response = await axios.post(
        backendUrl + "/api/order/confirmpayment",
        { order },
        { headers: { token } }
      );
      console.log(response.data);
    }, 5000);
  };

  const toggleModalOpen = (e) => {
    e.preventDefault();
    setOpenModal(true);
  };

  const onChangeHandler = (e) => {
    const { name, type, checked, value } = e.target;

    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      };

      setCookie("userAddress", JSON.stringify(updatedData));
      return updatedData;
    });
  };

  // <------------Handle Order Purchases------------>
  const onSubmitHandler = async (e) => {
    setSendingData(true);
    e.preventDefault();
    try {
      const updatedItems = cartProducts.map((item) => {
        if (cartItems[item._id]) {
          // Extract sizes and quantities
          const sizes = Object.entries(cartItems[item._id]).map(
            ([size, quantity]) => ({
              size,
              quantity,
            })
          );

          return { ...item, sizes };
        }
        return { ...item, sizes: [{ size: "Default", quantity: 1 }] };
      });

      let orderData = {
        shippingMethod: delivery,
        address: formData,
        items: updatedItems,
        amount: totalAmount + delivery.price,
      };
      switch (method) {
        case "mpesa":
          console.log(orderData.items);
          const response = await axios.post(
            backendUrl + "/api/order/mpesa",
            orderData,
            { headers: { token } }
          );

          if (response.data.success) {
            pollPayment(response.data);
            setSendingData(false);
            setPaymentProcessed(true);
            countdownToFunction(() => {
              navigate("/orders");
            }, 15);
            setCartItems({});
          }

        default:
          break;
      }
    } catch (error) {
      console.error("Error creating order items:", error);
      toast.error(error.message, { id: error.message });
      setSendingData(false);
    }
  };

  // Function for countdown
  function countdownToFunction(callback, delay) {
    const countdown = setInterval(() => {
      delay--;
      setDelay(delay);
      if (delay <= 0) {
        clearInterval(countdown);
        callback();
      }
    }, 1000);
  }

  return (
    <form
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]"
      onSubmit={toggleModalOpen}
    >
      <ScrollToTop />
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
            name="constituency"
            value={formData.constituency}
            required
            type="text"
            placeholder="Constituency"
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
        <div className="flex items-center gap-2 p-2 rounded-md">
          <input
            onChange={onChangeHandler}
            checked={formData.defaultAddress} // Ensure this matches your state key
            type="checkbox"
            name="defaultAddress"
            id="defaultAddress"
            className="w-4 h-4 accent-blue-500 cursor-pointer"
          />

          <label
            htmlFor="defaultAddress"
            className="text-gray-700 text-sm font-medium"
          >
            Set as default address
          </label>
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
                id: "card",
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
                onClick={() => {
                  if (id === "card") {
                    return toast.error("Feature not implemented", {
                      id: "Feature not implemented",
                    });
                  }
                }}
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
              title={"Order Payment Confirmation"}
              isOpen={openModal}
              onClose={() => setOpenModal(false)}
              onSubmitHandler={onSubmitHandler}
              button1={sendingData || paymentProcessed ? null : "Pay Now"}
              button2={sendingData || paymentProcessed ? null : "Cancel"}
              cancelButton={
                sendingData ? false : paymentProcessed ? false : true
              }
            >
              {sendingData ? (
                <div className="h-48 flex justify-center items-center">
                  <Spinner />
                </div>
              ) : paymentProcessed ? (
                <div className="space-y-4">
                  <InfoMessage
                    title={"Payment Processed Successfully"}
                    type="success"
                    message={
                      "Please check your phone for Mpesa Prompt and enter your pin."
                    }
                  />
                  <p className="font-muktaVaani">
                    {" "}
                    <span className="font-extrabold">DON'T RELOAD!</span>{" "}
                    Redirecting in: {delay}
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-6">
                    <p className="text-base text-gray-500 font-muktaVaani">
                      Hello, {formData.firstName + " " + formData.lastName}.
                    </p>
                    <p className="text-base text-gray-500 font-imprima">
                      Please confirm Payment of{" "}
                      <span className="font-semibold">
                        Ksh. {totalAmount + delivery.price}
                      </span>{" "}
                      to Eridanus Mall. You'll receive a prompt on your phone to
                      the number{" "}
                      <span className="bg-slate-300 p-[1px] px-1 rounded-md font-medium">
                        {formData.phone}
                      </span>
                      . Kindly enter your PIN and wait for confirmation after
                      payment.
                    </p>
                  </div>
                </>
              )}
            </Modal>
          </div>
        </div>
      </div>
    </form>
  );
}
