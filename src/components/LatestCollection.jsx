import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

export default function LatestCollection() {
  const { products } = useContext(ShopContext);

  return <div>LatestCollection</div>;
}
