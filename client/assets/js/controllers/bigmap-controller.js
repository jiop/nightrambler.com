angular
  .module('application.bigmapController', [])
  .controller(
    "bigmapController",
    ['$scope', '$timeout', 'uiGmapLogger', '$http','uiGmapGoogleMapApi', '$state',
    function ($scope, $timeout, $log, $http, uiGmapGoogleMapApi, $state) {
      var createRandomMarker = function(i, idKey) {
        if (idKey == null) {
          idKey = "id";
        }

        var latitude = Math.random();
        var longitude = Math.random();
        var ret = {
          latitude: latitude,
          longitude: longitude,
          title: 'm' + i
        };
        ret[idKey] = i;
        return ret;
      };

      uiGmapGoogleMapApi.then(function(maps) {
        $scope.myGoogleMap = {};
        $scope.map = {
          markers: [
            {
              id: 1,
              latitude: 48.9229643,
              longitude: 2.2550196,
              zoom: 17
            },
            {
              id: 4,
              latitude: 44.9259673,
              longitude: 2.2550596,
              zoom: 17
            },
            {
              id: 2,
              latitude: 42.9259673,
              longitude: 2.2530596,
              zoom: 17
            },
            {
              id: 3,
              latitude: 49.9299673,
              longitude: 2.2550596,
              zoom: 17
            }
          ],
          options : {
            disableDefaultUI: false
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
            latitude: 48.9229653,
            longitude: 2.2550196
          },
          zoom: 1
        };

        $scope.markers3 = [];
        var markers = [];
        for (var i = 0; i < 50; i++) {
          markers.push(createRandomMarker(i));
        }
        $scope.markers3 = markers;

        $timeout(function() {
          $scope.myGoogleMap.refresh()
        }, 0);
      });
    }]
  );
