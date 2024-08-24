import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import Papa from 'papaparse';

function DairyOrder() {
  //Order Management
  const [file, setFile] = useState(null);
  const [stock, setStock] = useState([]);
  const [totalNetSales, setTotalNetSales] = useState(0);
  const [totalNetSalesSuanmak, setTotalNetSalesSuanmak] = useState(0);
  const [totalNetSalesPhuttha, setTotalNetSalesPhuttha] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:3333/admin/stock/see')
      .then(response => setStock(response.data))
      .catch(error => console.error("Error fetching stock data:", error));
  }, []);

  console.log("Stock:", stock);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = (event) => {
    event.preventDefault();
    if (!file) {
      alert("Please select a file");
      return;
    }
  
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const data = results.data;
        const itemconvert = {};
        console.log("data:", data);
  
        const item_mapping = {
          'เส้น': ['เส้น', 1],
          'เฟรนช์ฟรายส์': ['เฟรนช์ฟรายส์', 0.15],
          'เกี๊ยวซ่าทอดกรอบ': ['เกี๊ยวซ่า', 5],
          'หมูชาชู': ['หมูชาชู', 1],
          'ราเมงต้มยำ': ['เส้น', 1, 'หมูชาชู', 1],
          'ปูอัดวาซาบิ': ['ปูอัด', 8],
          'นักเก็ตไก่': ['นักเก็ตไก่', 0.14],
          'ทงคตสึราเมง จัมโบ้': ['เส้น', 2, 'หมูชาชู', 2],
          'ทงคตสึราเมง': ['เส้น', 1, 'หมูชาชู', 1],
          'ซารุราเมง': ['เส้น', 1],
          'ข้าวญี่ปุ่นหน้าไก่คาราเกะ มายองเนส': ['ไก่คาราเกะ', 0.12],
          'ข้าวญี่ปุ่นหน้าไก่คาราเกะ ซอสเทอริยากิ': ['ไก่คาราเกะ', 0.12],
          'ข้าวญี่ปุ่นหน้าไก่คาราเกะ ซอสสไปซี่': ['ไก่คาราเกะ', 0.12],
          'ข้าวญี่ปุ่นหน้าหมูผัดซอสญี่ปุ่น': ['หมู', 0.11],
          'ข้าวญี่ปุ่นหน้าหมูทอดทงคัตสึ': ['หมูทงคัตสึ', 1],
          'ข้าวญี่ปุ่นหน้าปลาทอด ซอสเทอริยากิ': ['ปลา', 1],
          'ข้าวญี่ปุ่นหน้าปลาทอด ซอสทาร์ทาร์': ['ปลา', 1],
          'โชยุราเมง': ['เส้น', 1, 'หมูชาชู', 1],
          'ไก่ทอดคาราเกะ': ['ไก่คาราเกะ', 0.12],
        };
  
        // Calculate itemconvert from CSV data
        let totalNet = 0;
        let totalNetSuanmak = 0;
        let totalNetPhuttha = 0;

        data.forEach(order => {
          const item = order["Item"];
          const netSales = parseFloat(order["Net sales"]);
          const category = order["Category"];

          if (!isNaN(netSales)) {
            totalNet += netSales; // Accumulate total net sales

            if (category === "สวนหมาก") {
              totalNetSuanmak += netSales;
            } else if (category === "พุทธบูชา36") {
              totalNetPhuttha += netSales;
            }
          }

          if (item_mapping[item]) {
            const mappedItems = item_mapping[item];
            for (let i = 0; i < mappedItems.length; i += 2) {
              const stockItem = mappedItems[i];
              const quantity = mappedItems[i + 1];
              if (itemconvert[stockItem]) {
                itemconvert[stockItem] += quantity;
              } else {
                itemconvert[stockItem] = quantity;
              }
            }
          }
        });

        setTotalNetSales(totalNet);
        setTotalNetSalesSuanmak(totalNetSuanmak);
        setTotalNetSalesPhuttha(totalNetPhuttha);
  
        const itemconvertArray = Object.keys(itemconvert).map(stockItem => ({
          stockItem: stockItem,
          quantity: itemconvert[stockItem]
        }));
  
        console.log("Mapped item conversion:", itemconvertArray);
        console.log("Total Net Sales:", totalNetSales);
  
        // Fetch the latest stock entry
        axios.get('http://localhost:3333/admin/stock/see')
          .then(response => {
            const latestStock = response.data[response.data.length - 1];
            console.log("Latest Stock:", latestStock);
  
            // Create newStock by subtracting itemconvertArray from latestStock
            const newStock = { ...latestStock };
            itemconvertArray.forEach(item => {
              const { stockItem, quantity } = item;
              if (newStock[stockItem]) {
                newStock[stockItem] = parseFloat(newStock[stockItem]) - quantity;
              } else {
                newStock[stockItem] = -quantity;
              }
            });
  
            const now = new Date();

            // Format date
            const month = now.getMonth() + 1; // Months are 0-based
            const day = now.getDate();
            const year = now.getFullYear().toString().slice(-2); // Last two digits of the year

            // Format time
            let hour = now.getHours();
            const minute = now.getMinutes();
            const ampm = hour >= 12 ? 'PM' : 'AM';
            hour = hour % 12;
            hour = hour ? hour : 12; // Hour '0' should be '12'
            const formattedMinute = minute < 10 ? '0' + minute : minute; // Add leading zero if needed

            const formattedDate = `${month}/${day}/${year} ${hour}:${formattedMinute} ${ampm}`;

            // Update newStock with the formatted date
            newStock.date = formattedDate;
  
            console.log("New Stock:", newStock);
  
            // Post new stock data to the server
            return axios.post('http://localhost:3333/admin/stock/upload', { data: data , newStock: newStock });
          })
          .then(() => {
            alert("New stock data uploaded successfully");
            return axios.get('http://localhost:3333/admin/stock/see');
          })
          .then(response => setStock(response.data))
          .catch((error) => {
            console.error("Error processing data:", error);
            alert("Error processing data");
          });
      },
      error: (error) => {
        console.error("Error parsing CSV file:", error);
        alert("Error parsing CSV file");
      }
    });
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = stock.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(stock.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  //calculate total income
  const [totalIncome, setTotalIncome] = useState(0);
  useEffect(() => {
    axios.get('http://localhost:3333/admin/stock/see')
      .then(response => {
        const stockData = response.data;
        setStock(stockData);
        
        // Calculate total income
        const total = stock.reduce((acc, item) => acc + parseFloat(item["Net sales"] || 0), 0);
        setTotalIncome(total);
      })
      .catch(error => console.error("Error fetching stock data:", error));
  }, []);
  
  
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Dairy Order</h1>
      <form onSubmit={handleUpload} className="flex flex-col space-y-4 bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <label className="text-gray-600 mb-2">Upload CSV</label>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="file-input mb-4 border border-gray-300 rounded-md p-2 text-gray-700"
        />
        <button
          type="submit"
          className="btn px-4 py-2 text-lg text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
        >
          Upload
        </button>
      </form>
      <div className="mt-6 w-full max-w-6xl bg-white rounded-lg shadow-md p-4">
        <h2 className="text-2xl font-semibold p-4 border-b border-gray-300">Total Net Sales</h2>
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
      <div className="mt-6 w-full max-w-6xl bg-white rounded-lg shadow-md p-4 overflow-x-auto">
        <h2 className="text-2xl font-semibold p-4 border-b border-gray-300">Current Stock</h2>
        <table className="w-full min-w-max border-collapse text-sm">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="border p-2">Date</th>
              <th className="border p-2">เส้น</th>
              <th className="border p-2">หน่วย_1</th>
              <th className="border p-2">หมูชาชู</th>
              <th className="border p-2">หน่วย_2</th>
              <th className="border p-2">หมูทงคัตสึ</th>
              <th className="border p-2">หน่วย_3</th>
              <th className="border p-2">หมู</th>
              <th className="border p-2">หน่วย_4</th>
              <th className="border p-2">ไก่คาราเกะ</th>
              <th className="border p-2">หน่วย_5</th>
              <th className="border p-2">ปลา</th>
              <th className="border p-2">หน่วย_6</th>
              <th className="border p-2">เกี๊ยวซ่า</th>
              <th className="border p-2">หน่วย_7</th>
              <th className="border p-2">นักเก็ตไก่</th>
              <th className="border p-2">หน่วย_8</th>
              <th className="border p-2">เฟรนซ์ฟรายส์</th>
              <th className="border p-2">หน่วย_9</th>
              <th className="border p-2">ปูอัด</th>
              <th className="border p-2">หน่วย_10</th>
              <th className="border p-2">note</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="border p-2">{item.date}</td>
                <td className="border p-2">{item["เส้น"]}</td>
                <td className="border p-2">{item["หน่วย_1"]}</td>
                <td className="border p-2">{item["หมูชาชู"]}</td>
                <td className="border p-2">{item["หน่วย_2"]}</td>
                <td className="border p-2">{item["หมูทงคัตสึ"]}</td>
                <td className="border p-2">{item["หน่วย_3"]}</td>
                <td className="border p-2">{item["หมู"]}</td>
                <td className="border p-2">{item["หน่วย_4"]}</td>
                <td className="border p-2">{item["ไก่คาราเกะ"]}</td>
                <td className="border p-2">{item["หน่วย_5"]}</td>
                <td className="border p-2">{item["ปลา"]}</td>
                <td className="border p-2">{item["หน่วย_6"]}</td>
                <td className="border p-2">{item["เกี๊ยวซ่า"]}</td>
                <td className="border p-2">{item["หน่วย_7"]}</td>
                <td className="border p-2">{item["นักเก็ตไก่"]}</td>
                <td className="border p-2">{item["หน่วย_8"]}</td>
                <td className="border p-2">{item["เฟรนซ์ฟรายส์"]}</td>
                <td className="border p-2">{item["หน่วย_9"]}</td>
                <td className="border p-2">{item["ปูอัด"]}</td>
                <td className="border p-2">{item["หน่วย_10"]}</td>
                <td className="border p-2">{item["note"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
          >
            Previous
          </button>
          <div className="flex space-x-2">
            {pageNumbers.map(number => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                className={`btn px-4 py-2 rounded-md ${currentPage === number ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border border-blue-600'}`}
              >
                {number}
              </button>
            ))}
          </div>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === pageNumbers.length}
            className="btn px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
          >
            Next
          </button> 
        </div>
      </div>
    </div>
  );  
}

export default () => (
  <Layout>
    <DairyOrder />
  </Layout>
);

