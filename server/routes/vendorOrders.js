const express = require('express');
const connection = require('../db');

const router = express.Router();

router.get('/see', function (req, res, next) {
  connection.query(
    'SELECT orders.OrderID, orders.Status, orders.ExpectedDate, ' +
    'orderitem.ProductID, orderitem.Count, product.ProductName, product.Price, productimage.Productimagecode ' +
    'FROM orders ' +
    'LEFT JOIN orderitem ON orders.OrderID = orderitem.OrderID ' +
    'LEFT JOIN product ON orderitem.ProductID = product.ProductID ' +
    'LEFT JOIN productimage ON product.ProductID = productimage.ProductID',
    function(err, results) {
      if (err) {
        return res.json({ status: 'error', message: err });
      }

      const orders = results.reduce((acc, row) => {
        const orderId = row.OrderID;
        if (!acc[orderId]) {
          acc[orderId] = {
            id: row.OrderID,
            status: row.Status,
            expectedDate: row.ExpectedDate,
            products: []
          };
        }
        if (row.ProductID) {
          acc[orderId].products.push({
            id: row.ProductID,
            name: row.ProductName,
            price: row.Price,
            image: row.Productimagecode,
            count: row.Count
          });
        }
        return acc;
      }, {});

      res.json(Object.values(orders));
    }
  );
});

router.put('/update', function (req, res, next) {
  const { orderId, status } = req.body;
  connection.query(
    'UPDATE orders SET Status = ? WHERE OrderID = ?',
    [status, orderId],
    function(err) {
      if (err) {
        return res.json({ status: 'error', message: err });
      }
      res.json({ status: 'ok', message: 'Order status updated successfully' });
    }
  );
});

router.delete('/delete', function (req, res, next) {
  const orderIDs = req.body.orderIDs;
  connection.query(
    'DELETE FROM orders WHERE OrderID IN (?)',
    [orderIDs],
    function(err) {
      if (err) {
        return res.json({ status: 'error', message: err });
      }
      res.json({ status: 'ok', message: 'Orders deleted successfully' });
    }
  );
});

module.exports = router;
