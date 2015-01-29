/**
 * index.js provides the summary export for environment variables. It will
 * pull environment variables either from a local.env.json file or from the
 * deployment environment on Heroku. Exports on index.js are further refined
 * by input from `development.js`, `production.js`, and `test.js` depending
 * on which environment has been chosen to run.
 *
 * Variables can be accessed in the following manner:
 *   var config = require('./path/to/environment') // (no need for '/index.js')
 *   console.log(config.port);
 *   console.log(config.facebook.clientID);
 */

'use strict';

var path = require('path');
var _ = require('lodash');
var nconf = require('nconf');
var cloudinary = require('cloudinary');

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
  .file({ file: __dirname + '/../local.env.json' }) // loads local.env if exists

function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: nconf.get('NODE_ENV') || 'development',

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

  // Social API keys
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
  },

  // JWT token
  jwtTokenSecret: nconf.get('JWT_TOKEN_SECRET'),

};

/**
 * Configure cloudinary if on local; otherwise, it's configured by Heroku
 * (http://bit.ly/1Lj4KIy)
 */
if (all.env === 'development') {
  cloudinary.config({
    cloud_name: nconf.get('CLOUDINARY_NAME'),
    api_key: nconf.get('CLOUDINARY_KEY'),
    api_secret: nconf.get('CLOUDINARY_SECRET')
  });
}

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + all.env + '.js') || {});
