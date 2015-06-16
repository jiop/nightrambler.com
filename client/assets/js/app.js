(function() {
  'use strict';
  angular
    .module('application', [
      'ui.router',
      'ngAnimate',
      'foundation',
      'foundation.dynamicRouting',
      'foundation.dynamicRouting.animations',
      'leaflet-directive',

      'application.articlesService',

      'application.appController',
      'application.articlesController',
      'application.homeMapController',
      'application.completeMapController',
      'application.galleryController'
    ])
    .constant('_', window._)
    .config(config)
    .run(run)
  ;

  config.$inject = ['$urlRouterProvider', '$locationProvider'];

  function config($urlProvider, $locationProvider) {
    $urlProvider.otherwise('/');
    $locationProvider.html5Mode({
      enabled: false,
      requireBase: false
    });
    $locationProvider.hashPrefix('!');
  }

  function run() {
    FastClick.attach(document.body);
  }
})();
