var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");

var app = express();

app.use(cors());
app.use(bodyParser.json());

const adminRoutes = require('./routes/admin');
app.use('/admin', adminRoutes);

app.listen(3333, function () {
  console.log("CORS-enabled web server listening on port 3333");
});