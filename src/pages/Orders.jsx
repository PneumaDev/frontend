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
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const completePurchases = async () => {
    setSendingData(true);
    // Proceed to Complete Stalled Purchases
    if (selectedItem) {
      console.log(selectedItem);
      try {
        let order = selectedItem;
        let retryPurchase = true;
        const response = await axios.post(
          backendUrl + "/api/order/confirmpayment",
          { order, retryPurchase },
          { headers: { token } }
        );

        console.log(response);

        setSendingData(false);
        setPaymentProcessed(true);
        await countdownToFunction(async () => {
          setOpenModal(false);
          setPaymentProcessed(false);
          await fetchData();
        }, 10);
      } catch (error) {
        console.error("Completing Payment:", error);
      } finally {
        setSendingData(false);
        setDelay(10);
      }
    }
  };

  const completePurchasesConfirmation = async (e, order) => {
    setSelectedItem(order);
    setAction("complete_payment");
    e.preventDefault();
    setOpenModal(true);
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
              ) : paymentProcessed ? (
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
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
