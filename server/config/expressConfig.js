var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

module.exports = function expressConfig(app) {
  var env = app.get('env');

  // standard POST request body parser
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse JSON posts
  app.use(bodyParser.json());

  // HTTP request logger middleware
  app.use(morgan('combined'));

  if(env !== 'production'){
    app.set('port', 3000);
  }

};
