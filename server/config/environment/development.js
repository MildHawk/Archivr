'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/archivr-dev'
  },

  redis: {
    hostname: '127.0.0.1',
    port: 6379
  },

  seedDB: true
};
