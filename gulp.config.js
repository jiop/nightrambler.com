module.exports = function() {
  var bwr = 'bower_components/';

  var config = {
    assets: [
      './client/**/*.*',
      '!./client/templates/**/*.*',
      '!./client/assets/{scss,js}/**/*.*'
    ],
    // Sass will check these folders for files when you use @import.
    sass: [
      'client/assets/scss',
      bwr + 'foundation-apps/scss'
    ],
    // These files include Foundation for Apps and its dependencies
    foundationJS: [
      bwr + 'fastclick/lib/fastclick.js',
      bwr + 'viewport-units-buggyfill/viewport-units-buggyfill.js',
      bwr + 'tether/tether.js',
      bwr + 'hammerjs/hammer.js',
      bwr + 'angular/angular.js',
      bwr + 'angular-animate/angular-animate.js',
      bwr + 'angular-ui-router/release/angular-ui-router.js',
      bwr + 'foundation-apps/js/vendor/**/*.js',
      bwr + 'foundation-apps/js/angular/**/*.js',
      '!bower_components/foundation-apps/js/angular/app.js'
    ],
    angularLeafletDirective: [
      bwr + 'angular-leaflet-directive/dist/angular-leaflet-directive.js'
    ],
    underscoreJS: [
      bwr + 'underscore/underscore.js'
    ],
    leafletJS: [
      bwr + 'leaflet/dist/leaflet.js'
    ],
    leafletCSS: [
      bwr + '/leaflet/dist/leaflet.css'
    ],
    angularTruncate2: [
      bwr + '/angular-truncate-2/src/truncate.js'
    ],
    angularResource: [
      bwr + 'angular-resource/angular-resource.js'
    ],
    appJS: [
      'client/assets/js/controllers/*',
      'client/assets/js/services/*',
      'client/assets/js/vendor/*',
      'client/assets/js/app.js'
    ]
  };

  return config;
};
