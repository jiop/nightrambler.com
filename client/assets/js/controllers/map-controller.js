angular
  .module('application.mapController', [])
  .controller(
    "mapController",
    ['$scope', '$timeout', 'uiGmapLogger', '$http','uiGmapGoogleMapApi', '$state', 'articlesService', '$rootScope',
    function ($scope, $timeout, $log, $http, uiGmapGoogleMapApi, $state, articlesService, $rootScope) {
      uiGmapGoogleMapApi.then(function(maps) {

        $scope.map = {
          control: {},
          markers: articlesService.getArticlesData(),
          options: {
            streetViewControl: false,
            panControl: false,
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
          center: angular.copy(articlesService.getLastArticle().coords),
          zoom: angular.copy(articlesService.getLastArticle().coords.zoom)
        };

        $scope.polyline = {
          id: 1,
          path: [],
          stroke: {
            color: '#000',
            weight: 3
          },
          editable: false,
          draggable: false,
          geodesic: true,
          visible: true,
          icons: [{
            icon: {
              path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW
            },
            offset: '25px',
            repeat: '50px'
          }]
        };

        for(var i = 0; i < $scope.map.markers.length; i++) {
          if($scope.map.markers[i].coords !== undefined){
            $scope.polyline.path.push(angular.copy($scope.map.markers[i].coords));
          }
        }

        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
          if(toState.name == 'home') {
            $scope.map.center = angular.copy(articlesService.getLastArticle().coords);
          }
        });

        $scope.$on('moveToMarkerEvent', function(event, marker) {
          $scope.map.center = {
            latitude : angular.copy(marker.latitude),
            longitude : angular.copy(marker.longitude)
          };
          $scope.map.zoom = angular.copy(marker.zoom);
        });
      });

      $timeout(function() {
        $scope.map.control.refresh(angular.copy(articlesService.getLastArticle().coords));
      }, 0);

    }]
  );
