angular
  .module('application.mapController', [])
  .controller(
    "mapController",
    ['$scope', '$timeout', 'uiGmapLogger', '$http','uiGmapGoogleMapApi', '$state',
    function ($scope, $timeout, $log, $http, uiGmapGoogleMapApi, $state) {

      uiGmapGoogleMapApi.then(function(maps) {
        $scope.myGoogleMap = {};
        $scope.map = {
          markers: [],
          options: {
            disableDefaultUI: true
          },
          events: {
            tilesloaded: function (map) {
              $scope.$apply(function () {
                $scope.mapInstance = map;
                google.maps.event.trigger(map, 'resize');
              });
            }
          },
          center: {
            latitude: 48.923056,
            longitude: 2.255036
          },
          zoom: 17
        };
      });

      $timeout(function() {
        $scope.myGoogleMap.refresh()
      }, 0);

      $scope.$on('moveMapEvent', function(event, args) {
        $scope.map.center = {
          latitude : args.latitude,
          longitude : args.longitude
        };
        $scope.map.zoom = args.zoom;
      });
    }]
  );
