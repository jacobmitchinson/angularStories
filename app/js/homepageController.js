fashionApp.controller('homepageController', function($scope, $http) {
  $http.get('clothes/fullClothesList.json').success(function(data) {
    $scope.clothes = data;
  });

  $scope.basket = [];

  $scope.add = function(item) { 
    $scope.basket.push(item);
  };

});