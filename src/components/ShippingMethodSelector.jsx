import React, { useContext, useEffect, useState } from "react";
import { Truck, ChevronDown } from "lucide-react";
import { shippingMethods } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

export default function ShippingMethodSelector() {
  const { setDelivery, shippingMethod } = useContext(ShopContext);

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
    // setDelivery(selectedMethod.price === "FREE" ? 0 : selectedMethod.price);

    setDelivery({
      price: selectedMethod.price === "FREE" ? 0 : selectedMethod.price,
      method: selectedMethod.method,
    });
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

        <div className="relative">
          <select
            className="w-full font-muktaVaani rounded-md border py-2 pl-3 pr-8 border-gray-600 appearance-none"
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

          {/* Custom Arrow Icon inside the select */}
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <ChevronDown className="w-5 h-5 text-gray-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
