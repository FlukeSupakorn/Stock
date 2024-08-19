import React, { useState } from 'react';

const ProductOptionButton = ({ options, onOptionSelected, optionsName }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleClick = (option) => {
    setSelectedOption(option);
    onOptionSelected(option); 
  };

  return (
    <div className="flex flex-wrap gap-2 items-center mb-2">
      <div className="text-lg font-bold">{optionsName} : </div>
      {options.map((option) => (
        <button
          key={option.value}
          className={`
            ${selectedOption === option.value ? 'btn btn-accent' : 'btn'}
            px-4 py-2 rounded-md
          `}
          onClick={() => handleClick(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default ProductOptionButton;
