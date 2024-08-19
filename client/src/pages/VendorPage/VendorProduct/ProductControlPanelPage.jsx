import React, { useEffect } from 'react';
import Layout from '../../../components/Layout/Layout.jsx';
import ProductFilters from './ProductFilters.jsx';
import ProductActions from './ProductActions.jsx';
import ProductTable from './ProductTable.jsx';
import AddEditModal from './AddEditModal.jsx';
import ImageModal from './ImageModal.jsx';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  productModalState,
  selectedImageState,
  productListState,
  productCategoriesState,
} from '../../../recoil/productControlPanel.js';
import {
  fetchProducts,
  fetchProductCategories,
  addProduct,
  updateProduct,
  addProductImage,
  removeProductImage,
} from '../../../API/vendorProducts';

function ProductControlPanelPage() {
  const [modalState, setModalState] = useRecoilState(productModalState);
  const [selectedImage, setSelectedImage] = useRecoilState(selectedImageState);
  const [products, setProducts] = useRecoilState(productListState);
  const [productCategories, setProductCategories] = useRecoilState(productCategoriesState);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(error => console.error('Error fetching products:', error));
  }, [setProducts]);

  useEffect(() => {
    fetchProductCategories()
      .then(setProductCategories)
      .catch(error => console.error('Error fetching categories:', error));
  }, [setProductCategories]);

  const handleAddProduct = async () => {
    const { product } = modalState;
    try {
      const addedProduct = await addProduct(product);
      setProducts((prevProducts) => [...prevProducts, addedProduct]);
      closeModal();
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  const handleEditProduct = async () => {
    const { product } = modalState;
    try {
      await updateProduct(product);
      setProducts((prevProducts) =>
        prevProducts.map(p => (p.ProductID === product.ProductID ? product : p))
      );
      closeModal();
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleAddImage = async (productId, imageUrl) => {
    try {
      const image = await addProductImage(productId, imageUrl);
      setProducts((prevProducts) =>
        prevProducts.map(p => {
          if (p.ProductID === productId) {
            return {
              ...p,
              ProductImages: [...p.ProductImages, image],
            };
          }
          return p;
        })
      );
    } catch (error) {
      console.error('Failed to add image:', error);
    }
  };

  const handleRemoveImage = async (imageId) => {
    try {
      await removeProductImage(imageId);
      setProducts((prevProducts) =>
        prevProducts.map(p => {
          if (p.ProductID === selectedImage.productId) {
            return {
              ...p,
              ProductImages: p.ProductImages.filter(img => img.ProductImageID !== imageId),
            };
          }
          return p;
        })
      );
    } catch (error) {
      console.error('Failed to remove image:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product Control Panel</h1>
      <ProductActions />
      <ProductFilters />
      <ProductTable />
      {modalState.isOpen && (
        <AddEditModal
          modalMode={modalState.mode}
          product={modalState.product}
          setProductName={(name) => setModalState((prev) => ({ ...prev, product: { ...prev.product, ProductName: name } }))}
          setProductPrice={(price) => setModalState((prev) => ({ ...prev, product: { ...prev.product, Price: parseFloat(price) } }))}
          setProductCategoryId={(categoryId) => setModalState((prev) => ({ ...prev, product: { ...prev.product, ProductCategoryID: parseInt(categoryId) } }))}
          productCategories={productCategories}
          setProductCount={(count) => setModalState((prev) => ({ ...prev, product: { ...prev.product, QuantityAvailable: parseInt(count) } }))}
          setProductPublished={(published) => setModalState((prev) => ({ ...prev, product: { ...prev.product, published } }))}
          setProductCategory={(category) => setModalState((prev) => ({ ...prev, product: { ...prev.product, ProductCategoryName: category } }))}
          handleSubmit={modalState.mode === 'add' ? handleAddProduct : handleEditProduct}
          closeModal={closeModal}
        />
      )}
      {selectedImage && (
        <ImageModal
          images={selectedImage.images}
          productId={selectedImage.productId}
          onAddImage={handleAddImage}
          onRemoveImage={handleRemoveImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}

export default () => (
  <Layout>
    <ProductControlPanelPage />
  </Layout>
);
