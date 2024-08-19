import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import ProductCard from "../../components/Product/ProductCard";
import FilterSidebar from "../../components/Filter/FilterSidebar";
import Pagination from "../../components/Product/Pagination";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { productsState, selectedFiltersState } from "../../recoil/atom";
import {
  paginatedProductsState,
  filteredProductsSelector,
} from "../../recoil/productsList";
import fetchProductsList from "../../API/fetchProducts";
import { cartStatusState } from "../../recoil/cart";
import Toast from "../../components/Toast";
import CategorySelectSection from "../../components/CategorySelectSection";

function ProductListPage() {
  // const displayedProducts = useRecoilValue(paginatedProductsState);
  const [loading, setLoading] = useState(true);
  const { fetchProducts, fetchProductWithCategories } = fetchProductsList();
  const setProducts = useSetRecoilState(productsState);
  const products = useRecoilValue(productsState);

  const [categories] = useRecoilState(selectedFiltersState);

  const status = useRecoilValue(cartStatusState);
  const setStatus = useSetRecoilState(cartStatusState);

  useEffect(() => {
    setLoading(true);
    fetchProducts().finally(() => setLoading(false));
  }, []);
  console.log(products);
  useEffect(() => {
    const fetchFilteredProducts = async () => {
      setLoading(true);
      const data = await fetchProductWithCategories({ filters: categories });
      setProducts(data);
      setLoading(false);
    };

    fetchFilteredProducts();
  }, [categories, fetchProductWithCategories, setProducts]);

  useEffect(() => {
    if (status.visible) {
      const timer = setTimeout(() => {
        setStatus({ visible: false, message: "", type: "" });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [status, setStatus]);

  return (
    <div>
      {status.visible && (
          <Toast
            message={status.message}
            type={status.type}
            onClose={() => setStatus({ visible: false, message: "", type: "" })}
          />
        )}
      <div className="flex flex-row w-full">
        
        <div>
          <h1 className="text-3xl font-bold p-3 font-noto">ตั้งค่าการค้นหา</h1>
          <FilterSidebar />
        </div>
        <div className="flex flex-col p-3 w-full">
          <CategorySelectSection />
          <div>
            <h2 className="text-3xl font-bold">รายการสินค้า</h2>
          </div>
          {loading ? (
            <div className="flex justify-center h-96">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <div className="grid grid-auto-fit-[15rem] gap-4 my-4">
              {products.map((product, index) => (
                <ProductCard index={index} key={product.ProductID} data={product} />
              ))}
            </div>
          )}
          <Pagination />
        </div>
      </div>
    </div>
  );
}

export default () => (
  <Layout>
    <ProductListPage />
  </Layout>
);
