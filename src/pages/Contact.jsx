import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

export default function Contact() {
  return (
    <div className="">
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} tex2={"US"} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          src={assets.contact_img}
          alt=""
          className="w-full md:max-w-[480px]"
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-muktaVaani font-semibold text-xl text-gray-600">
            Our Store
          </p>
          <p className="font-imprima text-gray-500">
            Eridanus Plaza, Moi Avenue, Next to I&M Towers <br /> Nairobi, Kenya{" "}
          </p>
          <p className="text-gray-500 font-imprima">
            Tel:{" "}
            <a href="tel:+254704777637" className="border-b border-black">
              (+254) 704 777 637
            </a>{" "}
            <br />
            Email:
            <a href="mailto:njigupaul22@gmail.com" className="">
              {" "}
              njigupaul22@gmail.com
            </a>
          </p>
          <p className="font-semibold font-yantramanav text-xl text-gray-600">
            Careers at Forever
          </p>
          <p className="text-gray-500 font-muktaVaani">
            Learn More About Our Teams And Job Openings.
          </p>
          <button className="border font-yantramanav border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
            Explore Jobs
          </button>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
}
