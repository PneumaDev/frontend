import React, { useContext, useEffect, useState } from "react";
import { Truck } from "lucide-react";
import { shippingMethods } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

export default function ShippingMethodSelector() {
  const { setDeliveryFee } = useContext(ShopContext);

  const [selectedMethod, setSelectedMethod] = useState({
    method: "Shop Pickup - Ronald Ngala Street",
    price: "FREE",
  });

  const handleSelectChange = (e) => {
    const selectedOption = shippingMethods.find(
      (method) => method.method === e.target.value
    );
    setSelectedMethod({
      method: selectedOption.method,
      price: selectedOption.price,
    });
  };
  useEffect(() => {
    setDeliveryFee(selectedMethod.price === "FREE" ? 0 : selectedMethod.price);
  }, [selectedMethod]);

  return (
    <div className="w-full mx-auto">
      <div className="bg-white rounded-lg p-4 space-y-3 shadow-md">
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <Truck className="w-5 h-5 text-gray-600" />
          <label
            htmlFor="shipping"
            className="text-gray-700 font-semibold text-sm sm:text-base font-yantramanav"
          >
            Shipping Method
          </label>
        </div>
        <select
          className="w-full rounded-md"
          id="shipping"
          required
          value={selectedMethod.method}
          onChange={handleSelectChange}
        >
          {shippingMethods.map((method, index) => (
            <option
              value={method.method}
              className="font-muktaVaani"
              key={index}
            >
              {method.method} - {method.price === "FREE" ? "" : "Ksh."}
              {method.price}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
