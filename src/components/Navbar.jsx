import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { googleLogout } from "@react-oauth/google";

export default function Navbar() {
  const [visible, setIsVisible] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    setToken,
    token,
    setCartItems,
    navigate,
  } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    googleLogout();
    setTimeout(() => {
      localStorage.removeItem("token");
      setToken("");
      setCartItems({});
    }, 0);
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to={"/"}>
        <img src={assets.logo} className="w-36" />
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink
          to="/"
          className="flex flex-col items-center gap-1  font-yantramanav"
        >
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink
          to="/collection"
          className="flex flex-col items-center gap-1 font-yantramanav"
        >
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink
          to="/about"
          className="flex flex-col items-center gap-1 font-yantramanav"
        >
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink
          to="/contact"
          className="flex flex-col items-center gap-1 font-yantramanav"
        >
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          alt=""
          className="w-5 cursor-pointer"
        />
        <div className="group relative">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt=""
          />

          {/* -------------------- Drop Down --------------------*/}
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36  py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <p className="cursor-pointer hover:text-black font-muktaVaani">
                  Profile
                </p>
                <p
                  className="cursor-pointer hover:text-black font-muktaVaani"
                  onClick={() => navigate("/orders")}
                >
                  Orders
                </p>
                <p
                  onClick={logout}
                  className="cursor-pointer hover:text-black font-muktaVaani"
                >
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => setIsVisible(true)}
          src={assets.menu_icon}
          alt="menu_icon"
          className="w-5 cursor-pointer sm:hidden"
        />
      </div>

      {/* Side_bar Menu for smaller screens */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600 ">
          <div
            className="flex items-center gap-4 p-3 cursor-pointer"
            onClick={() => setIsVisible(false)}
          >
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="" />
            <p className="font-yantramanav">Back</p>
          </div>
          <NavLink
            onClick={() => setIsVisible(false)}
            className="py-2 pl-6 border font-muktaVaani"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setIsVisible(false)}
            className="py-2 pl-6 border font-muktaVaani"
            to="collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setIsVisible(false)}
            className="py-2 pl-6 border font-muktaVaani"
            to="about"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setIsVisible(false)}
            className="py-2 pl-6 border font-muktaVaani"
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
}
