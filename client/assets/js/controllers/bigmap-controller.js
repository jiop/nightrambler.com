angular
  .module('application.bigmapController', [])
  .controller(
    "bigmapController",
    ['$scope', '$timeout', 'uiGmapLogger', '$http','uiGmapGoogleMapApi', '$state', 'articlesService', '$rootScope',
    function ($scope, $timeout, $log, $http, uiGmapGoogleMapApi, $state, articlesService, $rootScope) {
      uiGmapGoogleMapApi.then(function(maps) {
        $scope.map = {
          options : {
            streetViewControl: false,
            panControl: false,
            disableDefaultUI: false,
            mapTypeId: google.maps.MapTypeId.TERRAIN
          },
          control: {},
          events: {
            tilesloaded: function (map) {
              $scope.$apply(function () {
                $scope.mapInstance = map;
                google.maps.event.trigger(map, 'resize');
              });
            }
          }
        };

        $scope.polylines = [
          {
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
          }
        ];

        articlesService.getArticlesData2(function(articlesData) {
          $scope.map.markers = angular.copy(articlesData);

          $scope.map.bounds = new google.maps.LatLngBounds();
          for(i = 0; i < $scope.map.markers.length; i++) {
            $scope.map.bounds.extend(new google.maps.LatLng(
              angular.copy($scope.map.markers[i].coords.latitude),
              angular.copy($scope.map.markers[i].coords.longitude)));
          }

          for(i = 0; i < $scope.map.markers.length; i++) {
            if($scope.map.markers[i].coords !== undefined){
              $scope.polylines[0].path.push(angular.copy($scope.map.markers[i].coords));
            }
          }

          $scope.map.center = angular.copy(articlesService.getLastArticle().coords);
          $scope.map.zoom = angular.copy(articlesService.getLastArticle().coords.zoom);

          $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            if(toState.name == 'map') {
              $scope.map.bounds = new google.maps.LatLngBounds();
              for(i = 0; i < $scope.map.markers.length; i++) {
                $scope.map.bounds.extend(new google.maps.LatLng(
                  angular.copy($scope.map.markers[i].coords.latitude),
                  angular.copy($scope.map.markers[i].coords.longitude)));
              }

              $scope.map.control.getGMap().fitBounds(angular.copy($scope.map.bounds));
              // $scope.map.control.refresh();
            }
          });

          $timeout(function() {
            $scope.map.control.getGMap().fitBounds(angular.copy($scope.map.bounds));
          }, 0);
        });

        // $timeout(function() {
          // $scope.map.bounds = new google.maps.LatLngBounds();
          // for(i = 0; i < $scope.map.markers.length; i++) {
          //   $scope.map.bounds.extend(new google.maps.LatLng(
          //     angular.copy($scope.map.markers[i].coords.latitude),
          //     angular.copy($scope.map.markers[i].coords.longitude)));
          // }
          // $scope.map.control.getGMap().fitBounds(angular.copy($scope.map.bounds));

          // var bounds = new google.maps.LatLngBounds();
          // // for(i = $scope.map.markers.length - 1; i > 0; i--) {
          // for(i = 0; i < $scope.map.markers.length; i++) {
          //   bounds.extend(new google.maps.LatLng(
          //     angular.copy($scope.map.markers[i].coords.latitude),
          //     angular.copy($scope.map.markers[i].coords.longitude)));
          // }
          // $scope.map.control.getGMap().fitBounds(angular.copy(bounds));

          // $scope.map.control.refresh();
        // }, 0);

      });
    }]
  );
