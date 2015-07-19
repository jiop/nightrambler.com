module.exports = function(gulp, $, config) {
  var gt = require('./gulp-tools')(gulp, $, config);
  return function() {
    gt.log('Wire up css into the html, after files are ready');
    return gulp
      .src(config.index)
      .pipe(gt.inject(config.css))
      .pipe(gulp.dest(config.client));
  };
};
