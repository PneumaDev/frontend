import React, { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

export default function OrderItem({
  order,
  loading,
  cancelOrder,
  completePurchasesConfirmation,
  calculateTimePassed,
  handleTrackOrder,
  handleWriteReview,
}) {
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [countdown, setCountdown] = useState({ minutes: 0, seconds: 0 });

  // Track seconds elapsed since order was created
  useEffect(() => {
    const orderAgeInSeconds = calculateTimePassed(order.createdAt);
    setSecondsElapsed(orderAgeInSeconds);

    if (orderAgeInSeconds < 100) {
      const interval = setInterval(() => {
        setSecondsElapsed((prev) => {
          if (prev + 1 >= 30) {
            clearInterval(interval);
            return 30;
          }
          return prev + 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setSecondsElapsed(30);
    }
  }, [order.createdAt, calculateTimePassed]);

  // Track countdown timer if order is less than 15 minutes old
  useEffect(() => {
    const orderAgeInSeconds = calculateTimePassed(order.createdAt);
    if (orderAgeInSeconds < 900) {
      const remainingTime = 900 - orderAgeInSeconds;
      setCountdown({
        minutes: Math.floor(remainingTime / 60),
        seconds: remainingTime % 60,
      });

      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev.minutes === 0 && prev.seconds === 0) {
            clearInterval(timer);
            cancelOrder(order._id);
            return { minutes: 0, seconds: 0 };
          }

          const totalSeconds = prev.minutes * 60 + prev.seconds - 1;
          return {
            minutes: Math.floor(totalSeconds / 60),
            seconds: totalSeconds % 60,
          };
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [order.createdAt, calculateTimePassed]);

  return (
    <div className="p-6 border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow space-y-4">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-sm text-gray-500 font-yantramanav font-semibold">
            ID: <span className="font-muktaVaani">{order._id}</span>
          </p>
          <p className="text-sm text-gray-500 font-yantramanav">
            Placed on {new Date(order.date).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-500 font-yantramanav">
            Payment Method: {order.paymentMethod.toUpperCase()}
          </p>
        </div>
        <div
          className={`px-3 py-1 rounded-full text-sm font-medium font-yantramanav ${
            order.status === "Delivered"
              ? "bg-green-100 text-green-800"
              : order.status === "Shipped"
              ? "bg-blue-100 text-blue-800"
              : order.status === "Packing"
              ? "bg-orange-100 text-orange-600"
              : order.status === "Pending"
              ? "bg-orange-100 text-orange-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {order.status}
        </div>
      </div>

      {order.items.map((item, idx) => (
        <div
          key={idx}
          className="flex items-center space-x-4 py-4 border-b last:border-b-0"
        >
          <img
            src={item.image[0]}
            alt={item.name}
            className="w-20 h-28 object-cover aspect-auto rounded-md"
          />
          <div className="flex-1 space-y-2">
            <p className="font-medium text-gray-700 line-clamp-1 font-muktaVaani">
              {item.name}
            </p>
            <div className="flex items-center text-sm text-gray-500 font-yantramanav">
              <p>Qty: {item.quantity}</p>
              <span className="mx-2">•</span>
              <p>Size: {item.size}</p>
              <span className="mx-2">•</span>
              <p>KSH {item.price.toLocaleString()}</p>
            </div>
            <p className="text-sm text-gray-500 font-imprima line-clamp-2">
              {item.description}
            </p>
          </div>
        </div>
      ))}

      <div className="flex justify-between items-start pt-4">
        <div className="space-y-1">
          <p className="font-medium text-gray-800 font-muktaVaani">
            Delivery Details:
          </p>
          <p className="text-sm text-gray-500 font-yantramanav">
            {order.address.firstName} {order.address.lastName}
          </p>
          <p className="text-sm text-gray-500 font-yantramanav">
            {order.address.phone}
          </p>
          <p className="text-sm text-gray-500 font-yantramanav">
            {order.address.email}
          </p>
          <p className="text-sm text-gray-500 font-yantramanav">
            {order.address.street}
          </p>
          <p className="text-sm text-gray-500 font-yantramanav">
            {order.address.city}, {order.address.county}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500 font-muktaVaani">Total Amount:</p>
          <p className="text-lg font-medium text-gray-800">
            KSH {order.amount.toLocaleString()}
          </p>

          {countdown.minutes > 0 || countdown.seconds > 0 ? (
            <div className="text-center text-sm text-gray-600 font-yantramanav">
              Remaining:{" "}
              <span className="font-muktaVaani">{countdown.minutes}</span>:
              <span className="font-muktaVaani">
                {countdown.seconds.toString().padStart(2, "0")}
              </span>
            </div>
          ) : (
            <p className="text-sm text-gray-500 font-yantramanav mt-1">
              Status: {order.payment ? "Paid" : "Pending"}
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-3 pt-4 justify-end">
        {order.status === "Delivered" ? (
          <button
            onClick={() => {
              toast.error("Feature Not Implemented", {
                id: "Feature Not Implemented",
              });
            }}
            className="border bg-blue-100 px-4 py-2 text-sm font-medium rounded-md transition-colors hover:bg-gray-200 text-gray-700 cursor-pointer"
          >
            Apply For Refund
          </button>
        ) : (
          <button
            disabled={loading || order.payment || order.status !== "Pending"}
            onClick={() => cancelOrder(order._id)}
            className={`border px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              loading || order.status !== "Pending" || order.payment
                ? "opacity-50 cursor-not-allowed bg-gray-100"
                : "hover:bg-gray-200 bg-white text-gray-700 cursor-pointer"
            }`}
          >
            Cancel Order
          </button>
        )}

        {!order.payment ? (
          <button
            onClick={(e) => completePurchasesConfirmation(e, order)}
            className="bg-blue-600 text-white px-4 py-2 text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            {secondsElapsed < 30 ? (
              <div className="flex justify-center items-center gap-2">
                <p>Checking: {30 - secondsElapsed}</p>
                <RefreshCw
                  className="me-1 inline-block animate-spin"
                  size={16}
                />
              </div>
            ) : (
              "Pay Now"
            )}
          </button>
        ) : (
          <button
            onClick={(e) => handleTrackOrder(e, order)}
            className="border px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-200 bg-white text-gray-700 transition-colors"
          >
            Track Order
          </button>
        )}
      </div>

      {order.status === "Delivered" && order.payment && (
        <div className="flex justify-end">
          <button
            onClick={() => handleWriteReview(order)}
            className="mt-4 bg-gray-900 text-white px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-800 transition-colors"
          >
            Write a Review
          </button>
        </div>
      )}
    </div>
  );
}
