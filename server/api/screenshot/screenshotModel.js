var mongoose = require('mongoose');
var db = require('../../db/index.js');

var screenshotsSchema = mongoose.Schema({
  url: { type: String, required: true },
  // originalImage is the url of the image uploaded to Cloudinary
  originalImage: { type: String, required: true },
  // annotation functionality to be implemented on the front-end, see wiki for more info about libraries suggested
  annotatedImage: { type: String, required: true },
  // originalImageId is the Cloudinary public_id of the image uploaded
  originalImageId: { type: String },
  username: { type: String, required: true },
  comment: { type: String },
  visits: { type: Number, default: 0 },
  access: {type: String, default: 'public'},
  createdAt: { type: Date, default: Date.now }
});


var Screenshot = mongoose.model('Screenshot', screenshotsSchema);

module.exports = Screenshot;
