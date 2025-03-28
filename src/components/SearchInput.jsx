import React, { useContext, useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { ShopContext } from "../context/ShopContext";

export default function SearchInput() {
  const [searchTerm, setSearchTerm] = useState("");
  const { getProductsData, navigate, location, queryParams, loading } =
    useContext(ShopContext);

  const ref = useRef(null);
  const lastSearchedTerm = useRef("");

  useEffect(() => {
    const term = queryParams.get("search") || "";
    if (term === "" && window.innerWidth >= 1024) {
      ref.current.focus();
    }
  }, []);

  useEffect(() => {
    const term = queryParams.get("search") || "";
    if (term !== searchTerm) {
      setSearchTerm(term);
    }

    if (lastSearchedTerm.current !== term) {
      handleSearchTerm(term, false);
    }
  }, [location.search]);

  const handleSearchTerm = async (item, shouldNavigate = true) => {
    const searchItem = item === "All" ? "" : item || searchTerm;

    if (lastSearchedTerm.current === searchItem) {
      if (shouldNavigate) updateURL(searchItem);
      return; //
    }

    try {
      await getProductsData({ name: searchItem });
      lastSearchedTerm.current = searchItem;
    } catch (error) {
      console.error("Error fetching products:", error);
    }

    if (shouldNavigate) updateURL(searchItem);
  };

  const updateURL = (searchItem) => {
    const params = new URLSearchParams(location.search);
    if (searchItem !== "") {
      params.set("search", searchItem);
    } else {
      params.set("search", "");
    }
    navigate(`/collection?${params.toString()}`, { replace: true });
  };

  return (
    <div className="relative flex flex-col items-center gap-3 mb-4">
      {/* Search Box */}
      <div className="relative w-[90%] sm:w-[50%]">
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearchTerm()}
          value={searchTerm}
          ref={ref}
          type="text"
          placeholder="Search for products..."
          className="w-full p-3 pl-12 pr-12 border border-gray-300 rounded-full text-sm focus:outline-blue-400 focus:border-none shadow-sm focus:ring-2 focus:ring-blue-300 transition-all"
        />
        <Search
          onClick={() => handleSearchTerm()}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-blue-500 transition"
          size={20}
        />
      </div>

      {/* Horizontally Scrollable Filter Buttons */}
      <div className="hide-scrollbar scroller max-w-full overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 snap-x snap-mandatory px-2 rounded-lg shadow-sm">
        <div className="flex gap-3 py-2 px-4 flex-nowrap">
          {[
            "All",
            "Trousers",
            "Shirts",
            "Dresses",
            "Tops",
            "Sweaters",
            "Shorts",
            "Shoes",
            "Accessories",
          ].map((item, index) => {
            const isActive =
              queryParams.get("search") === item ||
              (item === "All" && !queryParams.get("search"));

            return (
              <button
                type="button"
                key={index}
                className={`px-4 py-2 text-sm font-medium border border-gray-300 rounded-full transition-all focus:outline-none  focus:ring-blue-300 snap-start 
                  ${
                    isActive
                      ? "bg-blue-400 text-white border-blue-500"
                      : "bg-gray-100 text-gray-700 hover:bg-blue-100 hover:border-blue-400"
                  }`}
                onClick={() => handleSearchTerm(item)}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
