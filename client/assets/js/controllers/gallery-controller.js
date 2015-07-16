angular
  .module('application.galleryController', [])
  .controller(
    'galleryController',
    ['$scope',
    function($scope) {
      $scope.slides = _.map($scope.article.images, function(item) {
        return {image: item.src, description: 'Image 00'};
      });

      $scope.direction = 'left';
      $scope.currentIndex = 0;

      $scope.setCurrentSlideIndex = function(index) {
        $scope.direction = (index > $scope.currentIndex) ? 'left' : 'right';
        $scope.currentIndex = index;
      };

      $scope.isCurrentSlideIndex = function(index) {
        return $scope.currentIndex === index;
      };

      $scope.prevSlide = function() {
        $scope.direction = 'left';
        if ($scope.currentIndex < $scope.slides.length - 1) {
          $scope.currentIndex = ++$scope.currentIndex;
        } else {
          $scope.currentIndex = 0;
        }
      };

      $scope.nextSlide = function() {
        $scope.direction = 'right';
        if ($scope.currentIndex < $scope.slides.length - 1) {
          $scope.currentIndex = --$scope.currentIndex;
        } else {
          $scope.currentIndex = $scope.slides.length - 1;
        }
      };
    }]);
