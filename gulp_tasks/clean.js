/**
 * Remove all files from the build, temp, and reports folders
 * @param  {Function} done - callback when complete
 */

module.exports = function(gulp, $, config) {
  var gt = require('./gulp-tools')(gulp, $, config);
  return function(done) {
    gt.log('Clean');
    var delconfig = [].concat(config.build, config.temp);
    gt.log('Cleaning: ' + $.util.colors.blue(delconfig));
    $.del(delconfig, done);
  };
};
