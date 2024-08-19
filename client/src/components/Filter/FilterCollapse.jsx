import React, { useState, useEffect } from "react";
import DualSlider from "./DualSlider";
import { BsStarFill, BsStar } from "react-icons/bs";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedFiltersState, categoriesState } from "../../recoil/atom";
import fetchProductsList from "../../API/fetchProducts";

function FilterCollapse({ title, type }) {
  const [selectedValues, setSelectedValues] = useState([]);
  const [filters, setFilters] = useRecoilState(selectedFiltersState);
  const [rating] = useState([5, 4, 3, 2, 1]);
  const [loading, setLoading] = useState(true);
  const categories = useRecoilValue(categoriesState);
  const { fetchCategories } = fetchProductsList();

  // console.log(filters);

  useEffect(() => {
    setLoading(true);
    fetchCategories().finally(() => setLoading(false));
  }, []);

  const handleCheckboxChange = (value) => {
    const updatedValues = selectedValues.includes(value)
      ? selectedValues.filter((item) => item !== value)
      : [...selectedValues, value];

    setSelectedValues(updatedValues);
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: updatedValues,
    }));
  };
  const handleRatingChange = (newRating) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      rating: [newRating], // Since it's a radio button, only one rating can be selected at a time
    }));

    // Update the local state to reflect the selected value for the radio buttons
    setSelectedValues([newRating]);
  };

  const clearRatings = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      rating: [],
    }));
    setSelectedValues([]);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) =>
      index < rating ? (
        <BsStarFill key={index} className="text-warning" />
      ) : (
        <BsStar key={index} className="text-gray-400" />
      )
    );
  };

  const content = () => {
    switch (type) {
      case "category":
        return (
          <div className="flex flex-wrap flex-col">
            {categories.map((item, index) => (
              <div key={index} className="flex cursor-pointer mr-2 mb-2">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm checked:bg-primary"
                  checked={selectedValues.includes(item.ProductCategoryName)}
                  onChange={() =>
                    handleCheckboxChange(item.ProductCategoryName)
                  }
                />
                <div className="ml-2">{item.ProductCategoryName}</div>
              </div>
            ))}
          </div>
        );
      case "review":
        return (
          <div className="flex flex-wrap flex-col">
            {rating.map((item) => (
              <div key={item} className="form-control cursor-pointer mr-2 mb-2">
                <label className="flex items-center cursor-pointer ">
                  <input
                    type="radio"
                    name="radio-10"
                    className="radio"
                    checked={selectedValues.includes(item)}
                    onChange={() => handleRatingChange(item)}
                  />
                  <div className="flex flex-row ml-2">{renderStars(item)}</div>
                </label>
              </div>
            ))}
            <button
              className="btn btn-outline btn-accent btn-sm"
              onClick={clearRatings}
            >
              Clear
            </button>
          </div>
        );
      case "price":
        return <DualSlider />;
      default:
        return null;
    }
  };
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="collapse collapse-arrow">
          <input type="checkbox" />
          <div className="collapse-title font-bold font-noto">{title}</div>
          <div className="collapse-content">{content()}</div>
        </div>
      )}
    </div>
  );
}

export default FilterCollapse;
