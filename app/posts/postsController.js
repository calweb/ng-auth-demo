(function () {
    "use strict";

    angular
        .module('posts')
        .controller('postsController', ['postsService', '$location', '$routeParams', '$auth',
        function(postsService, $location, $routeParams, $auth) {
            var postsCtl = this;
            postsCtl.isAuthenticated = function () {
              return $auth.isAuthenticated();
            }
            postsService.getPosts().success(function (posts) {
                postsCtl.posts = posts;
            });

            postsService.getPost($routeParams.postId).success(function (post) {
                postsCtl.post = post;
            });

            postsCtl.createPost = function (newPost) {
                postsService.createPost(newPost);
                $location.path('/posts');
            };

            postsCtl.editPost = function (post) {
                postsService.editPost(post);
                $location.path('/posts');
            };

            postsCtl.deletePost = function (id) {
                postsService.deletePost(id);
                $location.path('/posts');
            }


        }]);
})();
