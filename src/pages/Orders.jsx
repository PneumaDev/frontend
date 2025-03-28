import React, { useContext, useEffect, useRef, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import toast from "react-hot-toast";
import Spinner from "./../components/Spinner";
import Modal from "../components/Modal";
import { Copy } from "lucide-react";
import InfoMessage from "../components/InfoComponent";
import OrderItem from "../components/OrderItem";
import { useCookies } from "react-cookie";

export default function Orders() {
  // <------Import Context Variables----->
  const { backendUrl, token, permission, requestPermission, user } =
    useContext(ShopContext);

  // <------------State Variables------------>
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [sendingData, setSendingData] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [currentItem, setCurrentItem] = useState(selectedItem);
  const [action, setAction] = useState(null);
  const [delay, setDelay] = useState(10);
  const [cookies, setCookie] = useCookies(["notificationRequest"]);
  const [paymentProcessed, setPaymentProcessed] = useState(false);
  const [responseCode, setResponseCode] = useState(202);

  // <-------------------Handle Side Effects---------------->
  useEffect(() => {
    loadOrderData();
  }, [token]);

  useEffect(() => {
    if (currentItem._id) {
      setSelectedItem(orderData.find((item) => item._id === currentItem._id));
    }
  }, [orderData]);

  useEffect(() => {
    console.log(permission);
    if (cookies.notificationRequest) {
      return;
    }
    if (permission === "default") {
      setTimeout(
        () =>
          toast.custom(
            (t) => (
              <div
                className={`bg-green-300 transition-all duration-300 transform ${
                  t.visible
                    ? "opacity-100 translate-y-0 animate-enter"
                    : "opacity-0 -translate-y-2 animate-leave"
                } rounded-md shadow-md flex flex-col mt-5 md:mt-10`}
              >
                <h1 className="text-sm text-center border-b border-black p-2 font-muktaVaani">
                  Subscribe to notifications!
                </h1>
                <div className="mb-2">
                  <p className="text-sm md:text-md text-black p-2 font-muktaVaani">
                    Get order updates, tips, discounts and more.
                  </p>
                  <div className="flex justify-end space-x-4 mr-2">
                    <button
                      onClick={() => {
                        toast.dismiss(t.id);
                        setCookie("notificationRequest", "denied", {
                          path: "/",
                          expires: new Date(
                            Date.now() + 7 * 24 * 60 * 60 * 1000
                          ),
                        });
                      }}
                      className="font-yantramanav text-xs md:text-sm bg-gray-300 px-2 p-1 shadow-sm rounded-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        requestPermission();
                        toast.dismiss(t.id);
                        setCookie("notificationRequest", "granted", {
                          path: "/",
                          expires: new Date(
                            Date.now() + 3 * 24 * 60 * 60 * 1000
                          ),
                        });
                      }}
                      className="font-yantramanav text-xs md:text-sm bg-orange-400 px-2 p-1 shadow-sm rounded-sm"
                    >
                      Allow
                    </button>
                  </div>
                </div>
              </div>
            ),
            { duration: 5000, id: "notification" }
          ),
        3500
      );
    }
  }, [permission]);

  // <-------------------Custom Functions--------------------->
  // Function to track user order
  const handleTrackOrder = async (e, item) => {
    //Function to track orders
    setAction("track_order");
    setCurrentItem(item);
    setSendingData(true);
    e.preventDefault();
    setOpenModal(true);
    await loadOrderData();
    setSelectedItem(item);
    setSendingData(false);
  };

  // Function to load users orders
  const loadOrderData = async () => {
    setLoading(true);
    // Load Order Data
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrderData(response.data.orders.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message, { id: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Function to complete stalled orders
  const completePurchases = async () => {
    try {
      if (!selectedItem) return;

      setSendingData(true);
      console.log("Selected Item:", selectedItem);

      const order = selectedItem;

      // Send payment confirmation request
      const response = await axios.post(
        `${backendUrl}/api/order/confirmpayment`,
        { order, retryPurchase: true, fcmTokens: user.fcmToken },
        { headers: { token } }
      );

      console.log("Response Data:", response.data);

      // Update state based on response
      const isSuccess = response.data.status === 200;
      setResponseCode(response.data.status);
      setPaymentProcessed(true);

      // Countdown to close modal and refresh data
      const delay = isSuccess ? 3 : 10;
      setDelay(delay);
      await countdownToFunction(async () => {
        setOpenModal(false);
        setPaymentProcessed(false);
        await loadOrderData();
      }, delay);
    } catch (error) {
      console.error("Error Completing Payment:", error);
      // Optionally handle error feedback for users
    } finally {
      setSendingData(false);
    }
  };

  // Function to open complete purchases modal.
  const completePurchasesConfirmation = async (e, order) => {
    setSelectedItem(order);
    setAction("complete_payment");
    e.preventDefault();
    setOpenModal(true);
  };

  // Function to check if order payment was successful
  const handlePaymentConfirmed = async (order) => {
    setAction("payment_confirmed");
    setOpenModal(true);
    setDelay(3);
    countdownToFunction(() => {
      window.location.reload();
    }, 3);
  };

  // Function to cancel order
  const cancelOrder = async (orderId) => {
    // Cancel/Delete Item
    setLoading(true);
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
      const response = await axios.post(
        backendUrl + "/api/order/cancelorder",
        { orderId },
        { headers: { token } }
      );

      if (response.data.success) {
        if (response.data.status) {
          toast.error(response.data.message);
          return setTimeout(async () => {
            await fetchData();
          }, 1500);
        }
        await fetchData();
      } else {
        console.warn("Unexpected response:", response.data.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      console.error("Error deleting item:", errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Function to calculate time passed.
  const calculateTimePassed = (orderTime) => {
    const updatedAt = new Date(orderTime);
    const currentTime = new Date();
    return Math.floor((currentTime - updatedAt) / 1000);
  };

  // Count down function
  async function countdownToFunction(callback, delay) {
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
    <div className="border-t pt-8 bg-white">
      <div className="text-2xl">
        <Title text1="MY" tex2="ORDERS" />
      </div>
      {loading ? (
        <Spinner />
      ) : orderData.length > 0 ? (
        <div
          className={`p-4 grid gap-8 grid-cols-1 ${
            orderData.length == 1 ? "" : "md:grid-cols-2"
          }`}
        >
          {orderData.map((order, idx) => (
            <OrderItem
              key={idx}
              order={order}
              loading={sendingData}
              cancelOrder={cancelOrder}
              handlePaymentConfirmed={handlePaymentConfirmed}
              completePurchasesConfirmation={completePurchasesConfirmation}
              calculateTimePassed={calculateTimePassed}
              handleTrackOrder={handleTrackOrder}
              handleWriteReview={(item) => {
                setCurrentItem(item);
                setAction("writeReview");
                setOpenModal(true);
              }}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <InfoMessage
            type="info"
            title={"Nothing Here!"}
            message={"Please make some orders then comeback!"}
          />
        </div>
      )}
      <div className="">
        {action === "track_order" ? (
          <>
            <Modal
              button2={"Close"}
              title={"Order Tracking"}
              isOpen={openModal}
              onClose={() => setOpenModal(false)}
            >
              {sendingData ? (
                <div className="h-48 flex justify-center items-center">
                  <Spinner />
                </div>
              ) : (
                <>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex flex-col">
                        <div className="">
                          <p className="text-base text-gray-500 font-yantramanav font">
                            {selectedItem.status === "Delivered"
                              ? "Delivered to"
                              : "Deliverying to"}
                            : {selectedItem.address.firstName}{" "}
                            {selectedItem.address.lastName}
                          </p>
                        </div>
                      </div>
                      <div className="flex">
                        <p className="text-base text-gray-500 font-yantramanav">
                          Order ID : {selectedItem._id}
                        </p>
                        <Copy
                          className="w-5 ml-2 cursor-pointer"
                          onClick={() => {
                            navigator.clipboard.writeText(selectedItem._id);
                            toast.success("ID copied!", {
                              id: selectedItem._id,
                            });
                          }}
                        />
                      </div>
                      <p className="text-base text-gray-500 font-yantramanav font">
                        Delivery Info : {selectedItem.status}
                      </p>

                      <div className="flex justify-center items-center pt-3">
                        <InfoMessage
                          message={
                            selectedItem.status === "Delivered"
                              ? "Succesfully Delivered"
                              : "We will notify you on text and email immediately after dispatch."
                          }
                          type={
                            selectedItem.status === "Delivered"
                              ? "success"
                              : "info"
                          }
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </Modal>
          </>
        ) : action === "complete_payment" ? (
          <>
            <Modal
              button1={sendingData || paymentProcessed ? null : "Proceed"}
              button2={sendingData || paymentProcessed ? null : "Cancel"}
              title={"Complete Payment!"}
              isOpen={openModal}
              cancelButton={
                sendingData ? false : paymentProcessed ? false : true
              }
              onClose={() => setOpenModal(false)}
              onSubmitHandler={completePurchases}
            >
              {sendingData ? (
                <div className="h-48 flex justify-center items-center">
                  <Spinner />
                </div>
              ) : paymentProcessed && responseCode === 202 ? (
                <div className="space-y-4">
                  <InfoMessage
                    title={"Payment Processed Successfully"}
                    type="success"
                    message={
                      "Please check your phone for Mpesa Prompt and enter your pin."
                    }
                  />
                  <p className="font-muktaVaani flex justify-center">
                    Reloading in: {delay}
                  </p>
                </div>
              ) : paymentProcessed && responseCode === 200 ? (
                <div className="space-y-4">
                  <InfoMessage
                    title={"Order payment confirmed!!"}
                    type="success"
                    message={"Payment for your order has been confirmed.😊"}
                  />
                  <p className="font-muktaVaani flex justify-center">
                    Reloading in: {delay}
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-6">
                    <p className="text-base text-gray-500 font-muktaVaani">
                      Hello,{" "}
                      {selectedItem.address.firstName +
                        " " +
                        selectedItem.address.lastName}
                      .
                    </p>
                    <p className="text-base text-gray-500 font-imprima">
                      Please confirm Payment of{" "}
                      <span className="font-semibold">
                        Ksh. {selectedItem.amount}
                      </span>{" "}
                      to Eridanus Mall. You'll receive a prompt on your phone to
                      the number{" "}
                      <span className="bg-slate-300 p-[1px] px-1 rounded-md font-medium">
                        {selectedItem.address.phone}
                      </span>
                      . Kindly enter your PIN and wait for confirmation after
                      payment.
                    </p>
                  </div>
                </>
              )}
            </Modal>
          </>
        ) : action === "payment_confirmed" ? (
          <>
            <Modal
              title={"Payment Confirmed 😊"}
              isOpen={openModal}
              cancelButton={false}
            >
              <div className="space-y-4">
                <InfoMessage
                  title={"Your payment has been confirmed!"}
                  type="success"
                />
                <p className="font-muktaVaani flex justify-center">
                  Reloading in: {delay}
                </p>
              </div>
            </Modal>
          </>
        ) : action === "writeReview" ? (
          <>
            <>
              <Modal
                title={"Leave a review"}
                onClose={() => setOpenModal(false)}
                isOpen={openModal}
                button1={"Submit"}
                button2={"Close"}
              >
                <div className="">{currentItem.items[0].name}</div>
              </Modal>
            </>
          </>
        ) : null}
      </div>
    </div>
  );
}
