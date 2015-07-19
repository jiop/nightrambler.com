/**
 * Remove all js and html from the build and temp folders
 * @param  {Function} done - callback when complete
 */

module.exports = function(gulp, $, config) {
  var gt = require('./gulp-tools')(gulp, $, config);
  return function(done) {
    gt.log('Clean code');
    var files = [].concat(
      config.temp + '**/*.js',
      config.build + 'js/**/*.js',
      config.build + '**/*.html'
    );
    gt.clean(files, done);
  };
};
