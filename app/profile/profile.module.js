angular.module('profile', ['ngMessages', 'ngRoute', 'mgcrea.ngStrap'])
  .config(function($routeProvider, $authProvider) {
    $routeProvider
      .when('/profile', {
        templateUrl: 'profile/views/profile.html',
        controller: 'ProfileController',
        resolve: {
          authenticated: function($q, $location, $auth) {
            var deferred = $q.defer();

            if (!$auth.isAuthenticated()) {
              $location.path('/login');
            } else {
              deferred.resolve();
            }

            return deferred.promise;
          }
        }
      });

  });
