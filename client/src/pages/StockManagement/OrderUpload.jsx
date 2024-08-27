import React, { useState } from "react";
import Papa from "papaparse";
import axios from "axios";

function OrderUpload({ updateStock }) {
  const [file, setFile] = useState(null);

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

        let totalNet = 0;
        let totalNetSuanmak = 0;
        let totalNetPhuttha = 0;

        data.forEach(order => {
          const item = order["Item"];
          const netSales = parseFloat(order["Net sales"]);
          const category = order["Category"];

          if (!isNaN(netSales)) {
            totalNet += netSales;
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

        const itemconvertArray = Object.keys(itemconvert).map(stockItem => ({
          stockItem: stockItem,
          quantity: itemconvert[stockItem]
        }));

        axios.get('http://localhost:3333/admin/stock/see')
          .then(response => {
            const latestStock = response.data[response.data.length - 1];
            const newStock = { ...latestStock };

            itemconvertArray.forEach(item => {
              const { stockItem, quantity } = item;
              if (newStock[stockItem]) {
                newStock[stockItem] = parseFloat(newStock[stockItem]) - quantity;
              } else {
                newStock[stockItem] = -quantity;
              }
            });

            console.log("data:", data);

            console.log("itemconvert:", itemconvert);

            console.log("itemconvertArray:", itemconvertArray);

            console.log("last stock data:", latestStock);
            console.log("New stock data:", newStock);

            const now = new Date();
            const formattedDate = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear().toString().slice(-2)} ${now.getHours() % 12 || 12}:${now.getMinutes().toString().padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;
            newStock.date = formattedDate;

            return axios.post('http://localhost:3333/admin/stock/upload', { data: data, newStock: newStock, totalNet, totalNetSuanmak, totalNetPhuttha });
          })
          .then(() => {
            alert("New stock data uploaded successfully");
            return axios.get('http://localhost:3333/admin/stock/see');
          })
          .then(response => {
            updateStock(response.data);
          })
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

  return (
    <form onSubmit={handleUpload} className="flex flex-col space-y-4 bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <label className="text-gray-600 mb-2 text-xl font-semibold">Upload CSV</label>
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
  );
}

export default OrderUpload;
