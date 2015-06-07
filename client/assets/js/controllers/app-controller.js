angular
  .module('application.appController', [])
  .controller(
    "appController",
    ['$scope',
    function ($scope) {
      $scope.applicationTitle = "TOTO";
    }]
  );
