angular
  .module('app.articlesController', ['truncate'])
  .controller(
    'articlesController',
    ['$scope', '$timeout', '$http', '$rootScope', '$filter', '$element', 'Post',
    function($scope, $timeout, $http, $rootScope, $filter, $element, Post) {
      $scope.greeting = 'Hello World!';

      $scope.moveMap = function(coords) {
        $rootScope.$broadcast('moveToMarkerEvent', coords);
      };

      $scope.articles = Post.query();
      $scope.articles.$promise.then(function(result) {
        $scope.articles = result.posts;
        _.each($scope.articles, function(item) {
          item.toggleLongText = true;
          item.textDisplayed = $filter('characters')(
            $filter('words')(item.body, 50),
            200);
          if (item.textDisplayed.length == item.body.length) {
            item.toggleLongText = false;
          }
        });
        $scope.gallery = {index: 0, currentImage: {}};

        var firstArticle = _.first($scope.articles);
        if (firstArticle !== undefined && firstArticle.images.length > 0) {
          $scope.gallery.currentImage = {src: firstArticle.images[0].src};
        }
      });

      $scope.toggleLongText = function(article) {
        if (article.toggleLongText) {
          article.textDisplayed = article.body;
          article.toggleLongText = false;
        }
      };
    }]
  );
