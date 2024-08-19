import React, { useState, useEffect } from "react";
import AboutSeller from "./AboutSeller";
import Review from "./Review";
import {
  BsBagFill,
  BsStarFill,
  BsStarHalf,
  BsStar,
  BsHeart,
} from "react-icons/bs";
import ProductQuantityCounter from "./ProductQuantityCounter";
import ProductImage from "./ProductImage";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { currentProductDetailState } from "../../recoil/productDetail";
import axios from "axios";
import useCartActions from "../../API/userCartActions";
import { cartStatusState } from "../../recoil/cart";
import Toast from "../../components/Toast";

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0));

  return (
    <>
      {[...Array(fullStars)].map((_, index) => (
        <BsStarFill key={index} className="text-warning" />
      ))}
      {hasHalfStar && <BsStarHalf key="half" className="text-warning" />}
      {[...Array(emptyStars)].map((_, index) => (
        <BsStar
          key={index + fullStars + (hasHalfStar ? 1 : 0)}
          className="text-gray-400"
        />
      ))}
    </>
  );
};

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function ProductDetailLayout({ productId }) {
  const userId = localStorage.getItem("userId");
  const [activeButton, setActiveButton] = useState("Description");
  const [productDetail, setProductDetail] = useRecoilState(
    currentProductDetailState
  );
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCartActions(userId);
  const status = useRecoilValue(cartStatusState);
  const setStatus = useSetRecoilState(cartStatusState);

  const handleClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const debouncedAddToCart = debounce((value) => {
    addToCart(productDetail.ProductID, value);
  }, 300);

  const handleAddToCart = (value) => {
    debouncedAddToCart(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!productId) return;
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3333/products/${productId}`
        );
        setProductDetail(response.data.data[0]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId, setProductDetail, setLoading]);

  useEffect(() => {
    if (status.visible) {
      const timer = setTimeout(() => {
        setStatus({ visible: false, message: "", type: "" });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [status, setStatus]);

  console.log(status.type);
  // const thumbnailImages =
  //   productDetail?.ProductImages.map((image) => (
  //     <img
  //       key={image.ProductimageID}
  //       src={image.Productimagecode}
  //       alt={image.ProductimageName}
  //     />
  //   )) || [];

  const imageData = [
    "https://picsum.photos/id/237/200/300",
    "https://picsum.photos/id/1025/200/300",
    "https://picsum.photos/id/847/200/300",
    "https://picsum.photos/id/1074/200/300",
  ];
  //WARN : properties name
  return (
    <div className="flex flex-col">
      <Toast
        message={status.message}
        type={status.type}
        onClose={() => setStatus({ visible: false, message: "", type: "" })}
      />
      {loading ? (
        <div className="flex justify-center h-96">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center mx-auto">
          <ProductImage thumbnailImages={imageData} />
          <div className="grid grid-rows-6 max-w-[450px] max-h-[450px] gap-2 px-4">
            <div className="flex flex-col w-full py-2">
              <h1 className="text-3xl max-w-[418px]">
                {productDetail.ProductName}
              </h1>
            </div>
            <div className="flex flex-col w-full row-span-2 space-y-4 mt-4">
              <div className="flex w-full items-center">
                {renderStars(productDetail.RatingAvg)}
                <div className="ml-2">{productDetail.RatingAvg}</div>
                <div className="divider divider-horizontal mx-2"></div>
                <div>
                  {productDetail.QuantityAvailable > 0
                    ? "In Stock"
                    : "Out of Stock"}
                </div>
              </div>
              <div className="flex w-full items-center h-full">
                <h1 className="text-4xl">${productDetail.Price}</h1>
              </div>
            </div>

            <div className="flex flex-col w-full mb-2 row-span-3 ">
              <div className="flex flex-col h-full justify-center space-y-4">
                <ProductQuantityCounter
                  initialCount={1}
                  minCount={1}
                  maxCount={100}
                  onQuantityChange={(handleQuantityChange) => {
                    setQuantity(handleQuantityChange);
                  }}
                />
                <div className="flex">
                  <button
                    className="btn btn-accent btn-wide mr-4"
                    onClick={() => handleAddToCart(quantity)}
                  >
                    <BsBagFill /> Add to cart
                  </button>
                  <button className="btn">
                    <BsHeart />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2 w-full gap-4 justify-center mx-auto mt-4 bg-gray-200 ">
            <div className="flex flex-row items-center p-4">
              <button
                className={`m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                  activeButton === "component1" && "bg-opacity-50"
                }`}
                onClick={() => handleClick("Description")}
              >
                Description
              </button>
              <button
                className={`m-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ${
                  activeButton === "component2" && "bg-opacity-50"
                }`}
                onClick={() => handleClick("Review")}
              >
                Review
              </button>
              <button
                className={`m-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${
                  activeButton === "component3" && "bg-opacity-50"
                }`}
                onClick={() => handleClick("AboutSeller")}
              >
                About Seller
              </button>
            </div>
            {activeButton === "Description" && (
              <div className="p-4 bg-gray-200 rounded">
                {productDetail.ProductDescription}
              </div>
            )}
            {activeButton === "Review" && <Review />}
            {activeButton === "AboutSeller" && <AboutSeller />}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetailLayout;
