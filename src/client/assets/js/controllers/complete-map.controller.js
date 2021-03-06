angular
  .module('app.completeMapController', [])
  .controller(
    'completeMapController',
    ['$scope', '$timeout', '$http', '$rootScope', 'leafletData', '_', 'Post',
    function($scope, $timeout, $http, $rootScope, leafletData, _, Post) {
      //jscs:disable maximumLineLength
      var mapboxApiKey = 'pk.eyJ1IjoiamlvcCIsImEiOiIwZmYzMzFjNzFiNDZjMGQ4ZTlkMmJjZjQ3OTRmMGE3OSJ9.v8e-WIk9ftWhIpfXzrpgbQ';
      var agisUrl = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      var mapboxPirateUrl = 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}';
      //jscs:enable maximumLineLength

      angular.extend($scope, {
        controls: {
          scale: true
        },
        center: {
          lat: 51.505,
          lng: -0.09,
          zoom: 15
        },
        defaults: {
          zoomControl: false,
          // doubleClickZoom: false,
          // scrollWheelZoom: false,
          tileLayerOptions: {
            opacity: 0.9,
            detectRetina: true,
            reuseTiles: true,
          },
        },
        markers: [],
        layers: {
          baselayers: {
            mapboxPirate: {
              name: 'Mapbox Pirates',
              url: mapboxPirateUrl,
              type: 'xyz',
              layerOptions: {
                apikey: mapboxApiKey,
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
              url: agisUrl,
              type: 'xyz'
            }
          },
          // overlays: {
          //   wms: {
          //     name: 'EEUU States (WMS)',
          //     type: 'wms',
          //     visible: true,
          //     url: 'http://suite.opengeo.org/geoserver/usa/wms',
          //     layerParams: {
          //       layers: 'usa:states',
          //       format: 'image/png',
          //       transparent: true
          //     }
          //   }
          // }
        }
      });

      $scope.articles = Post.query();
      $scope.articles.$promise.then(function(result) {
        leafletData.getMap().then(function(map) {
          // var bounds = L.latLngBounds([0,0]);
          // draw markers
          _.each(result.posts, function(value, key, list) {
            var point = L.latLng(
              value.coords.latitude,
              value.coords.longitude);
            $scope.markers.push(point);
            // bounds.extend(point);
          });
          // bounds = bounds.pad(-0.2);
          // map.fitBounds(bounds);
        });
      });

      leafletData.getMap().then(function(map) {
        $timeout(function() { map.invalidateSize(); }, 0);
      });

      $rootScope.$on(
        '$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams) {
          if (toState.name === 'map') {
            leafletData.getMap().then(function(map) {
              $timeout(function() { map.invalidateSize(); }, 0);
            });
          }
        }
      );
    }]
  );
