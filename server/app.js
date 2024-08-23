var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// var uploadRouter = require('./routes/upload');
// var seeRouter = require('./routes/see'); 

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Use the uploadRouter for handling file uploads
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/upload', uploadRouter);
// app.use('/see', seeRouter);

// Error handling for 404
app.use(function(req, res, next) {
  res.status(404).send('404: Page not found');
});

// General error handler
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('500: Something broke!');
});

module.exports = app;
