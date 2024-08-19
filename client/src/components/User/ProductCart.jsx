import React from "react";
import ProductQuantityCounter from "../Product/ProductQuantityCounter";


function ProductCart({avatar, name, price, quantity, onRemove, onQuantityChange }) {
  const total = price * quantity;
  const handleQuantityChange = (newQuantity) => {
    onQuantityChange(newQuantity);
  };


  return (
    <tr>
      <td>
        <div className="flex grow-0 items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={avatar} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div className="w-52 md:w-72 flex-none">
            <div className="font-bold line-clamp-2 text-ellipsis ">{name}</div>
          </div>
        </div>
      </td>
      <td>${price}</td>
      <td>
        <ProductQuantityCounter
          initialCount={quantity}
          minCount={1}
          maxCount={100}
          onQuantityChange={handleQuantityChange}
        />
      </td>
      <td>${total.toFixed(2)}</td>
      <th>
        <button className="btn btn-circle hover:btn-error" onClick={onRemove}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </th>
    </tr>
  );
}

export default ProductCart;
