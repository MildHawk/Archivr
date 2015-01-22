var express = require('express');
var parser = require('body-parser');
var morgan = require('morgan');

module.exports = function expressConfig (app) {
  
  // standard POST request body parser
  app.use(bodyParser.urlencoded({ extended: false }));
  
  // parse JSON posts
  app.use(bodyParser.json());

  // HTTP request logger middleware
  app.use(morgan());

};