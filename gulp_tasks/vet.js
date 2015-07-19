module.exports = function(gulp, $, config) {
  var gt = require('./gulp-tools')(gulp, $, config);
  var args = require('yargs').argv;
  return function(done) {
    gt.log('Analyzing source with JSHint and JSCS.');
    return gulp
      .src(config.alljs)
      .pipe($.if(args.verbose, $.print()))
      .pipe($.jshint())
      .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
      .pipe($.jshint.reporter('fail'))
      .pipe($.jscs())
      .on('error', gt.errorLogger);
  };
};
