import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";

export default function FilterSidebar({
  showFilter,
  setShowFilter,
  products,
  setFilterProducts,
}) {
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  // Function to toggle categories
  const toggleCategory = (e) => {
    setCategory((prev) =>
      prev.includes(e.target.value)
        ? prev.filter((item) => item !== e.target.value)
        : [...prev, e.target.value]
    );
  };

  // Function to toggle subcategories
  const toggleSubCategory = (e) => {
    setSubCategory((prev) =>
      prev.includes(e.target.value)
        ? prev.filter((item) => item !== e.target.value)
        : [...prev, e.target.value]
    );
  };

  // Function to filter products
  useEffect(() => {
    let filteredProducts = [...products];

    if (category.length > 0) {
      filteredProducts = filteredProducts.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      filteredProducts = filteredProducts.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProducts(filteredProducts);
  }, [category, subCategory, products, setFilterProducts]);

  return (
    <>
      {/* Overlay to disable background interactions */}
      {showFilter && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
          onClick={() => setShowFilter(false)}
        ></div>
      )}

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50 transform ${
          showFilter ? "translate-x-0" : "-translate-x-full"
        } transition-transform sm:relative sm:translate-x-0 sm:block `}
      >
        {/* Close Button (Mobile) */}
        <button
          className="sm:hidden absolute top-8 right-3 text-xl font-bold"
          onClick={() => setShowFilter(false)}
        >
          ✕
        </button>

        {/* Category Filter */}
        <div className="md:border md:border-gray-300 pl-5 py-3 mt-6">
          <p className="mb-3 text-sm font-medium font-muktaVaani">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {["Men", "Women", "Kids"].map((cat) => (
              <label key={cat} className="flex gap-2 font-imprima">
                <input
                  type="checkbox"
                  className="w-3"
                  value={cat}
                  onChange={toggleCategory}
                  checked={category.includes(cat)}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* SubCategory Filter */}
        <div className="md:border md:border-gray-300 pl-5 py-3 my-5">
          <p className="mb-3 text-sm font-medium font-muktaVaani">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {["Topwear", "Bottomwear", "Winterwear"].map((sub) => (
              <label key={sub} className="flex gap-2 font-imprima">
                <input
                  type="checkbox"
                  className="w-3"
                  value={sub}
                  onChange={toggleSubCategory}
                  checked={subCategory.includes(sub)}
                />
                {sub}
              </label>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
