/**
 * Wire-up the bower dependencies
 * @return {Stream}
 */

module.exports = function(gulp, $, config) {
  var gt = require('./gulp-tools')(gulp, $, config);
  var args = require('yargs').argv;
  return function() {
    gt.log('Wiring the bower dependencies into the html');
    var wiredep = require('wiredep').stream;
    var options = config.getWiredepDefaultOptions();
    // Only include stubs if flag is enabled
    var js = args.stubs ? [].concat(config.js, config.stubsjs) : config.js;
    return gulp
      .src(config.index)
      .pipe(wiredep(options))
      .pipe(gt.inject(js, '', config.jsOrder))
      .pipe(gulp.dest(config.client));
  };
};
