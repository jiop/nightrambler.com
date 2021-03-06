/**
 * serve the build environment
 * --nosync
 */
module.exports = function(gulp, $, config) {
  var gt = require('./gulp-tools')(gulp, $, config);
  return function() {
    gt.log('Serve application in production mode');
    gt.serve(false /*isDev*/);
  };
};
