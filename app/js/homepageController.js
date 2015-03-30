fashionApp.controller('homepageController', function($scope, $http) {
  $http.get('clothes/fullClothesList.json').success(function(data) {
    $scope.clothes = data;
  });

  $http.get('clothes/vouchers.json').success(function(data) {
    $scope.vouchers = data;
  });

  $scope.basket = [];
  $scope.total = 0;

  $scope.add = function(item) { 
    $scope.basket.push(item);
  };

  $scope.remove = function(item) { 
    $scope.basket.pop(item);
  };

  $scope.calculateTotal = function() { 
    $scope.total = 0;
    for(var i = 0; i < $scope.basket.length; i++) { 
      $scope.total += $scope.basket[i].price;
    };
    return $scope.total;
  };

  $scope.applyVoucher = function(voucher) { 
    for(var i = 0; i < $scope.vouchers.length; i++) { 
      if($scope._checkVoucherName($scope.vouchers[i], voucher)) { 
        if($scope._checkPriceConditions($scope.vouchers[i])) { 
          $scope.total = $scope.calculateTotal() - $scope.vouchers[i].price;
        };
      }
    };
  };

  $scope._checkVoucherName = function(voucher, wantedVoucher) { 
    if(voucher.name === wantedVoucher) { 
      return true;
    }
  };

  $scope._checkPriceConditions = function(voucher) { 
    if($scope.calculateTotal() > voucher.totalReq) { 
      return true;
    }
  };

  // $scope._checkOtherConditions = function(voucher) { 

  // }
});