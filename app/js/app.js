'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'firebase'
//  'angularPayments'
]).
config(['$routeProvider', function($routeProvider/*, $window*/) {
//    $window.Stripe.setPublishableKey('pk_test_aj305u5jk2uN1hrDQWdH0eyl'); // use test key from previous project!
    $routeProvider.when('/', {templateUrl: 'partials/landing_page.html', controller: 'LandingPageController'
          });
          $routeProvider.when('/waitlist', {templateUrl: 'partials/waitlist.html', controller: 'WaitListController'
          });
          $routeProvider.when('/register', {templateUrl: 'partials/register.html', controller: 'AuthController'
          });
          $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'AuthController'
          });
          $routeProvider.when('/eat', {templateUrl: 'partials/eat.html', controller: 'EatController'
          });
          $routeProvider.when('/analytics', {templateUrl: 'partials/analytics.html', controller: 'DataController'
          });
          $routeProvider.otherwise({redirectTo: '/'});
}]);



