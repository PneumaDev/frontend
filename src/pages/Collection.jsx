import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import Spinner from "../components/Spinner";

export default function Collection() {
  const { products, search, showSearch, getProductsData } =
    useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [loading, setLoading] = useState(false);

  // Fetch products on initial load if the products list is empty
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      await getProductsData();
      setLoading(false);
    };

    if (products.length === 0) {
      fetchProducts();
    }
  }, [products, getProductsData]);

  console.log(products);

  // Apply filters whenever relevant dependencies change
  useEffect(() => {
    if (!loading) {
      applyFilter();
    }
  }, [category, subCategory, search, showSearch, products, loading]);

  // Sort products whenever sortType changes
  useEffect(() => {
    if (!loading) {
      sortProduct();
    }
  }, [sortType, loading]);

  // Function to apply filters
  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

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

    setFilterProducts(productsCopy);
  };

  // Function to toggle categories in filters
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  // Function to toggle subcategories in filters
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  // Function to sort products
  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
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
        {loading ? (
          <Spinner />
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
