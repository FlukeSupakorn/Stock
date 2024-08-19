import React from "react";
import { currentProductDetailState } from "../../recoil/productDetail";
import { useRecoilValue } from "recoil";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
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

function AboutSeller() {
  const productDetail = useRecoilValue(currentProductDetailState);
  const shop = productDetail.Shop[0];
  return (
    // TODO : Get data from database Seller
    <div className="p-4">
      {shop ? (<div className="card card-side bg-base-100 shadow-xl">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
            alt="Movie"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-5xl">{shop.ShopName}</h2>
          <div className="flex flex-row">{renderStars(shop.RatingAvg)}</div>
          <p>{shop.ShopDescription}</p>
          {/* <div className="mt-2">
              <div className="badge badge-outline mr-2">Fashion</div>
              <div className="badge badge-outline">Products</div>
            </div> */}
        </div>
      </div>) : (<div>Null on database</div>) }
    </div>
  );
}

export default AboutSeller;
