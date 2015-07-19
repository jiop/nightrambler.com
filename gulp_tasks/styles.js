/**
 * Compile less to css
 * @return {Stream}
 */

 module.exports = function(gulp, $, config) {
  var gt = require('./gulp-tools')(gulp, $, config);
  var args = require('yargs').argv;
  return function() {
    gt.log('Compiling Sass --> CSS');
    return gulp
      .src(config.sass)
      .pipe($.plumber())
      .pipe($.sass({
        includePaths: config.sassDependencies,
        outputStyle: (args.production ? 'compressed' : 'nested')
      }))
      .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
      .pipe(gulp.dest(config.temp));
  };
};
