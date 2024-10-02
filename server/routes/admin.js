const express = require('express');
const router = express.Router();

const stockRoutes = require('./stock');
router.use('/stock', stockRoutes);

module.exports = router;
