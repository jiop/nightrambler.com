// FOUNDATION FOR APPS TEMPLATE GULPFILE
// -------------------------------------
// This file processes all of the assets in the "client" folder, combines them with the Foundation for Apps assets, and outputs the finished files in the "build" folder as a finished app.

// 1. LIBRARIES
// - - - - - - - - - - - - - - -

var $        = require('gulp-load-plugins')();
var argv     = require('yargs').argv;
var gulp     = require('gulp');
var rimraf   = require('rimraf');
var router   = require('front-router');
var sequence = require('run-sequence');

// Check for --production flag
var isProduction = !!(argv.production);

// 2. FILE PATHS
// - - - - - - - - - - - - - - -

var paths = {
  assets: [
    './client/**/*.*',
    '!./client/templates/**/*.*',
    '!./client/assets/{scss,js}/**/*.*'
  ],
  // Sass will check these folders for files when you use @import.
  sass: [
    'client/assets/scss',
    'bower_components/foundation-apps/scss'
  ],
  // These files include Foundation for Apps and its dependencies
  foundationJS: [
    'bower_components/fastclick/lib/fastclick.js',
    'bower_components/viewport-units-buggyfill/viewport-units-buggyfill.js',
    'bower_components/tether/tether.js',
    'bower_components/hammerjs/hammer.js',
    'bower_components/angular/angular.js',
    'bower_components/angular-animate/angular-animate.js',
    'bower_components/angular-ui-router/release/angular-ui-router.js',
    'bower_components/foundation-apps/js/vendor/**/*.js',
    'bower_components/foundation-apps/js/angular/**/*.js',
    '!bower_components/foundation-apps/js/angular/app.js'
  ],
  angularLeafletDirective: [
    'bower_components/angular-leaflet-directive/dist/angular-leaflet-directive.js'
  ],
  underscoreJS: [
    'bower_components/underscore/underscore.js'
  ],
  leafletJS: [
    'bower_components/leaflet/dist/leaflet.js'
  ],
  leafletCSS: [
    'bower_components/leaflet/dist/leaflet.css'
  ],
  // These files include angular-google-maps
  angularGoogleMaps: [
    'bower_components/angular-google-maps/dist/angular-google-maps.js'
  ],
  // These files include lodash
  lodash: [
    'bower_components/lodash/lodash.js'
  ],
  // These files are for your app's JavaScript
  appJS: [
    'client/assets/js/controllers/*',
    'client/assets/js/services/*',
    'client/assets/js/app.js'
  ]
}

// 3. TASKS
// - - - - - - - - - - - - - - -

// Cleans the build directory
gulp.task('clean', function(cb) {
  rimraf('./build', cb);
});

// Copies everything in the client folder except templates, Sass, and JS
gulp.task('copy', function() {
  return gulp.src(paths.assets, {
    base: './client/'
  })
    .pipe(gulp.dest('./build'))
  ;
});

// Copies your app's page templates and generates URLs for them
gulp.task('copy:templates', function() {
  return gulp.src('./client/templates/**/*.html')
    .pipe(router({
      path: 'build/assets/js/routes.js',
      root: 'client'
    }))
    .pipe(gulp.dest('./build/templates'))
  ;
});

// Compiles the Foundation for Apps directive partials into a single JavaScript file
gulp.task('copy:foundation', function(cb) {
  gulp.src('bower_components/foundation-apps/js/angular/components/**/*.html')
    .pipe($.ngHtml2js({
      prefix: 'components/',
      moduleName: 'foundation',
      declareModule: false
    }))
    .pipe($.uglify())
    .pipe($.concat('templates.js'))
    .pipe(gulp.dest('./build/assets/js'))
  ;

  // Iconic SVG icons
  gulp.src('./bower_components/foundation-apps/iconic/**/*')
    .pipe(gulp.dest('./build/assets/img/iconic/'))
  ;

  cb();
});

