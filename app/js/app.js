var fashionApp = angular.module('fashionApp', [
  'ngResource',
  'ngRoute'
]);

fashionApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/shop', {
        templateUrl: 'partials/shop.html'
      }).
      when('/checkout', {
        templateUrl: 'partials/checkout.html'
      }).
      otherwise({
        redirectTo: '/shop'
      });
  }]);
