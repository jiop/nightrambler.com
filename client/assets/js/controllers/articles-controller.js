angular
  .module('application.articlesController', [])
  .controller(
    "articlesController",
    ['$scope', '$timeout', '$http', '$rootScope', 'articlesService',
    function ($scope, $timeout, $http, $rootScope, articlesService) {
      $scope.greeting = 'Hello World!';

      $scope.moveMap = function(coords) {
        $rootScope.$broadcast('moveToMarkerEvent', coords);
      };

      $scope.articles = articlesService.getArticlesData();
    }]
  );
