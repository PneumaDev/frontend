import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { assets } from "../assets/assets";
import SearchInput from "./SearchInput";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Hero() {
  return (
    <div className="">
      <div className="mt-4">
        <SearchInput />
      </div>
      <div className="relative bg-gray-100 border border-gray-300 rounded-lg mt-4 overflow-hidden">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation={false}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          className="h-[80vh] sm:h-[550px]"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="flex flex-col sm:flex-row h-full items-center bg-white">
              <div className="w-full sm:w-1/2 px-6 py-10 sm:py-0">
                <div className="text-gray-800 max-w-lg mx-auto sm:mx-0 text-center sm:text-left">
                  <p className="text-sm md:text-base font-yantramanav tracking-widest mb-2">
                    BESTSELLER COLLECTION
                  </p>
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-muktaVaani leading-tight prata-regular">
                    Latest Trends of the Season
                  </h1>
                  <p className="text-gray-600 text-sm md:text-base mt-4 font-imprima">
                    Explore our curated collection designed to elevate your
                    wardrobe and add sophistication to every look.
                  </p>
                  <button className="mt-6 bg-gray-800 text-white py-2 px-6 rounded-lg text-sm md:text-base font-semibold shadow-lg hover:bg-gray-700 transition">
                    Shop Now
                  </button>
                </div>
              </div>
              <div className="w-full sm:w-1/2 h-full">
                <img
                  src={assets.hero_img}
                  alt="Hero Slide 1"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Decorative Shapes (Optional) */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-300 rounded-full opacity-30 transform translate-x-10 -translate-y-10 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-28 h-28 bg-pink-300 rounded-full opacity-30 transform -translate-x-10 translate-y-10"></div>
            <div className="absolute top-1/4 left-0 w-24 h-24 bg-purple-200 rounded-full opacity-20 transform -translate-x-12 -translate-y-12 rotate-45"></div>
            <div className="absolute bottom-1/4 right-0 w-32 h-32 bg-yellow-200 rounded-full opacity-20 transform translate-x-12 translate-y-12 scale-110"></div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div className="flex flex-col sm:flex-row h-full items-center bg-white">
              <div className="w-full sm:w-1/2 px-6 py-10 sm:py-0">
                <div className="text-gray-800 max-w-lg mx-auto sm:mx-0 text-center sm:text-left">
                  <p className="text-sm md:text-base font-yantramanav tracking-widest mb-2">
                    NEW ARRIVALS
                  </p>
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl leading-tight prata-regular font-muktaVaani">
                    Exclusive Styles for You
                  </h1>
                  <p className="text-gray-600 text-sm md:text-base mt-4 font-imprima">
                    Fresh off the runway and into your closet, shop our latest
                    collection to make a statement.
                  </p>
                  <button className="mt-6 bg-gray-800 text-white py-2 px-6 rounded-lg text-sm md:text-base font-semibold shadow-lg hover:bg-gray-700 transition">
                    Explore Now
                  </button>
                </div>
              </div>
              <div className="w-full sm:w-1/2 h-full">
                <img
                  src={assets.hero_img_2}
                  alt="Hero Slide 2"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {/* Decorative Shapes (Optional) */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-300 rounded-full opacity-30 transform translate-x-10 -translate-y-10 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-28 h-28 bg-pink-300 rounded-full opacity-30 transform -translate-x-10 translate-y-10"></div>
            <div className="absolute top-1/4 left-0 w-24 h-24 bg-purple-200 rounded-full opacity-20 transform -translate-x-12 -translate-y-12 rotate-45"></div>
            <div className="absolute bottom-1/4 right-0 w-32 h-32 bg-yellow-200 rounded-full opacity-20 transform translate-x-12 translate-y-12 scale-110"></div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <div className="flex flex-col sm:flex-row h-full items-center bg-white">
              <div className="w-full sm:w-1/2 px-6 py-10 sm:py-0">
                <div className="text-gray-800 max-w-lg mx-auto sm:mx-0 text-center sm:text-left">
                  <p className="text-sm md:text-base font-yantramanav tracking-widest mb-2">
                    LIMITED TIME OFFER
                  </p>
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl leading-tight prata-regular">
                    Up to 50% Off!
                  </h1>
                  <p className="text-gray-600 text-sm md:text-base mt-4 font-imprima">
                    Don't miss out on our exclusive discounts. Shop now and save
                    big on your favorite items.
                  </p>
                  <button className="mt-6 bg-red-600 text-white py-2 px-6 rounded-lg text-sm md:text-base font-semibold shadow-lg hover:bg-red-500 transition font-muktaVaani">
                    Shop the Sale
                  </button>
                </div>
              </div>
              <div className="w-full sm:w-1/2 h-full">
                <img
                  src={assets.hero_img_3}
                  alt="Hero Slide 3"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {/* Decorative Shapes (Optional) */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-300 rounded-full opacity-30 transform translate-x-10 -translate-y-10 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-28 h-28 bg-pink-300 rounded-full opacity-30 transform -translate-x-10 translate-y-10"></div>
            <div className="absolute top-1/4 left-0 w-24 h-24 bg-purple-200 rounded-full opacity-20 transform -translate-x-12 -translate-y-12 rotate-45"></div>
            <div className="absolute bottom-1/4 right-0 w-32 h-32 bg-yellow-200 rounded-full opacity-20 transform translate-x-12 translate-y-12 scale-110"></div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
