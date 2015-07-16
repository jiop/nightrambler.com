var gulp     = require('gulp');
var args     = require('yargs').argv;
var $        = require('gulp-load-plugins')({lazy: true});
var rimraf   = require('rimraf');

var router   = require('front-router');
var sequence = require('run-sequence');
var path     = require('path');
var env      = require('node-env-file');

// Check for --production flag
var isProduction = !!(args.production);

// 3. TASKS
// - - - - - - - - - - - - - - -

var handleJscsErrors = function(err) {
  console.log('Error: ' + err.toString());
  this.emit('end');
};

gulp.task('vet', function() {
  console.log('Analyzing source with JSHint and JSCS.');
  return gulp
    .src(['./client/**/*.js', './*.js'])
    .pipe($.if(args.verbose, $.print()))
    .pipe($.jscs())
    .on('error', handleJscsErrors)
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
    .pipe($.jshint.reporter('fail'));
});

// Cleans the build directory
gulp.task('clean', function(cb) {
  rimraf('./build', cb);
});

// Copies everything in the client folder except templates, Sass, and JS
gulp.task('copy', function() {
  return gulp
    .src(config.assets, {base: './client/'})
    .pipe(gulp.dest('./build'));
});

// Copies your app's page templates and generates URLs for them
gulp.task('copy:templates', function() {
  return gulp
    .src('./client/templates/**/*.html')
    .pipe(router({
      path: 'build/assets/js/routes.js',
      root: 'client'
    }))
    .pipe(gulp.dest('./build/templates'));
});

// Compiles the Foundation for Apps directive partials into a single JavaScript file
gulp.task('copy:foundation', function(cb) {
  gulp
    .src('bower_components/foundation-apps/js/angular/components/**/*.html')
    .pipe($.ngHtml2js({
      prefix: 'components/',
      moduleName: 'foundation',
      declareModule: false
    }))
    .pipe($.uglify())
    .pipe($.concat('templates.js'))
    .pipe(gulp.dest('./build/assets/js'));

  // Iconic SVG icons
  gulp
    .src('./bower_components/foundation-apps/iconic/**/*')
    .pipe(gulp.dest('./build/assets/img/iconic/'));
  cb();
});

gulp.task('copy:angular-leaflet-directive', function(cb) {
  return gulp
    .src(config.angularLeafletDirective)
    .pipe(gulp.dest('./build/assets/js'));
});

gulp.task('copy:leaflet', function(cb) {
  gulp.src(config.leafletJS).pipe(gulp.dest('./build/assets/js'));
  gulp.src(config.leafletCSS).pipe(gulp.dest('./build/assets/css'));
  cb();
});

gulp.task('copy:underscore', function(cb) {
  return gulp
    .src(config.underscoreJS)
    .pipe(gulp.dest('./build/assets/js'))
  ;
});

gulp.task('copy:angular-leaflet-directive', function(cb) {
  return gulp
    .src(config.angularLeafletDirective)
    .pipe(gulp.dest('./build/assets/js'))
  ;
});

gulp.task('copy:fontawesome', function(cb) {
  gulp
    .src('bower_components/fontawesome/fonts/**.*')
    .pipe(gulp.dest('./build/assets/fonts'));
  gulp
    .src('bower_components/fontawesome/css/font-awesome.css')
    .pipe(gulp.dest('./build/assets/css'));
  cb();
});

gulp.task('copy:angular-truncate-2', function() {
  return gulp
    .src(config.angularTruncate2)
    .pipe(gulp.dest('./build/assets/js/'));
});

gulp.task('copy:angular-resource', function() {
  return gulp
    .src(config.angularResource)
    .pipe(gulp.dest('./build/assets/js/'));
});

// Compiles Sass
gulp.task('sass', function() {
  return gulp
    .src('client/assets/scss/app.scss')
    .pipe($.sass({
      includePaths: config.sass,
      outputStyle: (isProduction ? 'compressed' : 'nested')
    }))
    .pipe($.autoprefixer({browsers: ['last 2 versions', 'ie 10']}))
    .pipe(gulp.dest('./build/assets/css/'));
});

// Compiles and copies the Foundation for Apps JavaScript
// as well as your app's custom JS
gulp.task('uglify', ['uglify:foundation', 'uglify:app']);

gulp.task('uglify:foundation', function(cb) {
  var uglify = $.if(isProduction,
    $.uglify().on('error', function(e) {
      console.log(e);
    })
  );
  return gulp
    .src(config.foundationJS)
    .pipe(uglify)
    .pipe($.concat('foundation.js'))
    .pipe(gulp.dest('./build/assets/js/'))
  ;
});

gulp.task('uglify:app', function() {
  var uglify = $.if(
    isProduction,
    $.uglify().on('error', function(e) { console.log(e); })
  );
  return gulp
    .src(config.appJS)
    .pipe(uglify)
    .pipe($.concat('app.js'))
    .pipe(gulp.dest('./build/assets/js/'))
  ;
});

// Starts a test server, which you can view at http://localhost:8080
gulp.task('server', ['build'], function() {
  env(path.join(__dirname, '.env'));
  gulp
    .src('./build')
    .pipe($.webserver({
      port: process.env.PORT,
      host: '0.0.0.0',
      fallback: 'index.html',
      livereload: false,
      open: true
    }));
});

// Builds your entire app once, without starting a server
gulp.task('build', function(cb) {
  sequence('clean', [
    'copy',
    'copy:foundation',
    'copy:leaflet',
    'copy:angular-leaflet-directive',
    'copy:underscore',
    'copy:angular-truncate-2',
    'sass',
    'copy:fontawesome',
    'copy:angular-resource',
    'uglify'], 'copy:templates', cb);
});

// Default task: builds app, starts server, and recompiles assets
gulp.task('default', ['server'], function() {
  // Watch Gulpfile
  gulp.watch(['./gulpfile.js'], ['build']);

  // Watch Sass
  gulp.watch(['./client/assets/scss/**/*', './scss/**/*'], ['sass']);

  // Watch JavaScript
  gulp.watch(['./client/assets/js/**/*', './js/**/*'], ['uglify:app']);

  // Watch static files
  gulp.watch(
    ['./client/**/*.*',
      '!./client/templates/**/*.*',
      '!./client/assets/{scss,js}/**/*.*'],
    ['copy']
  );

  // Watch app templates
  gulp.watch(['./client/templates/**/*.html'], ['copy:templates']);
});
