var mongoose = require('mongoose');

var screenShotsSchema = mongoose.Schema({
  url: { type: String, required: true },
  originalImage: {type: String, required: true },
  annotatedImage: {type: String, required: true },
  user_id: {type: Number, required: true },
  visits: { type: Number, default: 0 },
  access: {type: String, default: 'public'},
  createdAt: { type: Date, default: Date.now }
});

screenShotsSchema.methods.editScreenshot = function() {

};

var Screenshot = mongoose.model('Screenshot', screenShotsSchema);

module.exports = Screenshot;
