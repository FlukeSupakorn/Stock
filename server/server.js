var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");

var app = express();

app.use(cors());
app.use(bodyParser.json());

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/products');
const adminRoutes = require('./routes/admin');
const cartRoutes = require('./routes/cart');

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/products', productRoutes);
app.use('/admin', adminRoutes);
app.use('/cart', cartRoutes);

app.listen(3333, function () {
  console.log("CORS-enabled web server listening on port 3333");
});