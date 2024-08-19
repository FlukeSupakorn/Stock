import React from "react";
import Comment from "./Comment";
import { currentProductDetailState } from "../../recoil/productDetail";
import { useRecoilValue } from "recoil";
import UserProfilePlaceholder from "../../assets/svg/user-profile-placeholder.svg";

const ReviewBar = ({ star, reviewAmount }) => {
  return (
    <div className="flex flex-row content-center items-center">
      <p className="text-xl">{star}</p>
      <progress
        className="progress progress-accent w-56 ml-4 h-4"
        value={reviewAmount}
        max="100"
      />
    </div>
  );
};

const reviewData = [
  {
    star: 5,
    reviewAmount: 100,
  },
  {
    star: 4,
    reviewAmount: 50,
  },
  {
    star: 3,
    reviewAmount: 20,
  },
  {
    star: 2,
    reviewAmount: 10,
  },
  {
    star: 1,
    reviewAmount: 5,
  },
];

const handleImage = (imgSource) => {
  if (imgSource) {
    return imgSource;
  } else {
    return UserProfilePlaceholder;
  }
};

function Review() {
  const productDetail = useRecoilValue(currentProductDetailState);
  const reviews = productDetail.Reviews;
  return (
    <div className="p-4">
      {reviews.length > 0 ? (
        <div className="grid grid-cols-3">
          <div className="col-span-2">
            {reviews.map((reviewItem) => (
              <Comment
                key={
                  reviewItem.id || Math.random().toString(36).substring(2, 15)
                } // Unique key
                img={handleImage(reviewItem.Client.Image)}
                name={
                  reviewItem.Client.FirstName +
                    " " +
                    reviewItem.Client.LastName || "Anonymous"
                }
                date={reviewItem.Date || "no date"}
                star={reviewItem.Rating}
                comment={reviewItem.Comment}
              />
            ))}
          </div>
          <div className="flex flex-col">
            <p>Avg star</p>
            <div className="divider"></div>
            {reviewData.map((data) => (
              <ReviewBar star={data.star} reviewAmount={data.reviewAmount} />
            ))}
          </div>
        </div>
      ) : (
        <p>No reviews</p>
      )}
    </div>
  );
}

export default Review;
