import React, { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Spinner from "./components/Spinner";

const Home = lazy(() => import("./pages/Home"));
const Collection = lazy(() => import("./pages/Collection"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Product = lazy(() => import("./pages/Product"));
const Login = lazy(() => import("./pages/Login"));
const Cart = lazy(() => import("./pages/Cart"));
const PlaceOrder = lazy(() => import("./pages/PlaceOrder"));
const Orders = lazy(() => import("./pages/Orders"));
const Navbar = lazy(() => import("./components/Navbar"));
const Footer = lazy(() => import("./components/Footer"));
const SearchBar = lazy(() => import("./components/SearchBar"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <Navbar />
      <div className="mx-4">
        <Toaster
          toastOptions={{
            className:
              "font-imprima bg-gray-100 shadow-md rounded-md border border-gray-300", // General toast styling
            loading: {
              style: {
                background: "#3B82F6", // A soft blue for loading toasts
                color: "#ffffff",
                borderRadius: "8px",
                padding: "12px",
                border: "1px solid #3B82F6",
              },
              iconTheme: {
                primary: "#ffffff",
                secondary: "#3B82F6",
              },
            },
            success: {
              style: {
                background: "#10B981", // A green for success toasts
                color: "#ffffff",
                borderRadius: "8px",
                padding: "12px",
                border: "1px solid #10B981",
              },
              iconTheme: {
                primary: "#ffffff",
                secondary: "#10B981",
              },
            },
            error: {
              style: {
                background: "#EF4444", // A red for error toasts
                color: "#ffffff",
                borderRadius: "8px",
                padding: "12px",
                border: "1px solid #EF4444",
              },
              iconTheme: {
                primary: "#ffffff",
                secondary: "#EF4444",
              },
            },
          }}
        />
        <SearchBar />
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/placeorder" element={<PlaceOrder />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </div>
  );
}
