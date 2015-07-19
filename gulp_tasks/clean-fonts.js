/**
 * Remove all fonts from the build folder
 * @param  {Function} done - callback when complete
 */

module.exports = function(gulp, $, config) {
  var gt = require('./gulp-tools')(gulp, $, config);
  return function(done) {
    gt.log('Clean fonts');
    gt.clean(config.build + 'fonts/**/*.*', done);
  };
};
