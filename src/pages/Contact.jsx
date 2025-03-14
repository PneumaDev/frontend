import React from "react";
import Title from "../components/Title";
import { accordionItems, assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";
import Accordion from "../components/Accordion";

export default function Contact() {
  return (
    <div className="flex flex-col justify-center gap-y-12">
      {/* Title Section */}
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} tex2={"US"} />
      </div>

      {/* Contact Information Section */}
      <div className=" flex flex-col justify-center md:flex-row gap-16">
        <img
          src={assets.contact_img}
          alt="Contact"
          className="w-full md:max-w-[480px] rounded-xl shadow-lg"
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
          <button className="border font-yantramanav border-black px-4 py-3 rounded-lg text-sm hover:bg-black hover:text-white transition-all duration-500">
            Explore Jobs
          </button>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="flex flex-col justify-center items-center">
        <h2 className="font-bold text-2xl font-yantramanav px-2 mb-4 text-center">
          Frequently Asked Questions
        </h2>
        <div className="border pt-3 px-4 rounded-md w-full md:w-1/2 mx-auto">
          <Accordion items={accordionItems} />
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="mt-8">
        <NewsletterBox />
      </div>
    </div>
  );
}
