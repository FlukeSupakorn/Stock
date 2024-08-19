import React from 'react';

const AddEditModal = ({
  modalMode,
  product,
  setProductName,
  setProductPrice,
  setProductCategoryId,
  productCategories = [],
  setProductCount,
  setProductPublished,
  setProductCategory,
  handleSubmit,
  closeModal,
}) => {
  const { ProductName, Price, ProductCategoryID, QuantityAvailable, published } = product;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-2">{modalMode === 'add' ? 'Add Product' : 'Edit Product'}</h2>
        <input type="text" value={ProductName} onChange={(e) => setProductName(e.target.value)} className="input mb-2" placeholder="Product Name" />
        <input type="number" value={Price} onChange={(e) => setProductPrice(parseFloat(e.target.value))} className="input mb-2" placeholder="Product Price" />
        <select
          value={ProductCategoryID}
          onChange={(e) => {
            setProductCategoryId(parseInt(e.target.value));
            const selectedCategory = productCategories.find(category => category.ProductCategoryID === parseInt(e.target.value));
            setProductCategory(selectedCategory ? selectedCategory.ProductCategoryName : '');
          }}
          className="input mb-2"
        >
          <option value={0}>Select Category</option>
          {productCategories.map(category => (
            <option key={category.ProductCategoryID} value={category.ProductCategoryID}>
              {category.ProductCategoryName}
            </option>
          ))}
        </select>
        <input type="number" value={QuantityAvailable} onChange={(e) => setProductCount(parseInt(e.target.value))} className="input mb-2" placeholder="Product Count" />
        <div className="flex items-center mb-4">
          <label className="mr-2">Published:</label>
          <input
            type="checkbox"
            className="toggle toggle-success"
            checked={published}
            onChange={() => setProductPublished(!published)}
          />
        </div>
        <div className="flex justify-end">
          <button onClick={closeModal} className="btn btn-secondary mr-2">Cancel</button>
          <button onClick={handleSubmit} className="btn btn-primary">{modalMode === 'add' ? 'Add' : 'Save'}</button>
        </div>
      </div>
    </div>
  );
};

export default AddEditModal;
