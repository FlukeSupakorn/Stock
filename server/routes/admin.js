const express = require('express');
const router = express.Router();

const productRoutes = require('./vendorProducts');
const orderRoutes = require('./vendorOrders');
const authRoutes = require('./vendorauth');

router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/auth', authRoutes);

module.exports = router;
