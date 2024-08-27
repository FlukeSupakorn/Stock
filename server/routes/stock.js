const express = require('express');
const router = express.Router();
const connection = require('../db'); // Import your MySQL connection

router.get('/see', (req, res) => {
  const query = 'SELECT * FROM stock';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).send('Server error');
    }
    res.json(results);
  });
});

router.get('/see/totalprice', (req, res) => {
  const pricequery = 'SELECT * FROM totalprice';

  connection.query(pricequery, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).send('Server error');
    }
    res.json(results);
  });
});

router.post('/upload', (req, res) => {
  const data = req.body.data;
  const newStock = req.body.newStock;
  const totalNet = req.body.totalNet;
  const totalNetSuanmak = req.body.totalNetSuanmak;
  const totalNetPhuttha = req.body.totalNetPhuttha;

  console.log('Parsed data:', data);
  console.log('New stock:', newStock);

  console.log('Total net:', totalNet);
  console.log('Total net suanmak:', totalNetSuanmak);
  console.log('Total net phuttha:', totalNetPhuttha);

  // Process and save data to the database
  data.forEach((row) => {
    const query = `
      INSERT INTO receipts (
        date, receipt_number, receipt_type, category, sku, item, quantity, gross_sales, discounts,
        net_sales, cost_of_goods, gross_profit, taxes, pos, store, cashier_name, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      row['Date'], row['Receipt number'], row['Receipt type'], row['Category'], row['SKU'], row['Item'],
      parseFloat(row['Quantity']), parseFloat(row['Gross sales']), parseFloat(row['Discounts']),
      parseFloat(row['Net sales']), parseFloat(row['Cost of goods']), parseFloat(row['Gross profit']),
      parseFloat(row['Taxes']), row['POS'], row['Store'], row['Cashier name'], row['Status']
    ];

    connection.query(query, values, (err) => {
      if (err) {
        console.error('Error saving data:', err);
      }
    });
  });

  // Add new stock data to the stock table
  if (newStock) {
    const newStockQuery = `
      INSERT INTO stock (
        date, type, เส้น, หน่วย_1, หมูชาชู, หน่วย_2, หมูทงคัตสึ, หน่วย_3, หมู, หน่วย_4, ไก่คาราเกะ, หน่วย_5, ปลา, หน่วย_6, เกี๊ยวซ่า, หน่วย_7, นักเก็ตไก่, หน่วย_8, เฟรนซ์ฟรายส์, หน่วย_9, ปูอัด, หน่วย_10, note
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const newStockValues = [
      newStock.date, 
      newStock.type, 
      newStock['เส้น'] || 0, 
      newStock['หน่วย_1'], 
      newStock['หมูชาชู'] || 0,
      newStock['หน่วย_2'], 
      newStock['หมูทงคัตสึ'] || 0,
      newStock['หน่วย_3'], 
      newStock['หมู'] || 0,
      newStock['หน่วย_4'], 
      newStock['ไก่คาราเกะ'] || 0, 
      newStock['หน่วย_5'], 
      newStock['ปลา'] || 0, 
      newStock['หน่วย_6'], 
      newStock['เกี๊ยวซ่า'] || 0,
      newStock['หน่วย_7'], 
      newStock['นักเก็ตไก่'] || 0, 
      newStock['หน่วย_8'], 
      newStock['เฟรนซ์ฟรายส์'] || 0, 
      newStock['หน่วย_9'], 
      newStock['ปูอัด'] || 0, 
      newStock['หน่วย_10'], 
      newStock.note || ''
    ];

    connection.query(newStockQuery, newStockValues, (err) => {
      if (err) {
        console.error('Error saving new stock data:', err);
        return res.status(500).send('Error saving new stock data');
      }
      console.log('New stock data saved successfully');
    });
  }

  if (totalNet) {
    const newtotalprice = `
      INSERT INTO totalprice (
        date, totalNetSuanmak, totalNetPhuttha, totalNet
      ) VALUES (?, ?, ?, ?)
    `;

    const newTotalPriceValues = [
      newStock.date, totalNetSuanmak, totalNetPhuttha, totalNet
    ];

    connection.query(newtotalprice, newTotalPriceValues, (err) => {
      if (err) {
        console.error('Error saving new stock data:', err);
        return res.status(500).send('Error saving new stock data');
      }
      console.log('New total price data saved successfully');
    });
  }

  res.send('Data processed and saved to database');
});


module.exports = router;