gulp.task('copy:angular-leaflet-directive', function(cb) {
  return gulp.src(paths.angularLeafletDirective)
    .pipe(gulp.dest('./build/assets/js'))
  ;
});

gulp.task('copy:leaflet', function(cb) {
  gulp.src(paths.leafletJS)
    .pipe(gulp.dest('./build/assets/js'))
  ;

  gulp.src(paths.leafletCSS)
    .pipe(gulp.dest('./build/assets/css'))
  ;

  cb();
});

gulp.task('copy:underscore', function(cb) {
  return gulp.src(paths.underscoreJS)
    .pipe(gulp.dest('./build/assets/js'))
  ;
});

gulp.task('copy:angular-leaflet-directive', function(cb) {
  return gulp.src(paths.angularLeafletDirective)
    .pipe(gulp.dest('./build/assets/js'))
  ;
});

// Copy the Angular Google Maps JavaScript file to assets folder
gulp.task('copy:angular-google-maps', function(cb) {
  return gulp.src(paths.angularGoogleMaps)
    .pipe(gulp.dest('./build/assets/js'))
  ;
});

// Copy the Lodash JavaScript file to assets folder
gulp.task('copy:lodash', function() {
  return gulp.src(paths.lodash)
    .pipe(gulp.dest('./build/assets/js/'))
  ;
});

// Compiles Sass
gulp.task('sass', function () {
  return gulp.src('client/assets/scss/app.scss')
    .pipe($.sass({
      includePaths: paths.sass,
      outputStyle: (isProduction ? 'compressed' : 'nested'),
      errLogToConsole: true
    }))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie 10']
    }))
    .pipe(gulp.dest('./build/assets/css/'))
  ;
});


// Compiles and copies the Foundation for Apps JavaScript, as well as your app's custom JS
gulp.task('uglify', ['uglify:foundation', 'uglify:app'])

gulp.task('uglify:foundation', function(cb) {
  var uglify = $.if(isProduction, $.uglify()
    .on('error', function (e) {
      console.log(e);
    }));

  return gulp.src(paths.foundationJS)
    .pipe(uglify)
    .pipe($.concat('foundation.js'))
    .pipe(gulp.dest('./build/assets/js/'))
  ;
});

gulp.task('uglify:app', function() {
  var uglify = $.if(isProduction, $.uglify()
    .on('error', function (e) {
      console.log(e);
    }));

  return gulp.src(paths.appJS)
    .pipe(uglify)
    .pipe($.concat('app.js'))
    .pipe(gulp.dest('./build/assets/js/'))
  ;
});

// Starts a test server, which you can view at http://localhost:8080
gulp.task('server', ['build'], function() {
  gulp.src('./build')
    .pipe($.webserver({
      port: 8080,
      host: '10.0.2.15',
      fallback: 'index.html',
      livereload: true,
      open: true
    }))
  ;
});

// Builds your entire app once, without starting a server
gulp.task('build', function(cb) {
  sequence('clean', [
    'copy',
    'copy:foundation',
    'copy:leaflet',
    'copy:angular-leaflet-directive',
    'copy:underscore',
    'sass',
    'uglify'], 'copy:templates', cb);
});

// Default task: builds your app, starts a server, and recompiles assets when they change
gulp.task('default', ['server'], function () {
  // Watch Gulpfile
  gulp.watch(['./gulpfile.js'], ['build']);

  // Watch Sass
  gulp.watch(['./client/assets/scss/**/*', './scss/**/*'], ['sass']);

  // Watch JavaScript
  gulp.watch(['./client/assets/js/**/*', './js/**/*'], ['uglify:app']);

  // Watch static files
  gulp.watch(['./client/**/*.*', '!./client/templates/**/*.*', '!./client/assets/{scss,js}/**/*.*'], ['copy']);

  // Watch app templates
  gulp.watch(['./client/templates/**/*.html'], ['copy:templates']);
});
