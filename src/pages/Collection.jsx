import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import Spinner from "../components/Spinner";
import SearchInput from "../components/SearchInput";
import InfoMessage from "../components/InfoComponent";
import { assets } from "../assets/assets";
import FilterSidebar from "../components/FilterDrawer";

export default function Collection() {
  const { products, getProductsData, queryParams, loading } =
    useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  useEffect(() => {
    if (products.length === 0 && queryParams.get("search") === "") {
      console.log("called");
      getProductsData();
    }
  }, [products, getProductsData]);

  useEffect(() => {
    let sortedProducts = [...products];

    switch (sortType) {
      case "low-high":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilterProducts(sortedProducts);
  }, [sortType, products]);

  return (
    <div className="relative flex flex-col sm:flex-row gap-1 sm:gap-10 pt-5 lg:pt-10 border-t">
      {/* Open Filters Button (Mobile) */}
      <button
        onClick={() => setShowFilter(true)}
        className="sm:hidden flex items-center gap-2 text-lg font-yantramanav mb-3"
      >
        FILTERS
        <img src={assets.dropdown_icon} alt="Open Filters" className="h-3" />
      </button>

      {/* Sidebar Filter Component */}
      <FilterSidebar
        showFilter={showFilter}
        setShowFilter={setShowFilter}
        products={products}
        setFilterProducts={setFilterProducts}
      />

      {/* Overlay to blur and disable interactions */}
      {showFilter && (
        <div className="fixed inset-0 bg-black bg-opacity-50  z-40 sm:hidden"></div>
      )}

      {/* Content Section (disable when sidebar is open) */}
      <div
        className={`flex-1 transition-all ${
          showFilter ? "pointer-events-none blur-sm" : ""
        }`}
      >
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
        <div>
          <SearchInput />
        </div>

        {/* Product List */}
        {loading && products.length === 0 ? (
          <Spinner />
        ) : !loading && filterProducts.length === 0 ? (
          <div className="flex justify-center">
            <InfoMessage
              message="There are no products matching the selection."
              title="No Products"
            />
          </div>
        ) : (
          <div className="flex flex-col gap-y-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
              {filterProducts.map((item) => (
                <ProductItem
                  key={item._id}
                  name={item.name}
                  id={item._id}
                  price={item.price}
                  image={item.image}
                />
              ))}
            </div>
            {products.length % 12 === 0 && (
              <div className="flex justify-center">
                <button
                  className="bg-blue-500 text-white font-semibold rounded-md px-6 py-3 
             hover:bg-blue-600 hover:shadow-lg hover:scale-105 
             active:scale-100 transition-all duration-200 ease-in-out"
                  onClick={() => {
                    // Get current page number (default to 1 if not present)
                    const currentPage = Math.floor(products.length / 12);

                    if (products.length < 12) return;
                    // Fetch new products
                    getProductsData(
                      {
                        page: currentPage + 1,
                        name: queryParams.get("search") || "",
                      },
                      undefined,
                      undefined,
                      true
                    );
                  }}
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
