angular
  .module('application.articlesController', ['truncate'])
  .controller(
    "articlesController",
    ['$scope', '$timeout', '$http', '$rootScope', 'articlesService', '$filter', '$element', 'Post',
    function ($scope, $timeout, $http, $rootScope, articlesService, $filter, $element, Post) {
      $scope.greeting = 'Hello World!';

      $scope.moveMap = function(coords) {
        $rootScope.$broadcast('moveToMarkerEvent', coords);
      };

      $scope.articles = Post.query();
      $scope.articles.$promise.then(function (result) {
        $scope.articles = result.posts;
        _.each($scope.articles, function(item) {
          item.toggleLongText = true;
          item.textDisplayed = $filter('characters')($filter('words')(item.body, 50), 200);
          if(item.textDisplayed.length == item.body.length) {
            item.toggleLongText = false;
          }
        });
        $scope.gallery = { index: 0, currentImage: {} };

        var firstArticle = _.first($scope.articles);
        if(firstArticle !== undefined && firstArticle.images.length > 0) {
          $scope.gallery.currentImage = { src: firstArticle.images[0].src };
        }
        // $scope.gallery.currentImage = { src: "_.first($scope.articles).images[0].src" };
      });

      $scope.toggleLongText = function(article) {
        if(article.toggleLongText) {
          article.textDisplayed = article.body;
          article.toggleLongText = false;
        }
      };

      $scope.galleryPrev = function(article) {
        $timeout(function() {
          var i = ($scope.gallery.index - 1) % article.images.length;
          if(i < 0) { i = 0; }
          $scope.gallery.index = i;
          $scope.gallery.currentImage.src = article.images[$scope.gallery.index].src;
        });
      };

      $scope.galleryNext = function(article) {
        $timeout(function() {
          $scope.gallery.index = ($scope.gallery.index + 1) % article.images.length;
          $scope.gallery.currentImage.src = article.images[$scope.gallery.index].src;
        });
      };
    }]
  );
