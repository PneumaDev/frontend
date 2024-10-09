import React from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import OurPolicy from "../components/OurPolicy";
import NewsletterBox from "../components/NewsletterBox";

export default function Home() {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <OurPolicy />
      <NewsletterBox />
    </div>
  );
}
