var path          = require('path');
var express       = require('express');
var env           = require('node-env-file');
var morgan        = require('morgan');
var errorhandler  = require('errorhandler');
var responseTime  = require('response-time');
var compression   = require('compression');
var bodyParser    = require('body-parser');

env(path.join(__dirname, '.env'));
var isProduction = (process.env.NODE_ENV === 'production');

var app = express();
var port = process.env.PORT || 3000;

app.use(morgan('combined'));
app.use(responseTime());

if (isProduction) {
  app.use(compression());
} else {
  app.use(errorhandler());
}

app.use(express.static(path.join(__dirname, 'build')));

app.listen(port);

module.exports = app;
