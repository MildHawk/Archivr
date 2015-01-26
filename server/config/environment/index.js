'use strict';

var path = require('path');
var _ = require('lodash');
var nconf = require('nconf');

/**
 * nconf sets environment variables intelligently. Will try loading the
 * local.env file if it exists. Will also pull from the existing `process.env`
 * variable. This allows us to use local environment variables provided through
 * local.env, and the Heroku env variables provided through process.env.
 *
 * Format to use nconf is: nconf.get('variableName');
 *
 * Initialize nconf here.
 */
nconf.argv() // grabs flags, e.g. --foo bar --> nconf.get('foo') === 'bar'
  .env() // grabs process.env
  .file({ file: '../local.env.json' }) // loads local.env if exists

function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: nconf.get('NODE_ENV'),

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: nconf.get('PORT') || 3000,

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'archivr-dev'
  },

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },

  facebook: {
    clientID:     nconf.get('FACEBOOK_ID') || 'id',
    clientSecret: nconf.get('FACEBOOK_SECRET') || 'secret',
    callbackURL:  (nconf.get('DOMAIN') || '') + '/auth/facebook/callback'
  },

  twitter: {
    clientID:     nconf.get('TWITTER_ID') || 'id',
    clientSecret: nconf.get('TWITTER_SECRET') || 'secret',
    callbackURL:  (nconf.get('DOMAIN') || '') + '/auth/twitter/callback'
  },

  google: {
    clientID:     nconf.get('GOOGLE_ID') || 'id',
    clientSecret: nconf.get('GOOGLE_SECRET') || 'secret',
    callbackURL:  (nconf.get('DOMAIN') || '') + '/auth/google/callback'
  }
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + nconf.get('NODE_ENV') + '.js') || {});
