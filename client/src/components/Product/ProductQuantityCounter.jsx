import React, { useState } from 'react';

const ProductQuantityCounter = ({ initialCount, minCount, maxCount, onQuantityChange }) => {
  const [count, setCount] = useState(initialCount);

  const handleDecrement = () => {
    if (count > minCount) {
      setCount(count - 1);
      onQuantityChange && onQuantityChange(count - 1);
    }
  };

  const handleIncrement = () => {
    if (count < maxCount) {
      setCount(count + 1);
      onQuantityChange && onQuantityChange(count + 1);
    }
  };

  const handleChange = (event) => {
    const newCount = parseInt(event.target.value, 10);
    if (!isNaN(newCount) && newCount >= minCount && newCount <= maxCount) {
      setCount(newCount);
      onQuantityChange && onQuantityChange(newCount); 
    }
  };

  return (
    <div className="flex">
      <button className="btn no-animation btn-base-300" onClick={handleDecrement}>
        -
      </button>
      <input
        type="text"
        className="input w-16 mx-2 text-center border border-gray-300 rounded-md "
        value={count}
        onChange={handleChange}
      />
      <button className="btn no-animation btn-base-300" onClick={handleIncrement}>
        +
      </button>
    </div>
  );
};

export default ProductQuantityCounter;
