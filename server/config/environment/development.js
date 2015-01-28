'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/archivr-dev',
    jwtTokenSecret: '967697183e094509a81bf34bd5d9f19c'
  },

  seedDB: true
};
