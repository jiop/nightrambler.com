/**
 * Run specs once and exit
 * @return {Stream}
 */

module.exports = function(gulp, $, config) {
  var gt = require('./gulp-tools')(gulp, $, config);
  return function(done) {
    gt.log('Running tests');
    done();
  };
};
