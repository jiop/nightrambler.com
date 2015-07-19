/**
 * serve the dev environment
 * --nosync
 */
module.exports = function(gulp, $, config) {
  var gt = require('./gulp-tools')(gulp, $, config);
  return function() {
    gt.log('Serve application in dev mode');
    gt.serve(true /*isDev*/);
  };
};
