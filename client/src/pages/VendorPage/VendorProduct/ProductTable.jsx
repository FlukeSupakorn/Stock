import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  filteredProductsState,
  selectedProductIdsState,
  productModalState,
  productListState,
  selectedImageState,
} from '../../../recoil/productControlPanel.js';
import { updateProduct } from '../../../API/vendorProducts';

function ProductTable() {
  const filteredProducts = useRecoilValue(filteredProductsState);
  const [selectedProducts, setSelectedProducts] = useRecoilState(selectedProductIdsState);
  const [products, setProducts] = useRecoilState(productListState);
  const [modalState, setModalState] = useRecoilState(productModalState);
  const [selectedImage, setSelectedImage] = useRecoilState(selectedImageState);

  const toggleProductSelection = (productId) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.includes(productId)) {
        return prevSelected.filter(id => id !== productId);
      } else {
        return [...prevSelected, productId];
      }
    });
  };

  const toggleProductPublishing = async (productId) => {
    const updatedProducts = products.map(product => {
      if (product.ProductID === productId) {
        const updatedProduct = { ...product, Published: !product.Published };
        updateProduct(updatedProduct).catch(error => console.error('Failed to update product:', error));
        return updatedProduct;
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const openEditModal = (productId, productName, productPrice, productCategory, productCount, productPublished, productImage, productCategoryId) => {
    setModalState({
      isOpen: true,
      mode: 'edit',
      product: {
        ProductID: productId,
        ProductName: productName,
        Price: productPrice,
        ProductCategoryName: productCategory,
        QuantityAvailable: productCount,
        Published: productPublished,
        image: productImage,
        ProductCategoryID: productCategoryId,
      },
    });
  };

  const openImageModal = (product) => {
    setSelectedImage({
      productId: product.ProductID,
      images: product.ProductImages,
    });
  };

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-2">Product List</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2"></th>
            <th className="border px-4 py-2">Image</th>
            <th className="border px-4 py-2">Product Name</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Count</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Published</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(product => (
            <tr key={product.ProductID} className="hover:bg-gray-100">
              <td className="border px-4 py-2">
                <input
                  type="checkbox"
                  checked={selectedProducts.includes(product.ProductID)}
                  onChange={() => toggleProductSelection(product.ProductID)}
                />
              </td>

              <td className="border px-4 py-2">
                <img
                  src={product.ProductImages && product.ProductImages.length > 0 ? product.ProductImages[0].Productimagecode : ''}
                  alt={product.ProductImages && product.ProductImages.length > 0 ? product.ProductImages[0].ProductimageName : ''}
                  className="w-12 h-12 mr-2"
                  onClick={() => openImageModal(product)}
                />
              </td>

              <td className="border px-4 py-2">{product.ProductName}</td>
              <td className="border px-4 py-2">{product.ProductCategoryName}</td>
              <td className="border px-4 py-2">{product.Price}$</td>
              <td className="border px-4 py-2">{product.QuantityAvailable}</td>
              <td className="border px-4 py-2">
                <span className={`badge ${product.QuantityAvailable > 0 ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500'}`}>
                  {product.QuantityAvailable > 0 ? 'Selling' : 'Sold Out'}
                </span>
              </td>
              <td className="border px-4 py-2">
                <input
                  type="checkbox"
                  className="toggle toggle-success"
                  checked={product.Published}
                  onChange={() => toggleProductPublishing(product.ProductID)}
                />
              </td>
              <td className="border px-4 py-2">
                <button onClick={() => openEditModal(product.ProductID, product.ProductName, product.Price, product.ProductCategoryName, product.QuantityAvailable, product.Published, product.image, product.ProductCategoryID)} className="btn btn-primary">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
