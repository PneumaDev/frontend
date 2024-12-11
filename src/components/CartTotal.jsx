import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

export default function CartTotal() {
  const { currency, getCartAmount, delivery } = useContext(ShopContext);

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"CART"} tex2={"TOTALS"} />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p className="font-muktaVaani">Subtotal</p>
          <p className="font-yantramanav">
            {currency} {getCartAmount()}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p className="font-muktaVaani">Shipping Fee</p>
          <p className="font-yantramanav">
            {currency} {delivery.price}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b className="font-muktaVaani">Total</b>
          <b className="font-yantramanav">
            {currency}{" "}
            {getCartAmount() === 0 ? 0 : getCartAmount() + delivery.price}.00
          </b>
        </div>
      </div>
    </div>
  );
}
