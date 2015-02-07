var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./environment');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var redis = require('redis');
var url = require('url');

// Configure Redis server
var redisClient = redis.createClient(config.redis.port, config.redis.hostname,
                                     { no_ready_check: true }); // jshint ignore:line
if (config.redis.auth) redisClient.auth(config.redis.auth);

module.exports = function expressConfig(app) {
  // standard POST request body parser
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse JSON posts
  app.use(bodyParser.json());

  // HTTP request logger middleware
  app.use(morgan('combined'));

  app.use(session({
    // Use RedisStore for session storage
    store: new RedisStore({
      client: redisClient
    }),
    secret: config.expressSessionSecret,
    resave: false,
    saveUninitialized: true
  }));

  // set view directory
  app.set('views', __dirname + '/../views');

  // set default server side view engine
  app.set('view engine', 'jade');

  // set static asset dir
  app.use(express.static(__dirname + '/../../client/app/dist'));

  // dynamically set port if in production otherwise use port 3000
  app.set('port', config.port);
  app.set('jwtTokenSecret', config.jwtTokenSecret);

  // Seed database if specified
  if (config.seedDB) {
    console.log('Seeding database...');
    require('./seed');
  }
};
