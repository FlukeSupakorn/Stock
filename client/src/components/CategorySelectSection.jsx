import React, { useState, useEffect, useRef } from "react";
import genericimageplaceholder from "../assets/svg/generic-image-placeholder.svg";

const categories = [
  { name: "Phones", icon: genericimageplaceholder },
  { name: "Computers", icon: genericimageplaceholder },
  { name: "SmartWatch", icon: genericimageplaceholder },
  { name: "Camera", icon: genericimageplaceholder },
  { name: "HeadPhones", icon: genericimageplaceholder },
  { name: "Gaming", icon: genericimageplaceholder },
  { name: "Gaming2", icon: genericimageplaceholder },
  { name: "Gaming3", icon: genericimageplaceholder },
  { name: "Gaming4", icon: genericimageplaceholder },
  { name: "Gaming5", icon: genericimageplaceholder },
  { name: "Gaming6", icon: genericimageplaceholder },
  { name: "Gaming7", icon: genericimageplaceholder },
  { name: "Gaming8", icon: genericimageplaceholder },
  { name: "Gaming9", icon: genericimageplaceholder },
];

const CategoryButton = ({ category, isSelected, onClick }) => (
  <div>
    <button
    className={`flex flex-col w-[140px] items-center justify-center p-4 border rounded-lg  ${
      isSelected ? "bg-accent text-white" : "bg-white text-black"
    }`}
    onClick={onClick}
  >
    <img
      aria-hidden="true"
      alt={category.name}
      src={category.icon}
      className="mb-2"
    />
    <span>{category.name}</span>
  </button>
  </div>
  
);

const ArrowButton = ({ direction, onClick, disabled }) => (
  <button
    className={`p-2 btn btn-circle btn-outline ${
      direction === "left" ? "left-0 mr-4" : "right-0 ml-4"
    }`}
    onClick={onClick}
    disabled={disabled}
  >
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
);

function CategorySelectSection() {
  const [selectedCategory, setSelectedCategory] = useState("Camera");
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);

  const handleScroll = (direction) => {
    const container = containerRef.current;
    const scrollAmount = 200;
    if (direction === "left") {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
    setScrollPosition(container.scrollLeft);
  };

  return (
    <div className="w-full p-4">
      <div className="flex items-center mb-4">
        <div className="bg-blue-500 h-8 w-2 mr-2"></div>
        <h2 className="text-blue-500 text-xl font-bold">Categories</h2>
      </div>
      <h3 className="text-2xl font-bold mb-4">Browse By Category</h3>

      <div className="relative flex items-center">
        <ArrowButton
          direction="left"
          onClick={() => handleScroll("left")}
          disabled={scrollPosition <= 300}
        />
        <div
          id="category-container"
          ref={containerRef}
          className="flex w-[800px] space-x-4 overflow-hidden scrollbar-hide scroll-smooth"
          
        >
          {categories.map((category) => (
            <CategoryButton
              key={category.name}
              category={category}
              isSelected={selectedCategory === category.name}
              onClick={() => setSelectedCategory(category.name)}
            />
          ))}
        </div>
        <ArrowButton direction="right" onClick={() => handleScroll("right")} disabled={scrollPosition >= 600} />
      </div>
    </div>
  );
}

export default CategorySelectSection;
