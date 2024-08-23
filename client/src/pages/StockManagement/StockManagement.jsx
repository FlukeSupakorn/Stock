import React from "react";
import Layout from "../../components/Layout/Layout";

function StockManagement() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6 bg-gradient-to-r from-purple-400 to-pink-500 text-white">
      <h1 className="text-5xl font-bold mb-8 animate-pulse drop-shadow-lg">
        Stock Management
      </h1>
      <div className="flex flex-col space-y-4">
        <a
          className="btn text-2xl text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 shadow-lg transform transition-transform duration-300 hover:scale-105"
          href="/order"
        >
          Dairy Order
        </a>
        <a
          className="btn text-2xl text-white bg-gradient-to-r from-black to-gray-700 hover:from-gray-800 hover:to-black shadow-lg transform transition-transform duration-300 hover:scale-105"
        >
          Stock Management
        </a>
      </div>
    </div>
  );
}

export default () => (
  <Layout>
    <StockManagement />
  </Layout>
);
