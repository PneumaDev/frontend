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

export default function Orders() {
  // <------Import Context Variables----->
  const { backendUrl, token } = useContext(ShopContext);

  // <------------State Variables------------>
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [sendingData, setSendingData] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [currentItem, setCurrentItem] = useState(selectedItem);
  const [action, setAction] = useState(null);
  const [delay, setDelay] = useState(10);
  const [paymentProcessed, setPaymentProcessed] = useState(false);
  const [responseCode, setResponseCode] = useState(202);

  // <-------------------Handle Side Effects---------------->
  useEffect(() => {
    fetchData();
  }, [token]);

  useEffect(() => {
    if (currentItem._id) {
      setSelectedItem(orderData.find((item) => item._id === currentItem._id));
    }
  }, [orderData]);

  // <-------------------Custom Functions--------------------->
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

  const loadOrderData = async () => {
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

  const completePurchases = async () => {
    try {
      if (!selectedItem) return;

      setSendingData(true);
      console.log("Selected Item:", selectedItem);

      const order = selectedItem;

      // Send payment confirmation request
      const response = await axios.post(
        `${backendUrl}/api/order/confirmpayment`,
        { order, retryPurchase: true },
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
        await fetchData();
      }, delay);
    } catch (error) {
      console.error("Error Completing Payment:", error);
      // Optionally handle error feedback for users
    } finally {
      setSendingData(false);
    }
  };

  const completePurchasesConfirmation = async (e, order) => {
    setSelectedItem(order);
    setAction("complete_payment");
    e.preventDefault();
    setOpenModal(true);
  };

  const handlePaymentConfirmed = async (order) => {
    console.log("clicked");
    setAction("payment_confirmed");
    setOpenModal(true);
    setDelay(3);
    countdownToFunction(() => {
      window.location.reload();
    }, 3);
  };

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

  const fetchData = async () => {
    setLoading(true);
    await loadOrderData();
    setLoading(false);
  };

  const calculateTimePassed = (orderTime) => {
    const updatedAt = new Date(orderTime);
    const currentTime = new Date();
    return Math.floor((currentTime - updatedAt) / 1000);
  };

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

  console.log(currentItem);

  return (
    <div className="border-t pt-16 bg-white">
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
