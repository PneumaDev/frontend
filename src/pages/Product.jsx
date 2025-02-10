import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import Spinner from "../components/Spinner";
import Modal from "../components/Modal";
import Login from "./Login";
import { AdvancedImage } from "@cloudinary/react";
import { lazyload } from "@cloudinary/react";
import { scale } from "@cloudinary/url-gen/actions/resize";
import InfoMessage from "../components/InfoComponent";

export default function Product() {
  const [loading, setLoading] = useState(false);
  const { productId } = useParams();
  const { products, currency, addToCart, token, cloudinary } =
    useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [productInfo, setProductInfo] = useState("Description");

  const location = useLocation();

  const ref = useRef(null);

  const fetchProductData = async () => {
    const product = products.find((product) => product._id === productId);
    if (product) {
      const publicId = product.image?.[0]
        .split("/")
        .slice(-2)
        .join("/")
        .split(".")[0];
      const cldFullImg = cloudinary
        .image(publicId)
        .format("auto")
        .quality("auto")
        .resize(scale().width(1000));
      setImage(cldFullImg || "");
      setProductData(product);
    } else {
      // console.error("Product not found!");
    }
  };

  useEffect(() => {
    if (token) {
      setOpenModal(false);
    }
  }, [token]);

  useEffect(() => {
    if (ref.current) ref.current.scrollIntoView({ behavior: "smooth" });
    setSize("");
  }, [location]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchProductData();
      setLoading(false);
    };

    fetchData();
  }, [productId, products]);

  const handleAddToCart = (id, size) => {
    if (!token) {
      return setOpenModal(true);
    }
    addToCart(id, size);
  };

  return loading || !productData ? (
    <Spinner />
  ) : (
    <div
      className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100"
      ref={ref}
    >
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex scroller sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image?.map((imgUrl, index) => {
              // Extract the public ID from the full URL
              const publicId = imgUrl
                .split("/")
                .slice(-2)
                .join("/")
                .split(".")[0];

              // Create a Cloudinary image instance for thumbnails
              const cldThumb = cloudinary
                .image(publicId)
                .format("auto")
                .quality("auto")
                .resize(scale().width(150)); // Thumbnail optimized size

              // Create a Cloudinary image instance for the main display
              const cldFullImg = cloudinary
                .image(publicId)
                .format("auto")
                .quality("auto")
                .resize(scale().width(1000)); // Full-size optimized image

              console.log(cldFullImg);

              return (
                <AdvancedImage
                  key={index}
                  cldImg={cldThumb}
                  onClick={() => setImage(cldFullImg)}
                  className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer rounded-md"
                  alt={`Product ${index}`}
                />
              );
            })}
          </div>
          <div className="w-full sm:w-[80%]">
            <AdvancedImage
              cldImg={image}
              alt="Product"
              className="w-full h-auto"
              plugins={[lazyload()]}
            />
          </div>
        </div>

        {/* Product info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2 font-muktaVaani">
            {productData.name}
          </h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="Star" className="w-3.5" />
            <img src={assets.star_icon} alt="Star" className="w-3.5" />
            <img src={assets.star_icon} alt="Star" className="w-3.5" />
            <img src={assets.star_icon} alt="Star" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="Star" className="w-3.5" />
            <p className="pl-2 font-imprima">(122)</p>
          </div>
          <p className="mt-5 text-2xl font-medium font-yantramanav">
            Ksh.
            <span className="text-4xl font-bold font-muktaVaani">
              {productData.price -
                (productData.discount ? productData.discount : 0)}
            </span>
            {productData.discount > 0 && (
              <span className="text-1xl font-semibold font-muktaVaani line-through ml-2 px-2 rounded-md text-black bg-blue-300">
                Ksh. {productData.price}
              </span>
            )}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5 font-imprima">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p className="font-yantramanav text-lg font-semibold mb-2">
              Select Size
            </p>
            <div className="flex gap-2">
              {productData.sizes?.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`font-imprima py-1 px-3 rounded-lg transition-all duration-300 ease-in-out 
          ${
            item === size
              ? "bg-orange-500 text-white border-orange-500"
              : "bg-gray-100 hover:bg-gray-200 border-gray-300 hover:border-orange-400"
          } 
          border focus:outline-none focus:ring-2 focus:ring-orange-300`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            className="bg-black font-muktaVaani text-white px-8 py-3 text-sm active:bg-gray-700"
            onClick={() => handleAddToCart(productData._id, size)}
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p className="font-muktaVaani">100% Original Product</p>
            <p className="font-muktaVaani">
              Cash on delivery is available for this product.
            </p>
            <p className="font-muktaVaani">
              Easy return and exchange policy within 7 days.
            </p>
          </div>
        </div>
      </div>

      {/* Description and review section */}
      <div className="mt-20">
        <div className="flex">
          <b
            className={`border px-5 py-3 text-sm font-muktaVaani cursor-pointer ${
              productInfo === "Description" ? "bg-gray-200 font-bold" : ""
            }`}
            onClick={() => setProductInfo("Description")}
          >
            Description
          </b>
          <p
            className={`border px-5 py-3 text-sm font-muktaVaani cursor-pointer ${
              productInfo === "Reviews" ? "bg-gray-200 font-bold" : ""
            }`}
            onClick={() => setProductInfo("Reviews")}
          >
            Reviews
          </p>
        </div>
        {productInfo === "Reviews" ? (
          <div className="flex justify-center border w-full px-2">
            <InfoMessage
              className="my-5"
              title={"Nothing Here"}
              message={"No reviews of this product have been made yet!"}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-600">
            <p className="font-imprima">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              euismod lorem arcu, condimentum interdum ante tristique rhoncus.
              Nam nec aliquam velit.
            </p>
            <p className="font-imprima">
              Nulla eu accumsan sem. Donec vitae ornare enim. Curabitur
              porttitor diam quis dui consequat consequat. Fusce convallis sed
              leo posuere facilisis. Integer non laoreet ex, eget consectetur
              quam. Aenean tempus maximus magna non molestie. Pellentesque
              semper vitae erat ac dignissim. Vivamus vitae dui vitae dui
              lobortis ultrices dignissim et sem.
            </p>
          </div>
        )}
      </div>

      {/* Related products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />

      {openModal && (
        <Modal
          title={"Please Login"}
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          // onSubmitHandler={onSubmitHandler}
        >
          <Login />
        </Modal>
      )}
    </div>
  );
}
