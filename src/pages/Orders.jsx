import React, { useContext, useEffect, useRef, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import toast from "react-hot-toast";
import Spinner from "./../components/Spinner";
import Modal from "../components/Modal";
import { Copy } from "lucide-react";
import InfoMessage from "../components/InfoComponent";

export default function Orders() {
  const { backendUrl, token, currency } = useContext(ShopContext);

  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [sendingData, setSendingData] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [currentItem, setCurrentItem] = useState(selectedItem);
  const [action, setAction] = useState(null);

  const ref = useRef(null);

  const handleTrackOrder = async (e, item) => {
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
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;

            allOrdersItem.push(item);
          });
        });

        setOrderData(allOrdersItem.reverse());
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.data.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const completePayment = async (e, item) => {
    setAction("complete_payment");
    setOpenModal(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await loadOrderData();
      setLoading(false);
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    if (currentItem._id) {
      setSelectedItem(orderData.find((item) => item._id === currentItem._id));
    }
  }, [orderData]);

  return (
    <div className="border-t pt-16 bg-white">
      <div className="text-2xl">
        <Title text1={"MY"} tex2={"ORDERS"} />
      </div>
      <div className="">
        {loading || !orderData ? (
          <>
            <Spinner />
          </>
        ) : (
          <>
            {orderData.map((item, index) => (
              <div
                key={index}
                className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div className="flex items-start gap-6 text-sm">
                  <img
                    src={item.image[0]}
                    alt="product"
                    className="w-16 sm:w-20"
                  />
                  <div className="">
                    <p className="sm:text-base font-medium font-muktaVaani">
                      {item.name}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                      <p className="font-yantramanav">
                        {currency}
                        {item.price}
                      </p>
                      <p className="font-yantramanav">
                        Quantity: {item.quantity}
                      </p>
                      <p className="font-yantramanav">Size: {item.size}</p>
                    </div>
                    <p className="mt-2 font-yantramanav">
                      Date:{" "}
                      <span className="text-gray-400 font-imprima">
                        {new Date(item.date).toDateString()}
                      </span>
                    </p>
                    <p className="mt-2 font-yantramanav">
                      Payment:{" "}
                      <span className="text-gray-400 font-imprima">
                        {item.paymentMethod}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2 flex justify-between">
                  <div className="flex items-center gap-2">
                    <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                    <p className="text-sm md:text-base font-imprima" ref={ref}>
                      {item.status}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={loadOrderData}
                      className="border px-4 py-2 text-sm w-[110px] font-medium rounded-md font-yantramanav hover:bg-gray-300"
                    >
                      Cancel Order
                    </button>
                    <button
                      onClick={(e) => {
                        item.status == "Pending"
                          ? completePayment(e, item)
                          : handleTrackOrder(e, item);
                      }}
                      className="border px-4 py-2 text-sm w-[110px] font-medium rounded-md font-yantramanav hover:bg-gray-300"
                    >
                      {item.status == "Pending" ? "Pay Now" : "Track Order"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      <div className="">
        {action === "track_order" ? (
          <>
            <Modal
              button2={"Close"}
              title={"Order Tracking"}
              isOpen={openModal}
              onClose={() => setOpenModal(false)}
              onSubmitHandler={handleTrackOrder}
            >
              {sendingData ? (
                <div className="h-48 flex justify-center items-center">
                  <Spinner />
                </div>
              ) : (
                <>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <p className="text-base text-gray-500 font-muktaVaani">
                          Order ID: {selectedItem._id}
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
                      <p className="text-base text-gray-500 font-muktaVaani">
                        Item : {selectedItem.name}
                      </p>
                      <p className="text-base text-gray-500 font-muktaVaani">
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
        ) : (
          <>
            <Modal
              button1={"Pay Now"}
              button2={"Close"}
              title={"Complete Payment!"}
              isOpen={openModal}
              onClose={() => setOpenModal(false)}
              onSubmitHandler={handleTrackOrder}
            ></Modal>
          </>
        )}
      </div>
    </div>
  );
}
