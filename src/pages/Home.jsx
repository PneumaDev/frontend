import React, { useContext, useEffect } from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import OurPolicy from "../components/OurPolicy";
import NewsletterBox from "../components/NewsletterBox";
import BestSeller from "../components/BestSeller";
import { ShopContext } from "../context/ShopContext";

export default function Home() {
  const { getProductsData } = useContext(ShopContext);

  useEffect(() => {
    getProductsData();
  }, []);

  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsletterBox />
    </div>
  );
}
