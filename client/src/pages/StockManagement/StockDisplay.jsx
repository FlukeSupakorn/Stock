import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { fetchTotalSalesData } from "../../API/fetchStock";

function StockDisplay({ stock }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalNetSales, setTotalNetSales] = useState(0);
  const [totalNetSalesSuanmak, setTotalNetSalesSuanmak] = useState(0);
  const [totalNetSalesPhuttha, setTotalNetSalesPhuttha] = useState(0);

  const rowsPerPage = 10;

  const fetchAndLogLatestTotalNet = async () => {
    try {
      const data = await fetchTotalSalesData();
      if (data.length > 0) {
        const latestEntry = data[data.length - 1];
        setTotalNetSales(latestEntry.totalNet);
        setTotalNetSalesSuanmak(latestEntry.totalNetSuanmak);
        setTotalNetSalesPhuttha(latestEntry.totalNetPhuttha);
        console.log("Latest Entry:", latestEntry.totalNetPhuttha);
        console.log("Latest Entry:", latestEntry.totalNetSuanmak);
        console.log("Latest Entry:", latestEntry.totalNet);
      } else {
        console.log("No data available.");
      }
    } catch (error) {
      console.error("Error fetching total sales data:", error);
    }
  };
  
  fetchAndLogLatestTotalNet();

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(stock);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Current Stock");
    XLSX.writeFile(workbook, "current_stock.xlsx");
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = stock.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(stock.length / rowsPerPage);

  return (
    <>
      <div className="mt-6 w-full max-w-6xl bg-white rounded-lg shadow-md p-4">
        <h2 className="text-2xl font-semibold p-4 border-b border-gray-300">Lastest Date Total Net Sales</h2>
        <div className="flex flex-col">
          <div className="flex mt-2 items-center justify-between mb-2">
            <p className="text-lg ml-10 font-bold text-gray-800" style={{ flex: 1 }}>สวนหมาก:</p>
            <p className="text-lg font-bold text-gray-800" style={{ flexShrink: 0 }}>${totalNetSalesSuanmak.toFixed(2)}</p>
          </div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-lg ml-10 font-bold text-gray-800" style={{ flex: 1 }}>พุทธบูชา 36:</p>
            <p className="text-lg font-bold text-gray-800" style={{ flexShrink: 0 }}>${totalNetSalesPhuttha.toFixed(2)}</p>
          </div>
          <div className="border-t border-gray-300 mt-2 pt-2">
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-gray-800" style={{ flex: 1 }}>Overall:</p>
              <p className="text-lg font-bold text-green-600" style={{ flexShrink: 0 }}>${totalNetSales.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 w-full max-w-6xl bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Current Stock</h2>
          <button
            onClick={handleExport}
            className="btn px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
          >
            Export to XLSX
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-max border-collapse text-sm">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="border p-2">Date</th>
                {currentRows.length > 0 &&
                  Object.keys(currentRows[0]).map((key) => (
                    <th className="border p-2" key={key}>{key}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {currentRows.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="border p-2">{row.date}</td>
                  {Object.values(row).map((value, valueIndex) => (
                    <td className="border p-2" key={valueIndex}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            Previous
          </button>
          <div>
            Page {currentPage} of {totalPages}
          </div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="btn px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default StockDisplay;
