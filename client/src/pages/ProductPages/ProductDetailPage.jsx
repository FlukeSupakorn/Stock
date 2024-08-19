import React from "react";
import Layout from "../../components/Layout/Layout";
import ProductDetailLayout from "../../components/Product/ProductDetailLayout";
import { useParams } from "react-router-dom";

function ProductDetailPage() {
  const { productId } = useParams();
  return (
    <div>
      <ProductDetailLayout productId={productId} />
    </div>
  );
}

export default () => (
  <Layout>
    <ProductDetailPage />
  </Layout>
);
