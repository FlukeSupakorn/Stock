import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import Modal from "./Modal"; // Import the Modal component

const StockManagement = () => {
  const [latestStock, setLatestStock] = useState(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false); // State for modal visibility

  useEffect(() => {
    axios.get('http://localhost:3333/admin/stock/see')
      .then(response => {
        const stockData = response.data;
        setLatestStock(stockData[stockData.length - 1]); // Assuming the latest stock is the last in the array
      })
      .catch(error => console.error("Error fetching stock data:", error));
  }, []);

  if (!latestStock) {
    return <div className="text-gray-600">Loading...</div>;
  }

  // Extract items
  const items = Object.keys(latestStock).filter(key => !key.startsWith('หน่วย_') && key !== 'date' && key !== 'manageid' && key !== 'type' && key !== 'note');

  const handleEditItem = () => {
    setModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setModalOpen(false); // Close the modal
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8 px-6">
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
              to="/"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              onClick={() => setDropdownOpen(false)}
            >
              Dairy Order
            </Link>
          </div>
        )}
      </div>

      <h1 className="text-3xl font-semibold mb-8 text-gray-800">Stock Management</h1>

      {/* Container for all items */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-800 text-2xl font-semibold">Current Stock</span>
          <div className="flex space-x-4">
            <button
              onClick={handleEditItem}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              Edit  
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">Save</button>
          </div>
        </div>

        <hr className="my-4 border-gray-200" />

        {items.length === 0 ? (
          <p className="text-gray-600">No items available</p>
        ) : (
          items.map((item, index) => (
            <div key={item} className={`flex items-center justify-between py-3 ${index === items.length - 1 ? '' : 'border-b border-gray-200'}`}>
              <span className="text-gray-800 font-semibold w-1/4">{item}</span>
              <div className="flex items-center space-x-1 w-1/2 justify-end">
                <button className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">-</button>
                <input
                  type="text"
                  value={latestStock[item]}
                  onChange={(e) => {
                    // Update the stock value in the state
                    setLatestStock(prevState => ({
                      ...prevState,
                      [item]: e.target.value
                    }));
                  }}
                  className="text-gray-800 text-center w-24 border border-gray-300 rounded-md py-1 px-2"
                />
                <button className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">+</button>
              </div>
              <span className="text-gray-600 w-12 text-right">{latestStock[`หน่วย_${index + 1}`] || 'Unknown'}</span>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        items={items} // Pass only item names
      />
    </div>
  );
};

export default () => (
  <Layout>
    <StockManagement />
  </Layout>
);
