(function() {
  'use strict';
  angular
    .module('app', [
      'ngResource',
      'ui.router',
      'ngAnimate',
      'foundation',
      'leaflet-directive',
      // 'app.core',
      'app.postsService',
      'app.appController',
      'app.articlesController',
      'app.homeMapController',
      'app.completeMapController',
      'app.galleryController'
    ])
    .constant('_', window._)
    .config(config)
    .run(run)
  ;

  config.$inject = ['$stateProvider', '$urlRouterProvider'];
  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('map', {
        url: '/map',
        templateUrl: 'src/client/templates/map.html'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'src/client/templates/about.html',
      })
      .state('home', {
        url: '/',
        templateUrl: 'src/client/templates/home.html'
      });
  }

  function run() {
    FastClick.attach(document.body);
  }
})();
