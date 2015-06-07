(function() {
  'use strict';
  angular
    .module('application', [
      'ui.router',
      'ngAnimate',
      'foundation',
      'foundation.dynamicRouting',
      'foundation.dynamicRouting.animations',
      'uiGmapgoogle-maps',
      'application.appController',
      'application.articlesController',
      'application.bigmapController',
      'application.mapController',
      // 'application.articlesService'
    ])
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
