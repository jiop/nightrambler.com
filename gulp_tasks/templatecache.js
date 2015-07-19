/**
 * Create $templateCache from the html templates
 * @return {Stream}
 */

module.exports = function(gulp, $, config) {
  var gt = require('./gulp-tools')(gulp, $, config);
  var args = require('yargs').argv;
  return function() {
    gt.log('Creating an AngularJS $templateCache');
    return gulp
      .src(config.htmltemplates)
      .pipe($.if(args.verbose, $.bytediff.start()))
      .pipe($.minifyHtml({empty: true}))
      .pipe($.if(args.verbose, $.bytediff.stop(gt.bytediffFormatter)))
      .pipe($.angularTemplatecache(
        config.templateCache.file,
        config.templateCache.options
      ))
      .pipe(gulp.dest(config.temp));
  };
};
