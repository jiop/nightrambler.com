angular
    .module('application.galleryController', []) //['ngAnimate', 'ngTouch']
    .controller(
        'galleryController',
        ["$scope",
        function ($scope) {
        $scope.slides = [
            {image: 'http://instagram.com/p/36LANjivQh/media/?size=l', description: 'Image 00'},
            {image: 'http://lorempixel.com/400/400', description: 'Image 01'},
            {image: 'http://instagram.com/p/36LANjivQh/media/?size=l', description: 'Image 02'},
            {image: 'http://lorempixel.com/600/400', description: 'Image 03'},
            {image: 'http://lorempixel.com/400/700', description: 'Image 04'}
        ];

        $scope.direction = 'left';
        $scope.currentIndex = 0;

        $scope.setCurrentSlideIndex = function (index) {
            $scope.direction = (index > $scope.currentIndex) ? 'left' : 'right';
            $scope.currentIndex = index;
        };

        $scope.isCurrentSlideIndex = function (index) {
            return $scope.currentIndex === index;
        };

        $scope.prevSlide = function () {
            $scope.direction = 'left';
            $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
        };

        $scope.nextSlide = function () {
            $scope.direction = 'right';
            $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
        };
    }])
    // .animation('.slide-animation', function () {
    //     return {
    //         beforeAddClass: function (element, className, done) {
    //             var scope = element.scope();

    //             if (className == 'ng-hide') {
    //                 var finishPoint = element.parent().width();
    //                 if(scope.direction !== 'right') {
    //                     finishPoint = -finishPoint;
    //                 }
    //                 TweenMax.to(element, 0.5, {left: finishPoint, onComplete: done });
    //             }
    //             else {
    //                 done();
    //             }
    //         },
    //         removeClass: function (element, className, done) {
    //             var scope = element.scope();

    //             if (className == 'ng-hide') {
    //                 element.removeClass('ng-hide');

    //                 var startPoint = element.parent().width();
    //                 if(scope.direction === 'right') {
    //                     startPoint = -startPoint;
    //                 }

    //                 TweenMax.fromTo(element, 0.5, { left: startPoint }, {left: 0, onComplete: done });
    //             }
    //             else {
    //                 done();
    //             }
    //         }
    //     };
    // })
;
