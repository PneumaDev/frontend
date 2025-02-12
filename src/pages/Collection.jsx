import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import Spinner from "../components/Spinner";
import SearchInput from "../components/SearchInput";
import InfoMessage from "../components/InfoComponent";

export default function Collection() {
  const {
    products,
    search,
    showSearch,
    getProductsData,
    queryParams,
    loading,
  } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  // Fetch products on initial load if the products list is empty
  useEffect(() => {
    const fetchProducts = async () => {
      await getProductsData();
    };
    const term = queryParams.get("search");

    if (products.length === 0 && term == "") {
      fetchProducts();
    }
  }, [products, getProductsData]);

  // Function to filter and sort products
  const filterAndSortProducts = () => {
    let productsCopy = products.slice();

    // 🔍 Apply filters
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    // 🔽 Apply sorting after filtering
    switch (sortType) {
      case "low-high":
        productsCopy.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        productsCopy.sort((a, b) => b.price - a.price);
        break;
      default:
        break; // No sorting applied
    }

    setFilterProducts(productsCopy);
  };

  // 🔄 Run when filters, sorting, or product list changes
  useEffect(() => {
    if (!loading) {
      filterAndSortProducts();
    }
  }, [category, subCategory, search, showSearch, products, sortType, loading]);

  // Function to toggle categories in filters
  const toggleCategory = (e) => {
    setCategory((prev) =>
      prev.includes(e.target.value)
        ? prev.filter((item) => item !== e.target.value)
        : [...prev, e.target.value]
    );
  };

  // Function to toggle subcategories in filters
  const toggleSubCategory = (e) => {
    setSubCategory((prev) =>
      prev.includes(e.target.value)
        ? prev.filter((item) => item !== e.target.value)
        : [...prev, e.target.value]
    );
  };

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-5 lg:pt-10 border-t">
      {/* Filter Options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-lg flex items-center cursor-pointer gap-2 font-yantramanav"
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            alt=""
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
          />
        </p>
        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium font-muktaVaani">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm fontt-light text-gray-700">
            <p className="flex gap-2 font-imprima">
              <input
                type="checkbox"
                className="w-3"
                value={"Men"}
                onClick={toggleCategory}
              />{" "}
              Men
            </p>
            <p className="flex gap-2 font-imprima">
              <input
                type="checkbox"
                className="w-3"
                value={"Women"}
                onClick={toggleCategory}
              />{" "}
              Women
            </p>
            <p className="flex gap-2 font-imprima">
              <input
                type="checkbox"
                className="w-3"
                value={"Kids"}
                onClick={toggleCategory}
              />{" "}
              Kids
            </p>
          </div>
        </div>
        {/* SubCategory Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium font-muktaVaani">TYPE</p>
          <div className="flex flex-col gap-2 text-sm fontt-light text-gray-700">
            <p className="flex gap-2 font-imprima">
              <input
                type="checkbox"
                className="w-3"
                value={"Topwear"}
                onClick={toggleSubCategory}
              />{" "}
              Topwear
            </p>
            <p className="flex gap-2 font-imprima">
              <input
                type="checkbox"
                className="w-3"
                value={"Bottomwear"}
                onClick={toggleSubCategory}
              />{" "}
              Bottomwear
            </p>
            <p className="flex gap-2 font-imprima">
              <input
                type="checkbox"
                className="w-3"
                value={"Winterwear"}
                onClick={toggleSubCategory}
              />{" "}
              Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-base mb-4">
          <Title text1={"ALL"} tex2={"COLLECTIONS"} />
          {/* Product Sort */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            name=""
            id=""
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relevant" className="font-imprima">
              Sort by: Relevant
            </option>
            <option value="low-high" className="font-imprima">
              Sort by: Low to High
            </option>
            <option value="high-low" className="font-imprima">
              Sort by: High to Low
            </option>
          </select>
        </div>

        {/* Map products */}

        <div className="">
          <SearchInput />
        </div>
        {loading ? (
          <Spinner />
        ) : !loading && products.length === 0 ? (
          <div className="flex justify-center">
            <InfoMessage
              message={"There are no products matching the selection."}
              title={"No Products"}
            />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
              {filterProducts.map((item, index) => (
                <ProductItem
                  key={index}
                  name={item.name}
                  id={item._id}
                  price={item.price}
                  image={item.image}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
