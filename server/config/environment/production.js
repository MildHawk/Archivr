'use strict';

// Production specific configuration
// =================================

// Parse RedisCloud environment variable
var url = require('url');
var redisURL = url.parse(process.env.REDISCLOUD_URL || '');

module.exports = {
  // Server IP
  ip:       process.env.OPENSHIFT_NODEJS_IP ||
            process.env.IP ||
            undefined,

  // Server port
  port:     process.env.OPENSHIFT_NODEJS_PORT ||
            process.env.PORT ||
            3000,

  // MongoDB connection options
  mongo: {
    uri:    process.env.MONGOLAB_URI ||
            process.env.MONGOHQ_URL ||
            process.env.OPENSHIFT_MONGODB_DB_URL+process.env.OPENSHIFT_APP_NAME ||
            'mongodb://localhost/archivr'
  },

  // Redis connection options
  redis: {
    hostname: redisURL.hostname || '127.0.0.1',
    port: redisURL.port || 6379,
    auth: redisURL.auth ? redisURL.auth.split(':')[1] : undefined
  }
};
