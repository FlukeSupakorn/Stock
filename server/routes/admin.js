const express = require('express');
const router = express.Router();

const productRoutes = require('./vendorProducts');
const orderRoutes = require('./vendorOrders');
const authRoutes = require('./vendorauth');
const stockRoutes = require('./stock');

router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/auth', authRoutes);
router.use('/stock', stockRoutes);

module.exports = router;
