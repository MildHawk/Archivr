var express = require('express');
var app = express();

var expressConfig = require('./config/expressConfig');

app.use(parser());

app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'));
});