var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
// var jwt = require('express-jwt');

module.exports = function expressConfig(app) {
  var env = app.get('env');

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

  //
  app.use(cookieParser());

  // dynamically set port if in production otherwise use port 3000
  if(env !== 'production') {
    app.set('port', 3000);
    app.set('jwtTokenSecret', '967697183e094509a81bf34bd5d9f19c');
  } else {
    app.set('port', process.env.PORT);
  }

};
