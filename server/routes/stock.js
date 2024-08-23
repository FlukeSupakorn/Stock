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

router.post('/upload', (req, res) => {
  const data = req.body.data;

  console.log('Parsed data:', data);

  // Use the exact keys from the CSV headers
  const dates = data.map((row) => row['Date']);

  console.log('Dates:', dates);

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

  res.send('Data processed and saved to database');
});

module.exports = router;
