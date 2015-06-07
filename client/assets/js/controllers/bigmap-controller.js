angular
  .module('application.bigmapController', [])
  .controller(
    "bigmapController",
    ['$scope', '$timeout', 'uiGmapLogger', '$http','uiGmapGoogleMapApi', '$state', 'articlesService'
    function ($scope, $timeout, $log, $http, uiGmapGoogleMapApi, $state, articlesService) {

      uiGmapGoogleMapApi.then(function(maps) {
        $scope.myGoogleMap = {};

        $scope.markers = articlesService.getArticlesData();
        // $scope.markers: [
        //   {
        //     id: 0,
        //     coords: {
        //       latitude: 48.9229643,
        //       longitude: 2.2550196,
        //       zoom: 17
        //     },
        //     title: "Colombes",
        //     text:
        //       "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod \
        //       tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, \
        //       quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo \
        //       consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse \
        //       cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non \
        //       proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        //   },
        //   {
        //     id: 1,
        //     coords: {
        //       latitude: 48.9778247,
        //       longitude: 2.1914688,
        //       zoom: 15
        //     },
        //     title: "Cormeilles",
        //     text:
        //       "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod \
        //       tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, \
        //       quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo \
        //       consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse \
        //       cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non \
        //       proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        //   },
        //   {
        //     id: 2,
        //     coords: {
        //       latitude: -37.8602828,
        //       longitude: 145.079616,
        //       zoom: 10
        //     },
        //     title: "Melbourne",
        //     text:
        //       "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod \
        //       tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, \
        //       quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo \
        //       consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse \
        //       cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non \
        //       proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        //   }
        // ];

        $scope.map = {
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

        for(i = $scope.map.markers.length - 1; i > 0; i--) {
          if($scope.map.markers[i].coords !== undefined){
            $scope.polylines[0].path.push($scope.map.markers[i].coords);
          }
        }

        $timeout(function() {
          $scope.myGoogleMap.refresh()
        }, 0);
      });
    }]
  );
