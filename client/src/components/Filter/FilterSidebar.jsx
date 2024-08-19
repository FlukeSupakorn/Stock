import React, { useEffect } from "react";
import { useState } from "react";
import FilterCollapse from "./FilterCollapse";
import axios from "axios";

function FilterSidebar() {
  
  return (
    <div>
      <div className="flex flex-col md:w-32 lg:w-72 ">
        <div className="border rounded-lg p-4">
          <FilterCollapse
            title="ประเภทสินค้า"
            type="category"
          />
          <div className="divider mt-0"></div>
          <FilterCollapse
            title="รีวิว"
            type="review"
          />
          <div className="divider mt-0"></div>
          <FilterCollapse
            title="ราคา"
            type="price"
          />
        </div>
      </div>
    </div>
  );
}

export default FilterSidebar;
