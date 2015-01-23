var express = require('express');
var app = module.exports = express();

require('./config/expressConfig')(app);
require('./routes')(app);

app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'));
});
