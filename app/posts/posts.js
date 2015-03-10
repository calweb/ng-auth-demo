(function () {
    "use strict";

    angular
        .module('posts', [
            "ngRoute"

        ])
        .config(function ($routeProvider) {
          var checkAuth = function ($q, $location, $auth) {
            var dfd = $q.defer();
            if(!$auth.isAuthenticated()) {
              $location.path('/login');
            } else {
              dfd.resolve();
            }
            return dfd.promise;
          };
            $routeProvider
                .when('/posts', {
                    templateUrl: 'posts/views/list.html',
                    controller: 'postsController as postsCtl'
                })
                .when('/posts/new', {
                    templateUrl: 'posts/views/create.html',
                    controller: 'postsController as postsCtl',
                    resolve: {
                      authenticated: checkAuth
                    }
                })
                .when('/posts/:postId', {
                    templateUrl: 'posts/views/show.html',
                    controller: 'postsController as postsCtl'
                })
                .when('/posts/:postId/edit', {
                    templateUrl: 'posts/views/edit.html',
                    controller: 'postsController as postsCtl',
                    resolve: {
                      authenticated: checkAuth
                    }
                });
        });

})();
