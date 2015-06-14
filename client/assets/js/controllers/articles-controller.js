angular
  .module('application.articlesController', ['truncate'])
  .controller(
    "articlesController",
    ['$scope', '$timeout', '$http', '$rootScope', 'articlesService', '$filter', '$element',
    function ($scope, $timeout, $http, $rootScope, articlesService, $filter, $element) {
      $scope.greeting = 'Hello World!';

      $scope.moveMap = function(coords) {
        $rootScope.$broadcast('moveToMarkerEvent', coords);
      };

      $scope.articles = articlesService.getArticlesData();

      _.each($scope.articles, function(item) {
        item.toggleLongText = true;
        item.textDisplayed = $filter('characters')($filter('words')(item.text, 50), 200);
        if(item.textDisplayed.length == item.text.length) {
          item.toggleLongText = false;
        }
      });

      $scope.toggleLongText = function(article) {
        if(article.toggleLongText) {
          article.textDisplayed = article.text;
          article.toggleLongText = false;
        }
      };

      $scope.gallery = {
        index: 0,
        currentImage: {
          src: _.first($scope.articles).images[0].src
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
