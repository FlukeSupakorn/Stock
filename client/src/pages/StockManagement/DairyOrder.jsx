import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import Papa from 'papaparse';

function DairyOrder() {
  const [file, setFile] = useState(null);
  const [stock, setStock] = useState([]);

  useEffect(() => {
    // Fetch stock data on component mount
    axios.get('http://localhost:3333/admin/stock/see')
      .then(response => setStock(response.data))
      .catch(error => console.error("Error fetching stock data:", error));
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = (event) => {
    event.preventDefault();
    if (!file) {
      alert("Please select a file");
      return;
    }

    // Read and parse the CSV file
    Papa.parse(file, {
      header: true, // Assumes first row is header
      complete: (results) => {
        // Process and send data
        const data = results.data;

        console.log("Parsed data:", data);

        // Send parsed data to the server
        axios.post('http://localhost:3333/admin/stock/upload', { data })
          .then(() => {
            alert("Data uploaded successfully");
            // Re-fetch stock data after upload
            return axios.get('http://localhost:3333/admin/stock/see');
          })
          .then(response => setStock(response.data))
          .catch((error) => {
            console.error("Error uploading data:", error);
            alert("Error uploading data");
          });
      },
      error: (error) => {
        console.error("Error parsing CSV file:", error);
        alert("Error parsing CSV file");
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6 bg-gradient-to-r from-green-400 to-blue-500 text-white">
      <h1 className="text-4xl font-bold mb-6 animate-pulse drop-shadow-lg">
        Dairy Order
      </h1>
      <form onSubmit={handleUpload} className="flex flex-col space-y-4 max-w-2xl w-full bg-white p-6 rounded-lg shadow-lg">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="file-input text-sm"
        />
        <button
          type="submit"
          className="btn text-xl text-white bg-gradient-to-r from-black to-gray-700 hover:from-gray-800 hover:to-black shadow-lg transform transition-transform duration-300 hover:scale-105"
        >
          Upload CSV
        </button>
      </form>
      <div className="flex flex-col space-y-4 w-full max-w-6xl p-4">
        <div className="bg-white text-black rounded-lg shadow-lg p-4 overflow-x-auto">
          <h2 className="text-2xl font-bold mb-4">Current Stock</h2>
          <table className="w-full min-w-full border-collapse text-xs">
            <thead>
              <tr>
                <th className="border p-1">Date</th>
                <th className="border p-1">เส้น</th>
                <th className="border p-1">หน่วย_1</th>
                <th className="border p-1">หมูชาชู</th>
                <th className="border p-1">หน่วย_2</th>
                <th className="border p-1">หมูทงคัตสึ</th>
                <th className="border p-1">หน่วย_3</th>
                <th className="border p-1">หมู</th>
                <th className="border p-1">หน่วย_4</th>
                <th className="border p-1">ไก่คาราเกะ</th>
                <th className="border p-1">หน่วย_5</th>
                <th className="border p-1">ปลา</th>
                <th className="border p-1">หน่วย_6</th>
                <th className="border p-1">เกี๊ยวซ่า</th>
                <th className="border p-1">หน่วย_7</th>
                <th className="border p-1">นักเก็ตไก่</th>
                <th className="border p-1">หน่วย_8</th>
                <th className="border p-1">เฟรนซ์ฟรายส์</th>
                <th className="border p-1">หน่วย_9</th>
                <th className="border p-1">ปูอัด</th>
                <th className="border p-1">หน่วย_10</th>
                <th className="border p-1">Note</th>
              </tr>
            </thead>
            <tbody>
              {stock.map((item, index) => (
                <tr key={index}>
                  <td className="border p-1">{item.date}</td>
                  <td className="border p-1">{item["เส้น"]}</td>
                  <td className="border p-1">{item["หน่วย_1"]}</td>
                  <td className="border p-1">{item["หมูชาชู"]}</td>
                  <td className="border p-1">{item["หน่วย_2"]}</td>
                  <td className="border p-1">{item["หมูทงคัตสึ"]}</td>
                  <td className="border p-1">{item["หน่วย_3"]}</td>
                  <td className="border p-1">{item["หมู"]}</td>
                  <td className="border p-1">{item["หน่วย_4"]}</td>
                  <td className="border p-1">{item["ไก่คาราเกะ"]}</td>
                  <td className="border p-1">{item["หน่วย_5"]}</td>
                  <td className="border p-1">{item["ปลา"]}</td>
                  <td className="border p-1">{item["หน่วย_6"]}</td>
                  <td className="border p-1">{item["เกี๊ยวซ่า"]}</td>
                  <td className="border p-1">{item["หน่วย_7"]}</td>
                  <td className="border p-1">{item["นักเก็ตไก่"]}</td>
                  <td className="border p-1">{item["หน่วย_8"]}</td>
                  <td className="border p-1">{item["เฟรนซ์ฟรายส์"]}</td>
                  <td className="border p-1">{item["หน่วย_9"]}</td>
                  <td className="border p-1">{item["ปูอัด"]}</td>
                  <td className="border p-1">{item["หน่วย_10"]}</td>
                  <td className="border p-1">{item.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-col space-y-4 w-full max-w-2xl">
        <a
          className="btn text-lg text-white bg-gradient-to-r from-black to-gray-700 hover:from-gray-800 hover:to-black shadow-lg transform transition-transform duration-300 hover:scale-105"
          href="/order"
        >
          Dairy Order
        </a>
        <a
          className="btn text-lg text-white bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 shadow-lg transform transition-transform duration-300 hover:scale-105"
          href="/management"
        >
          Stock Management
        </a>
      </div>
    </div>
  );
}

export default () => (
  <Layout>
    <DairyOrder />
  </Layout>
);
