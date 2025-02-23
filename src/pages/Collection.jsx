import React, { useContext, useEffect, useState, useCallback } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import Spinner from "../components/Spinner";
import SearchInput from "../components/SearchInput";
import InfoMessage from "../components/InfoComponent";
import { assets } from "../assets/assets";

export default function Collection() {
  const { products, getProductsData, queryParams, loading } =
    useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch products only when necessary
  useEffect(() => {
    if (products.length === 0 && !queryParams.get("search")) {
      getProductsData();
    }
  }, [products.length, queryParams, getProductsData]);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...products];

    // Apply category filtering
    if (category.length > 0) {
      filtered = filtered.filter((item) => category.includes(item.category));
    }

    // Apply subcategory filtering
    if (subCategory.length > 0) {
      filtered = filtered.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    // Apply sorting
    switch (sortType) {
      case "low-high":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [category, subCategory, sortType, products]);

  // Load more products (pagination)
  const loadMoreProducts = useCallback(() => {
    if (products.length < 12) return;

    const nextPage = currentPage + 1;
    getProductsData(
      { page: nextPage, name: queryParams.get("search") || "" },
      undefined,
      undefined,
      true
    );
    setCurrentPage(nextPage);
  }, [currentPage, products.length, getProductsData, queryParams]);

  // Toggle category selection
  const toggleCategory = (value) => {
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  // Toggle subcategory selection
  const toggleSubCategory = (value) => {
    setSubCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  return (
    <div className="relative flex flex-col sm:flex-row gap-1 sm:gap-10 pt-5 lg:pt-10 border-t">
      {/* Sidebar - Filters */}
      {/* Mobile Overlay */}
      {showFilter && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 sm:hidden"
          onClick={() => setShowFilter(false)}
        />
      )}

      {/* Filter Drawer (Mobile) / Sidebar (md-lg) */}
      <div
        className={`fixed sm:relative top-0 left-0 h-full sm:h-auto bg-white z-50 sm:z-auto w-4/5 sm:w-auto min-w-44 shadow-lg sm:shadow-none transform ${
          showFilter ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        {/* Filter Header (Mobile Only) */}
        <div className="flex items-center justify-between px-5 py-3 sm:hidden border-b">
          <p className="text-lg font-yantramanav">Filters</p>
          <button onClick={() => setShowFilter(false)} className="text-xl">
            ✕
          </button>
        </div>

        {/* Category Filter */}
        <div className="border border-gray-300 p-4">
          <p className="mb-3 text-sm font-medium font-muktaVaani">CATEGORIES</p>
          {["Men", "Women", "Kids"].map((item) => (
            <label key={item} className="flex items-center gap-2 font-imprima">
              <input
                type="checkbox"
                className="w-4 h-4"
                value={item}
                onChange={() => toggleCategory(item)}
              />
              {item}
            </label>
          ))}
        </div>

        {/* SubCategory Filter */}
        <div className="border border-gray-300 p-4 mt-4">
          <p className="mb-3 text-sm font-medium font-muktaVaani">TYPE</p>
          {["Topwear", "Bottomwear", "Winterwear"].map((item) => (
            <label key={item} className="flex items-center gap-2 font-imprima">
              <input
                type="checkbox"
                className="w-4 h-4"
                value={item}
                onChange={() => toggleSubCategory(item)}
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      {/* Toggle Button (Mobile) */}
      <button
        onClick={() => setShowFilter(!showFilter)}
        className="sm:hidden flex items-center gap-2 text-lg font-yantramanav my-2"
      >
        FILTERS
        <img
          src={assets.dropdown_icon}
          alt=""
          className={`h-3 ${showFilter ? "rotate-90" : ""}`}
        />
      </button>

      {/* Content Section */}
      <div
        className={`flex-1 transition-all ${
          showFilter ? "pointer-events-none blur-sm" : ""
        }`}
      >
        {/* Header Section */}
        <div className="flex justify-between text-base sm:text-base mb-4">
          <Title text1="ALL" tex2="COLLECTIONS" />

          {/* Sorting Dropdown */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Search Input */}
        <SearchInput />

        {/* Product List */}
        {loading && products.length === 0 ? (
          <Spinner />
        ) : !loading && filteredProducts.length === 0 ? (
          <div className="flex justify-center">
            <InfoMessage
              message="There are no products matching the selection."
              title="No Products"
            />
          </div>
        ) : (
          <div className="flex flex-col gap-y-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
              {filteredProducts.map((item) => (
                <ProductItem
                  key={item._id}
                  name={item.name}
                  id={item._id}
                  price={item.price}
                  image={item.image}
                />
              ))}
            </div>

            {/* Load More Button */}
            {products.length % 20 === 0 && (
              <div className="flex justify-center">
                <button
                  className="bg-blue-500 text-white font-semibold rounded-md px-6 py-3 hover:bg-blue-600 hover:shadow-lg hover:scale-105 active:scale-100 transition-all duration-200 ease-in-out"
                  onClick={loadMoreProducts}
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
