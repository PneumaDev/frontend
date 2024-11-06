import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

export default function About() {
  return (
    <div className="">
      <div className="text-2xl text-enter pt-8 border-t">
        <Title text1={"ABOUT"} tex2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          src={assets.about_img}
          alt=""
          className="w-full md:max-w-[450px]"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p className="font-imprima">
            Eridanus was born out of a passion for reliable, long-lasting
            essentials and a desire to revolutionize the way people stock their
            homes. Our journey began with a simple yet powerful idea: to provide
            a trustworthy platform where customers can discover and purchase
            quality non-perishable goods that stand the test of time.
          </p>
          <p className="font-imprima">
            Since our inception, we've worked tirelessly to curate a thoughtful
            selection of products that combine practicality with quality. Our
            extensive collection features both beloved generic staples and
            innovative original brands, ensuring that every customer finds
            exactly what they need. From pantry essentials to household
            supplies, each item in our inventory is carefully chosen for its
            reliability and value.
          </p>
          <b className="text-gray-800 font-yantramanav">Our Mission</b>
          <p className="font-imprima">
            Our mission at Eridanus is to empower customers with choice,
            convenience, and confidence. We're dedicated to providing a seamless
            shopping experience that exceeds expectations, from browsing and
            ordering to delivery and beyond.
          </p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={"WHY"} tex2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b className="font-muktaVaani">Qality Assurance:</b>
          <p className="font-imprima text-gray-600">
            We meticulously select and vet each product to ensure it meets our
            stringent quality standards.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 bg-gray-100">
          <b className="font-muktaVaani">Convenience::</b>
          <p className="font-imprima text-gray-600">
            With our user-friendly interface and hassle-free ordering process,
            shopping has never been easier.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b className="font-muktaVaani">Exceptional Customer Service:</b>
          <p className="font-imprima text-gray-600">
            Our team of dedicated professionals is here to assist you the way,
            ensuring your satisfaction is our top priority.
          </p>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
}
