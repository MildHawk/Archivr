var mongoose = require('mongoose');

var screenshotsSchema = mongoose.Schema({
  url: { type: String, required: true },
  originalImage: {type: String, required: true },
  annotatedImage: {type: String, required: true },
  user_id: {type: ObjectId, required: true },
  visits: { type: Number, default: 0 },
  access: {type: String, default: 'public'},
  createdAt: { type: Date, default: Date.now }
});

screenshotsSchema.methods.editScreenshot = function() {

};

var Screenshot = mongoose.model('Screenshot', screenshotsSchema);

module.exports = Screenshot;
