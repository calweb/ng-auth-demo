(function () {
    "use strict";

    angular
        .module('posts')
        .factory('postsService', ['$http', '$rootScope', function ($http, $rootScope) {

            // public service methods
            return {
                getPosts: getPosts,
                getPost: getPost,
                createPost: createPost,
                editPost: editPost,
                deletePost: deletePost
            };

            function getPosts() {

                return $http.get("api/collections/demotiy");
            }

            function getPost(postId) {
                return $http.get("api/collections/demotiy/" + postId);
            }

            function createPost(newPost) {
                $http.post("api/collections/demotiy", newPost).then(function (res) {
                    $rootScope.$broadcast("post:added");
                });
            }

            function editPost(post) {
                $http.put("api/collections/demotiy/" + post._id, post).then(function (res) {
                    $rootScope.$broadcast("post:updated");
                });

            }

            function deletePost(postId) {
                $http.delete("api/collections/demotiy/" + postId).then(function (res) {
                    $rootScope.$broadcast("post:deleted");
                });
            }



        }]);
})();