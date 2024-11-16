import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios, { all } from "axios";
import toast from "react-hot-toast";
import Spinner from "./../components/Spinner";

export default function Orders() {
  const { backendUrl, token, currency } = useContext(ShopContext);

  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(false);

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
    } catch (error) {
      console.log(error);
      toast.error(error.data.message);
      setLoading(false);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} tex2={"ORDERS"} />
      </div>
      <div className="">
        {orderData.map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex items-start gap-6 text-sm">
              <img src={item.image[0]} alt="product" className="w-16 sm:w-20" />
              <div className="">
                <p className="sm:text-base font-medium font-muktaVaani">
                  {item.name}
                </p>
                <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                  <p className="font-yantramanav">
                    {currency}
                    {item.price}
                  </p>
                  <p className="font-yantramanav">Quantity: {item.quantity}</p>
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
                <p className="text-sm md:text-base font-imprima">
                  {item.status}
                </p>
              </div>
              <button
                onClick={loadOrderData}
                className="border px-4 py-2 text-sm font-medium rounded-md font-yantramanav hover:bg-gray-300"
              >
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
