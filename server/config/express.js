var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

module.exports = function expressConfig(app) {
  var env = app.get('env');
  var port = process.env.PORT || 3000;

  // standard POST request body parser
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse JSON posts
  app.use(bodyParser.json());

  // HTTP request logger middleware
  app.use(morgan('combined'));

  // set view directory
  app.set('views', __dirname + '/../views');

  // set default server side view engine
  app.set('view engine', 'jade');

  // set static asset dir
  app.use(express.static(__dirname + '/../../client/app/dist'));

  // dynamically set port if in production otherwise use port 3000
  app.set('port', port);
};
