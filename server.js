var spawn = require('child_process').spawn;
var env = require('node-env-file');

env(__dirname + '/.env');

var args = ['server'];
spawn('node_modules/.bin/gulp', args, {
    stdio: 'inherit',
    env: process.env,
  })
  .on('close', function(err) {
    if(err)
      console.log("docpad failed");
    else
      console.log("docpad running");
  });
