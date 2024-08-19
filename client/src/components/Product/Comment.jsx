import React from "react";

function Comment({ img, name, date, star, comment }) {
  return (
    <div className="flex flex-row m-4">
      <div className="avatar items-start">
        <div className="w- h-12 rounded-full">
          <img src={img} />
        </div>
      </div>
      <div className="flex flex-col ml-4 text-wrap">
        <div className="flex flex-row">
          <div className="font-bold text-xl">{name}</div>
          <div className="ml-4 self-end text-gray-500">{date}</div>
        </div>
        <div className="flex flex-row">{star}</div>
        <div className="flex flex-wrap max-w-[450px]">{comment}</div>
      </div>
    </div>
  );
}

export default Comment;
