angular
  .module('application.articlesController', ['truncate'])
  .controller(
    "articlesController",
    ['$scope', '$timeout', '$http', '$rootScope', 'articlesService', '$filter',
    function ($scope, $timeout, $http, $rootScope, articlesService, $filter) {
      $scope.greeting = 'Hello World!';

      $scope.moveMap = function(coords) {
        $rootScope.$broadcast('moveToMarkerEvent', coords);
      };

      $scope.articles = articlesService.getArticlesData();

      _.each($scope.articles, function(item) {
        item.toggleLongText = true;
        item.textDisplayed = $filter('characters')($filter('words')(item.text, 50), 200);
      });

      $scope.toggleLongText = function(article) {
        if(article.toggleLongText) {
          article.textDisplayed = article.text;
          article.toggleLongText = false;
        }
      };
    }]
  );
