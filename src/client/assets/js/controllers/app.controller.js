angular
  .module('app.appController', [])
  .controller(
    'appController',
    ['$scope',
    function($scope) {
      $scope.applicationTitle = 'Night Rambler';
    }]
  );
