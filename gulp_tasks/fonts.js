/**
 * Copy fonts
 * @return {Stream}
 */

 module.exports = function(gulp, $, config) {
  var gt = require('./gulp-tools')(gulp, $, config);
  return function() {
    gt.log('Copying fonts');
    return gulp
      .src(config.fonts)
      .pipe(gulp.dest(config.build + 'fonts'));
  };
};

