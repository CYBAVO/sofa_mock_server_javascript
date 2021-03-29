var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var semver = require('semver')

var indexRouter = require('./routes/index');
var walletsRouter = require('./routes/wallets');
var merchantRouter = require('./routes/merchant');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/v1/mock/wallets', walletsRouter);
app.use('/v1/mock/merchant', merchantRouter);

if (!semver.satisfies(process.version, '>=v10.19.0')) {
  console.log(`
  ***********************************************************************
  **                                                                   **
  **  Required version: node v10.19.0 or later (npm v6.13.4 or later)  **
  **                                                                   **
  ***********************************************************************

  program exited!`);
  process.exit();
}

module.exports = app;
