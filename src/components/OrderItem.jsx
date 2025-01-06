import React, { useContext, useEffect, useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";
import toast from "react-hot-toast";
import { AdvancedImage } from "@cloudinary/react";
import { lazyload } from "@cloudinary/react";
import { scale } from "@cloudinary/url-gen/actions/resize";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

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

  const { cloudinary, backendUrl, token } = useContext(ShopContext);

  let secondsPollInterval;

  // Track seconds elapsed since order was updated
  useEffect(() => {
    const orderAgeInSeconds = calculateTimePassed(order.updatedAt);
    setSecondsElapsed(orderAgeInSeconds);

    if (orderAgeInSeconds < 60) {
      const interval = setInterval(() => {
        setSecondsElapsed((prev) => {
          if (prev + 1 >= 60) {
            clearInterval(secondsPollInterval);
            clearInterval(interval);
            return 60;
          }
          return prev + 1;
        });
      }, 1000);

      secondsPollInterval = setInterval(() => {
        pollPayment();
      }, 15000);

      return () => {
        clearInterval(interval);
        clearInterval(secondsPollInterval);
      };
    } else {
      setSecondsElapsed(60);
    }
  }, [order.updatedAt, calculateTimePassed]);

  // Track countdown timer if order is less than 15 minutes old
  useEffect(() => {
    const orderAgeInSeconds = calculateTimePassed(order.updatedAt);
    if (orderAgeInSeconds < 900 && !order.payment) {
      const remainingTime = 900 - orderAgeInSeconds;
      setCountdown({
        minutes: Math.floor(remainingTime / 60),
        seconds: remainingTime % 60,
      });

      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev.minutes === 0 && prev.seconds === 0) {
            clearInterval(timer);
            clearInterval(pollInterval);
            // cancelOrder(order._id);
            return { minutes: 0, seconds: 0 };
          }

          const totalSeconds = prev.minutes * 60 + prev.seconds - 1;
          return {
            minutes: Math.floor(totalSeconds / 60),
            seconds: totalSeconds % 60,
          };
        });
      }, 1000);

      const pollInterval = setInterval(() => {
        pollPayment();
      }, 300000);

      return () => {
        clearInterval(timer);
        clearInterval(pollInterval);
      };
    }
  }, [order.updatedAt, calculateTimePassed]);

  // Memoize processed Cloudinary images
  const processedImages = useMemo(() => {
    return order.items.map((item) => {
      if (!item.image || item.image.length === 0) return null;

      const publicId = item.image[0]
        .split("/")
        .slice(-2)
        .join("/")
        .split(".")[0];

      return cloudinary
        .image(publicId)
        .format("auto")
        .quality("auto")
        .resize(scale().width(150));
    });
  }, [order.items]);

  const pollPayment = async () => {
    console.log(order);
    const res = await axios.post(
      backendUrl + "/api/order/confirmpayment",
      { order },
      { headers: { token } }
    );

    console.log(res);

    if (res.data.status && res.data.success) {
      console.log("Payment was successfull");
      window.location.reload();
    } else {
      // console.log("Payment not successful");
      clearInterval(secondsPollInterval);
    }
  };

  return (
    <div className="p-6 border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow space-y-4">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
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
              ? "bg-green-200 text-green-900"
              : order.status === "Shipped"
              ? "bg-blue-100 text-blue-800"
              : order.status === "Packing"
              ? "bg-orange-100 text-orange-600"
              : order.status === "Pending"
              ? "bg-orange-100 text-orange-800"
              : order.status === "Confirmed"
              ? "bg-teal-100 text-teal-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {order.status}
        </div>
      </div>

      {order.items.map((item, idx) => {
        // Guard clause for items without images
        if (!item.image || item.image.length === 0) {
          console.warn(`No image found for item: ${item.name}`);
          return null;
        }

        return (
          <div
            key={idx}
            className="flex items-center space-x-4 py-4 border-b last:border-b-0"
          >
            {/* Product Image */}
            <AdvancedImage
              cldImg={processedImages[idx]}
              className="w-20 h-28 object-cover aspect-auto rounded-md"
              plugins={[lazyload()]}
              alt={`Product ${item.name}`}
            />
            {/* Product Details */}
            <div className="flex-1 space-y-2">
              {/* Product Name */}
              <p className="font-medium text-gray-700 line-clamp-1 font-muktaVaani">
                {item.name}
              </p>
              {/* Quantity, Size, and Price */}
              <div className="flex items-center text-sm text-gray-500 font-yantramanav">
                <p>Qty: {item.quantity}</p>
                <span className="mx-2">•</span>
                <p>Size: {item.size}</p>
                <span className="mx-2">•</span>
                <p>KSH {item.price.toLocaleString()}</p>
              </div>
              {/* Product Description */}
              <p className="text-sm text-gray-500 font-imprima line-clamp-2">
                {item.description}
              </p>
            </div>
          </div>
        );
      })}

      <div className="flex justify-between items-start pt-4">
        <div className="space-y-1">
          <p className="font-medium text-gray-800 font-muktaVaani">
            Delivery Details:
          </p>
          <p className="text-sm text-gray-500 font-bold font-muktaVaani line-clamp-1">
            {order.shippingMethod?.slice(0, 20) + "..."}
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
            {order.address.constituency}, {order.address.county}
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
            className="border bg-blue-200 px-4 py-2 text-sm font-medium rounded-md transition-colors hover:bg-blue-300 text-gray-700 cursor-pointer"
          >
            Apply For Refund
          </button>
        ) : (
          <button
            disabled={
              loading ||
              order.payment ||
              order.status !== "Pending" ||
              secondsElapsed < 60
            }
            onClick={() => cancelOrder(order._id)}
            className={`border px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              loading ||
              order.status !== "Pending" ||
              order.payment ||
              secondsElapsed < 60
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
            className="relative bg-blue-600 text-white px-4 py-2 text-sm font-medium rounded-md hover:bg-blue-700 active:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center gap-2"
            disabled={secondsElapsed < 60}
          >
            {secondsElapsed < 60 ? (
              <div className="flex items-center gap-2">
                <p className="text-xs font-medium">
                  Checking: {60 - secondsElapsed}s
                </p>
                <RefreshCw className="animate-spin" size={16} />
              </div>
            ) : (
              <span className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4m0 4h.01m6.938-2A7.938 7.938 0 1112 4.062a7.938 7.938 0 016.938 10z"
                  />
                </svg>
                Pay Now
              </span>
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
            className="mt-4 bg-gray-60 text-white px-4 py-2 text-sm font-medium rounded-md bg-gray-700 hover:bg-gray-950 transition-colors"
          >
            Write a Review
          </button>
        </div>
      )}
    </div>
  );
}
