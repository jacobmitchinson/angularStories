fashionApp.controller('homepageController', function($scope, $http) {
  $http.get('clothes/fullClothesList.json').success(function(data) {
    $scope.clothes = data;
  });

  $scope.basket = [];

  $scope.add = function(item) { 
    $scope.basket.push(item);
  };

  $scope.remove = function(item) { 
    $scope.basket.pop(item);
  };

  $scope.total = function() { 
    var total = 0;
    for(var i = 0; i < $scope.basket.length; i++) { 
      total += $scope.basket[i].price;
    };
    return total;
  };
});