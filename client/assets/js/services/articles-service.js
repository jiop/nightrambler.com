angular
  .module('application.articlesService', [])
  .service(
    "articlesService",
    ["$timeout",
    function ($timeout) {

      var articlesData = []; //[
      //   {
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

      // Getter pour la variable userData
      this.getArticlesData = function() {
        return articlesData;
      };
    }]
  );
