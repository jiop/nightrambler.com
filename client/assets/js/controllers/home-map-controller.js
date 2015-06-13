angular
  .module('application.homeMapController', [])
  .controller(
    "homeMapController",
    ['$scope', '$timeout', '$http', '$rootScope', 'leafletData', 'articlesService',
    function ($scope, $timeout, $http, $rootScope, leafletData, articlesService) {
      angular.extend($scope, {
        controls: {
          scale: true
        },
        center: {},
        defaults: {
          dragging: false,
          zoomControl: false,
          doubleClickZoom: false,
          scrollWheelZoom: false,
          tileLayerOptions: {
            opacity: 0.9,
            detectRetina: true,
            reuseTiles: true,
          },
        },
        markers: [],
        layers: {
          baselayers: {
            mapbox_pirate: {
              name: 'Mapbox Pirates',
              url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
              type: 'xyz',
              layerOptions: {
                apikey: 'pk.eyJ1IjoiamlvcCIsImEiOiIwZmYzMzFjNzFiNDZjMGQ4ZTlkMmJjZjQ3OTRmMGE3OSJ9.v8e-WIk9ftWhIpfXzrpgbQ',
                mapid: 'mapbox.pirates'
              }
            },
            osm: {
              name: 'OpenStreetMap',
              url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
              type: 'xyz'
            },
            agis: {
              name: 'ArcGIS',
              url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
              type: 'xyz'
            }
          }
        }
      });

      articlesService.getArticlesData2(function(articlesData){
        leafletData.getMap().then(function(map) {
          // center map
          var cntr = _.first(articlesData);
          $scope.center = {
            lat : cntr.coords.latitude,
            lng: cntr.coords.longitude,
            zoom: cntr.coords.zoom
          };

          // draw markers
          _.each(articlesData, function(value, key, list) {
            $scope.markers.push({ lat: value.coords.latitude, lng: value.coords.longitude});
          });
        });
      });

      leafletData.getMap().then(function(map) {
        $timeout(function() {
          map.invalidateSize();
        }, 0);
      });

      $scope.$on('moveToMarkerEvent', function(event, marker) {
        $scope.center = {
          lat : marker.latitude,
          lng : marker.longitude,
          zoom : marker.zoom
        };
      });

      $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        if(toState.name == 'home') {
          leafletData.getMap().then(function(map) {
            $timeout(function() {
              map.invalidateSize();
            }, 0);
          });
        }
      });
    }]
  );
