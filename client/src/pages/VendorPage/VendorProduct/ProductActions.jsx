import React from 'react';
import { useRecoilState } from 'recoil';
import {
  productModalState,
  selectedProductIdsState,
  productListState,
} from '../../../recoil/productControlPanel.js';
import { addProduct, deleteProducts } from '../../../API/vendorProducts';

function ProductActions() {
  const [selectedProducts, setSelectedProducts] = useRecoilState(selectedProductIdsState);
  const [products, setProducts] = useRecoilState(productListState);
  const [modalState, setModalState] = useRecoilState(productModalState);

  const openAddModal = () => {
    setModalState({
      isOpen: true,
      mode: 'add',
      product: {
        ProductName: '',
        Price: 0,
        ProductCategoryName: '',
        QuantityAvailable: 0,
        published: false,
        image: '',
        ProductCategoryID: 0,
      },
    });
  };

  const handleAddProduct = async (product) => {
    try {
      const addedProduct = await addProduct(product);
      setProducts((prevProducts) => [...prevProducts, addedProduct]);
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  const handleDeleteSelectedProducts = async () => {
    try {
      await deleteProducts(selectedProducts);
      const updatedProducts = products.filter(product => !selectedProducts.includes(product.ProductID));
      setProducts(updatedProducts);
      setSelectedProducts([]);
    } catch (error) {
      console.error('Failed to delete products:', error);
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-2">Add Product</h2>
      <button onClick={openAddModal} className="btn btn-primary">Add Product</button>
      <div className="flex items-center mb-2">
        <button onClick={handleDeleteSelectedProducts} className="btn btn-danger mr-2">Delete Selected</button>
      </div>
    </div>
  );
}

export default ProductActions;
