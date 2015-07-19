/**
 * Remove all images from the build folder
 * @param  {Function} done - callback when complete
 */

module.exports = function(gulp, $, config) {
  var gt = require('./gulp-tools')(gulp, $, config);
  return function(done) {
    gt.log('Clean images');
    gt.clean(config.build + 'images/**/*.*', done);
  };
};
