angular
  .module('application.articlesController', [])
  .controller(
    "articlesController",
    ['$scope', '$timeout', 'uiGmapLogger', '$http', '$rootScope', 'articlesService',
    function ($scope, $timeout, $log, $http, $rootScope, articlesService) {
      $scope.greeting = 'Hello World!';

      $scope.moveMap = function(coords) {
        $rootScope.$broadcast('moveToMarkerEvent', coords);
      };

      $scope.articles = articlesService.getArticlesData();
    }]
  );
