angular
  .module('application.bigmapController', [])
  .controller(
    "bigmapController",
    ['$scope', '$timeout', 'uiGmapLogger', '$http','uiGmapGoogleMapApi', '$state', 'articlesService',
    function ($scope, $timeout, $log, $http, uiGmapGoogleMapApi, $state, articlesService) {

      uiGmapGoogleMapApi.then(function(maps) {
        $scope.myGoogleMap = {};

        $scope.markers = articlesService.getArticlesData();

        $scope.map = {
          markers: [],
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
            latitude: 20,
            longitude: 0
          },
          zoom: 2
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

        for(i = $scope.markers.length - 1; i > 0; i--) {
          if($scope.markers[i].coords !== undefined){
            $scope.polylines[0].path.push($scope.markers[i].coords);
          }
        }

        $timeout(function() {
          $scope.myGoogleMap.refresh()
        }, 0);
      });
    }]
  );
