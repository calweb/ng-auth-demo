(function () {
    "use strict";

    angular
        .module('posts', [
            "ngRoute"
        ])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/posts', {
                    templateUrl: 'posts/views/list.html',
                    controller: 'postsController as postsCtl'
                })
                .when('/posts/new', {
                    templateUrl: 'posts/views/create.html',
                    controller: 'postsController as postsCtl'
                })
                .when('/posts/:postId', {
                    templateUrl: 'posts/views/show.html',
                    controller: 'postsController as postsCtl'
                })
                .when('/posts/:postId/edit', {
                    templateUrl: 'posts/views/edit.html',
                    controller: 'postsController as postsCtl'
                });
        });

})();
