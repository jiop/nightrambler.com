var path          = require('path');
var express       = require('express');
var env           = require('node-env-file');
var morgan        = require('morgan');
var errorhandler  = require('errorhandler');
var responseTime  = require('response-time');
var compression   = require('compression');
var bodyParser    = require('body-parser');

var environment   = process.env.NODE_ENV;

var app = express();
var port = process.env.PORT || 3000;

app.use(morgan('combined'));
app.use(responseTime());

switch (environment) {
  case 'build':
    app.use(compression());
    console.log('** BUILD **');
    app.use(express.static('./build/'));
    app.use('/*', express.static('./build/index.html'));
    break;
  default:
    app.use(errorhandler());
    console.log('** DEV **');
    app.use(express.static('./src/client/'));
    app.use(express.static('./'));
    app.use(express.static('./tmp'));
    app.use('/*', express.static('./src/client/index.html'));
    break;
}

// app.use(express.static('./src/client/'));
// app.use(express.static('./'));
// app.use(express.static('./tmp'));
// app.use('/*', express.static('./src/client/index.html'));

app.listen(port);

module.exports = app;
