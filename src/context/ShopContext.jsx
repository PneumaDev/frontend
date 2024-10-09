import { createContext } from "react";
import { products } from "../assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = () => {
  const currency = "Ksh.";
  const delivery_fee = 10;

  const value = {
    products,
    currency,
    delivery_fee,
  };

  return (
    <ShopContextProvider.Provider value={value}>
      {props.children}
    </ShopContextProvider.Provider>
  );
};

export default ShopContextProvider;
