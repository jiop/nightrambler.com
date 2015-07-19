var express       = require('express');
var morgan        = require('morgan');
var errorhandler  = require('errorhandler');
var responseTime  = require('response-time');
var compression   = require('compression');
var bodyParser    = require('body-parser');
var cors          = require('cors');

var environment   = process.env.NODE_ENV;
var port          = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(compression());
app.use(morgan('combined'));
app.use(responseTime());
app.use(cors());
app.use(errorhandler());

console.log('Start node server on ' + port + ' in ' + environment + ' mode');

switch (environment) {
  case 'build':
    console.log('** BUILD **');
    app.use(express.static('./build/'));
    app.use('/*', express.static('./build/index.html'));
    break;
  default:
    console.log('** DEV **');
    app.use(express.static('./src/client/'));
    app.use(express.static('./'));
    app.use(express.static('./tmp'));
    app.use('/*', express.static('./src/client/index.html'));
    break;
}

app.listen(port, function() {
  console.log('Express server listening on port ' + port);
  console.log('env = ' + app.get('env') +
    '\n__dirname = ' + __dirname +
    '\nprocess.cwd = ' + process.cwd());
});

module.exports = app;
