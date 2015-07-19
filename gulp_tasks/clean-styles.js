/**
 * Remove all styles from the build and temp folders
 * @param  {Function} done - callback when complete
 */

module.exports = function(gulp, $, config) {
  var gt = require('./gulp-tools')(gulp, $, config);
  return function(done) {
    gt.log('Clean styles');
    var files = [].concat(
      config.temp + '**/*.css',
      config.build + 'styles/**/*.css'
    );
    gt.clean(files, done);
  };
};
