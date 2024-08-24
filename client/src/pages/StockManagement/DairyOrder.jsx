import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import OrderUpload from "./OrderUpload";
import StockDisplay from "./StockDisplay";
import { Link } from "react-router-dom"; // Import Link for navigation

function DairyOrder() {
  const [stock, setStock] = useState([]);
  const [totalNetSales, setTotalNetSales] = useState(0);
  const [totalNetSalesSuanmak, setTotalNetSalesSuanmak] = useState(0);
  const [totalNetSalesPhuttha, setTotalNetSalesPhuttha] = useState(0);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3333/admin/stock/see')
      .then(response => setStock(response.data))
      .catch(error => console.error("Error fetching stock data:", error));
  }, []);

  const updateStock = (newStock, newTotalNetSales, newTotalNetSalesSuanmak, newTotalNetSalesPhuttha) => {
    setStock(newStock);
    setTotalNetSales(newTotalNetSales);
    setTotalNetSalesSuanmak(newTotalNetSalesSuanmak);
    setTotalNetSalesPhuttha(newTotalNetSalesPhuttha);
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen bg-gray-100 p-6 relative">
      {/* Dropdown Button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setDropdownOpen(!isDropdownOpen)}
          className="px-4 py-2 bg-gray-800 text-white rounded-md shadow-md focus:outline-none"
        >
          Menu
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
            <Link
              to="/management"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              onClick={() => setDropdownOpen(false)}
            >
              Stock Management
            </Link>
            <Link
              to="/"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              onClick={() => setDropdownOpen(false)}
            >
              Home
            </Link>
          </div>
        )}
      </div>

      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Dairy Order</h1>
      <OrderUpload updateStock={updateStock} />
      <StockDisplay
        stock={stock}
        totalNetSales={totalNetSales}
        totalNetSalesSuanmak={totalNetSalesSuanmak}
        totalNetSalesPhuttha={totalNetSalesPhuttha}
      />
    </div>
  );
}

export default () => (
  <Layout>
    <DairyOrder />
  </Layout>
);

