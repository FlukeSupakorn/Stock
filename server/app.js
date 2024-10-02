var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.status(404).send('404: Page not found');
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('500: Something broke!');
});

module.exports = app;
