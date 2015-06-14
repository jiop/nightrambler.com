angular
  .module('application.articlesService', [])
  .service(
    "articlesService",
    ["$timeout",
    function ($timeout) {

      var articlesData = [
        {
          id: 1,
          date: new Date(2015, 6, 8, 22, 0),
          coords: {
            latitude: 48.9229643,
            longitude: 2.2550196,
            zoom: 17
          },
          title: "Colombes",
          text:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod" +
            "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam," +
            "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo" +
            "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse" +
            "cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non" +
            "proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          images: [
            {
              id: 1,
              src: "http://lorempixel.com/500/400",
              srcMin: "http://lorempixel.com/100/100"
            },
            {
              id: 2,
              src: "http://lorempixel.com/500/400",
              srcMin: "http://lorempixel.com/100/100"
            },
          ]
        },
        {
          id: 2,
          date: new Date(2015, 6, 10, 22, 0),
          coords: {
            latitude: 48.9778247,
            longitude: 2.1914688,
            zoom: 15
          },
          title: "Cormeilles",
          text:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod" +
            "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam," +
            "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo" +
            "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse" +
            "cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non" +
            "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam," +
            "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo" +
            "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse" +
            "cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non" +
            "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam," +
            "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo" +
            "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse" +
            "cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non" +
            "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam," +
            "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo" +
            "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse" +
            "cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non" +
            "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam," +
            "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo" +
            "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse" +
            "cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non" +
            "proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          images: [
            {
              id: 3,
              src: "http://lorempixel.com/500/200",
              srcMin: "http://lorempixel.com/100/100"
            },
            {
              id: 4,
              src: "http://lorempixel.com/500/300",
              srcMin: "http://lorempixel.com/100/100"
            },
            {
              id: 5,
              src: "http://lorempixel.com/500/450",
              srcMin: "http://lorempixel.com/100/100"
            },
            {
              id: 6,
              src: "http://lorempixel.com/600/400",
              srcMin: "http://lorempixel.com/100/100"
            },
            {
              id: 7,
              src: "http://instagram.com/p/36LANjivQh/media/?size=l",
              srcMin: "http://instagram.com/p/36LANjivQh/media/?size=t"
            }
          ]
        },
        {
          id: 3,
          date: new Date(2015, 6, 13, 22, 0),
          coords: {
            latitude: 43.7884,
            longitude: 5.0383,
            zoom: 15
          },
          title: "Orgon",
          text:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod" +
            "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam," +
            "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo" +
            "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse" +
            "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam," +
            "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo" +
            "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse" +
            "cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non" +
            "cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non" +
            "proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          images: [
            {
              id: 8,
              src: "http://lorempixel.com/500/400",
              srcMin: "http://lorempixel.com/100/100"
            },
            {
              id: 9,
              src: "http://lorempixel.com/500/400",
              srcMin: "http://lorempixel.com/100/100"
            },
            {
              id: 10,
              src: "http://lorempixel.com/500/400",
              srcMin: "http://lorempixel.com/100/100"
            },
            {
              id: 11,
              src: "http://lorempixel.com/500/400",
              srcMin: "http://lorempixel.com/100/100"
            },
            {
              id: 12,
              src: "http://lorempixel.com/500/400",
              srcMin: "http://lorempixel.com/100/100"
            },
            {
              id: 13,
              src: "http://lorempixel.com/500/400",
              srcMin: "http://lorempixel.com/100/100"
            }
          ]
        },
        {
          id: 4,
          date: new Date(2015, 8, 19, 22, 0),
          coords: {
            latitude: -37.8602828,
            longitude: 145.079616,
            zoom: 10
          },
          title: "Melbourne",
          text:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod" +
            "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam," +
            "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo" +
            "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse" +
            "cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non" +
            "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam," +
            "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo" +
            "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse" +
            "cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non" +
            "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam," +
            "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo" +
            "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse" +
            "cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non" +
            "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam," +
            "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo" +
            "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse" +
            "cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non" +
            "proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          images: [
            {
              id: 14,
              src: "http://lorempixel.com/500/400",
              srcMin: "http://lorempixel.com/100/100"
            },

          ]
        },
        {
          id: 5,
          date: new Date(2015, 9, 19, 22, 0),
          coords: {
            latitude: -31.9527121,
            longitude: 115.8604796,
            zoom: 10
          },
          title: "Perth",
          text: "",
          images: [
            {
              id: 17,
              src: "http://instagram.com/p/36LANjivQh/media/?size=l",
              srcMin: "http://instagram.com/p/36LANjivQh/media/?size=t"
            },

            {
              id: 15,
              src: "http://lorempixel.com/400/400",
              srcMin: "http://lorempixel.com/100/100"
            },
            {
              id: 16,
              src: "http://lorempixel.com/300/400",
              srcMin: "http://lorempixel.com/100/100"
            },
          ]
        }
      ];

      // Getter pour la variable userData
      this.getArticlesData = function() {
        return articlesData.sort(function(a,b){ return b.date - a.date; });
        // return articlesData;
      };

      this.getArticlesData2 = function(cb) {
        cb(articlesData.sort(function(a,b){ return b.date - a.date; }));
      };

      this.getLastArticle = function() {
        return articlesData.sort(function(a,b){ return b.date - a.date; })[0];
      };
    }]
  );
