/**
 * Compress images
 * @return {Stream}
 */

 module.exports = function(gulp, $, config) {
  var gt = require('./gulp-tools')(gulp, $, config);
  return function(done) {
    gt.log('Compressing and copying images');
    return gulp
      .src(config.images)
      .pipe($.imagemin({optimizationLevel: 4}))
      .pipe(gulp.dest(config.build + 'images'));
  };
};
