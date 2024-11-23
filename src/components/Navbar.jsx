import React, { useContext, useEffect, useState, useRef } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { googleLogout } from "@react-oauth/google";
import {
  UserIcon,
  ShoppingBagIcon,
  LogOutIcon,
  ClipboardListIcon,
} from "lucide-react";

export default function Navbar() {
  const [visible, setIsVisible] = useState(false);
  const [isProfileDropdownVisible, setIsProfileDropdownVisible] =
    useState(false);
  const profileRef = useRef(null);

  const {
    setShowSearch,
    getCartCount,
    setToken,
    token,
    setCartItems,
    navigate,
    getUserCart,
  } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    googleLogout();
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("googleAuth");
      setToken("");
      setCartItems({});
    }, 0);
  };

  useEffect(() => {
    if (token) {
      getUserCart(token);
    }
  }, [token]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="flex items-center justify-between px-2 py-5 font-medium bg-white shadow-sm sticky top-0 z-50">
      {/* Logo */}
      <Link to={"/"}>
        <img src={assets.logo} className="w-36" alt="logo" />
      </Link>

      {/* Main Navigation */}
      <ul className="hidden sm:flex gap-8 text-sm text-gray-700">
        {["HOME", "COLLECTION", "ABOUT", "CONTACT"].map((item) => (
          <NavLink
            key={item}
            to={item === "HOME" ? "/" : item.toLowerCase()}
            className="flex flex-col items-center gap-1 font-yantramanav hover:text-black"
          >
            <p>{item}</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        ))}
      </ul>

      {/* Action Icons */}
      <div className="flex items-center gap-6">
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          alt="Search"
          className="w-5 cursor-pointer hover:opacity-70 transition-opacity"
        />

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <img
            onClick={() =>
              token
                ? setIsProfileDropdownVisible((prev) => !prev)
                : navigate("/login")
            }
            src={assets.profile_icon}
            className="w-5 cursor-pointer hover:opacity-70 transition-opacity"
            alt="Profile"
          />
          {token && isProfileDropdownVisible && (
            <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden transform origin-top-right transition-all duration-200 ease-out">
              <div className="py-1">
                <button
                  onClick={() => {
                    navigate("/profile");
                    setIsProfileDropdownVisible(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <UserIcon className="w-4 h-4 mr-3" />
                  <span>Profile</span>
                </button>

                <button
                  onClick={() => {
                    navigate("/orders");
                    setIsProfileDropdownVisible(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <ClipboardListIcon className="w-4 h-4 mr-3" />
                  <span>Orders</span>
                </button>

                <div className="border-t border-gray-100"></div>

                <button
                  onClick={() => {
                    logout();
                    setIsProfileDropdownVisible(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOutIcon className="w-4 h-4 mr-3" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Cart Icon */}
        <Link to="/cart" className="relative group">
          <img
            src={assets.cart_icon}
            className="w-5 min-w-5 group-hover:opacity-70 transition-opacity"
            alt="Cart"
          />
          <span className="absolute right-[-8px] bottom-[-8px] w-5 h-5 flex items-center justify-center bg-black text-white rounded-full text-xs transform transition-transform">
            {getCartCount()}
          </span>
        </Link>

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setIsVisible(true)}
          src={assets.menu_icon}
          alt="Menu"
          className="w-5 cursor-pointer sm:hidden hover:opacity-70 transition-opacity"
        />
      </div>

      {/* Drawer Menu */}
      {visible && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsVisible(false)}
          ></div>
          <div
            className={`fixed top-0 right-0 h-full w-3/4 max-w-xs bg-white z-50 shadow-lg transform ${
              visible ? "translate-x-0" : "translate-x-full"
            } transition-transform duration-300`}
          >
            <div className="flex flex-col text-gray-600 p-5">
              <div
                className="flex items-center gap-4 mb-5 cursor-pointer hover:text-black transition-colors"
                onClick={() => setIsVisible(false)}
              >
                <img
                  src={assets.dropdown_icon}
                  className="h-4 rotate-180"
                  alt="Back"
                />
                <p className="font-yantramanav">Back</p>
              </div>
              {["HOME", "COLLECTION", "ABOUT", "CONTACT"].map((item) => (
                <NavLink
                  key={item}
                  onClick={() => setIsVisible(false)}
                  className="py-3 pl-6 border-b font-muktaVaani hover:bg-gray-50 transition-colors"
                  to={`/${item.toLowerCase()}`}
                >
                  {item}
                </NavLink>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
