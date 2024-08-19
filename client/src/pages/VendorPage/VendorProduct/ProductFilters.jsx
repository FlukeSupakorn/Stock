import React from 'react';
import { useRecoilState } from 'recoil';
import {
  productSearchTermState,
  selectedCategoryState,
  productSortByState,
  productCategoriesState,
} from '../../../recoil/productControlPanel.js';

function ProductFilters() {
  const [searchTerm, setSearchTerm] = useRecoilState(productSearchTermState);
  const [selectedCategory, setSelectedCategory] = useRecoilState(selectedCategoryState);
  const [sortBy, setSortBy] = useRecoilState(productSortByState);
  const [productCategories] = useRecoilState(productCategoriesState);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSortBy('default');
  };

  return (
    <div className="mb-8">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search products..."
        className="input mb-2"
      />

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="input mb-2"
      >
        <option value="All">All</option>
        {productCategories.map(category => (
          <option key={category.ProductCategoryID} value={category.ProductCategoryName}>
            {category.ProductCategoryName}
          </option>
        ))}
      </select>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="input mr-2"
      >
        <option value="default">Sort By</option>
        <option value="ascending">Price: Low to High</option>
        <option value="descending">Price: High to Low</option>
      </select>
      <button onClick={resetFilters} className="btn btn-secondary">Reset Filters</button>
    </div>
  );
}

export default ProductFilters;
