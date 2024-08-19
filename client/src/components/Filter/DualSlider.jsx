import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import {  useRecoilState } from "recoil";
import { selectedFiltersState } from "../../recoil/atom";

function DualSlider({ maxPrice = 100000 }) {
  const [selectedFilters, setSelectedFilters] = useRecoilState(selectedFiltersState);
  const { priceRange } = selectedFilters; // Destructure priceRange from selectedFilters

  const handleChange = (newValue) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      priceRange: [newValue[0], newValue[1]],
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let newMin = priceRange[0], newMax = priceRange[1];

    if (name === "min" && parseInt(value) <= newMax - 1) {
      newMin = Math.max(0, parseInt(value));
    } else if (name === "max" && parseInt(value) >= newMin + 1) {
      newMax = Math.min(maxPrice, parseInt(value));
    }

    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      priceRange: [newMin, newMax],
    }));
  };
  const handleResetPriceRange = () => {
    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      priceRange: [0, maxPrice]
    }));
  };

  const formatValue = (value) => (value < 10 ? `0${value}` : value.toString());
  return (
    <div>
      <div className="form-control col-span-2">
        <label className="label justify-center font-semibold">ช่วงราคา</label>
        <Slider
          range
          step={1}
          allowCross={true}
          min={0}
          max={maxPrice}
          value={[priceRange[0], priceRange[1]]}
          onChange={handleChange}
          styles={{
            track: {
              backgroundColor: "#2F84FF",
              height: "10px",
            },
            handle: {
              backgroundColor: "white",
              opacity: 1,
              border: "2px solid #2F84FF",
              height: "20px",
              width: "20px",
            },
            rail: {
              height: "10px",
            },
          }}
        />
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="form-control">
            <label className="label">ราคาต่ำสุด</label>
            <input
              type="number"
              name="min"
              value={priceRange[0]}
              onChange={handleInputChange}
              className="input input-bordered"
              min="0"
              max={priceRange[1] - 1}
            />
          </div>

          <div className="form-control">
            <label className="label">ราคาสูงสุด</label>
            <input
              type="number"
              name="max"
              value={priceRange[1]}
            onChange={handleInputChange}
            className="input input-bordered"
            min={priceRange[0] + 1}
            max={maxPrice}
            />
          </div>
        </div>
        <button
              className="btn btn-outline btn-accent btn-sm mt-2"
              onClick={handleResetPriceRange}
            >
              Clear
            </button>
      </div>
    </div>
  );
}

export default DualSlider;