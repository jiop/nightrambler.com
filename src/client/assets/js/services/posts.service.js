angular.module('app.postsService', ['ngResource'])
  .factory('Post', ['$resource',
    function($resource) {
      return $resource(
        'http://192.168.50.4:8089/posts/:postId',
        {postId: '@id'},
        {'query':  {method:'GET', isArray:false}}
      );
    }
  ]);
