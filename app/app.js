angular.module('MyApp', [
  'ngMessages',
  'ngRoute',
  'mgcrea.ngStrap',
  'auth',
  'profile',
  'posts'])
  .config(function($routeProvider, $authProvider) {
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
      .when('/', {
        templateUrl: 'partials/home.html'
      })
      .when('/testAuth', {
        template: '<h1>You Made it!</h1>',
        resolve: {
          authenticated: checkAuth
        }
      });

  });
