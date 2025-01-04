import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

export default function Footer() {
  return (
    <div className="">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div className="">
          <img src={assets.logo} className="mb-5 w-32" alt="" />
          <p className="w-full md:w-2/3 text-gray-600 font-imprima">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque ac congue libero, ut semper urna.
          </p>
        </div>
        <div className="">
          <p className="text-xl font-medium mb-5 font-muktaVaani">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <Link className="font-yantramanav" to={"/"}>
              Home
            </Link>
            <Link to={"/about"} className="font-yantramanav">
              About Us
            </Link>
            <Link className="font-yantramanav" to={""}>
              Delivery
            </Link>
            <li className="font-yantramanav">Privacy Policy</li>
          </ul>
        </div>
        <div className="">
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li className="">
              <a href="tel:+254704777637" className="font-yantramanav">
                (+254) 704 777 637
              </a>
            </li>
            <li>
              <a
                href="mailto:support@eridanus.com"
                className="font-yantramanav"
              >
                support@eridanus.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <footer className="mt-auto py-6">
        <div className="container mx-auto px-4">
          <hr className="border-gray-300 mb-4" />
          <p className="text-sm text-center text-gray-600">
            &copy; {new Date().getFullYear()} eridanus.com - All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
}
