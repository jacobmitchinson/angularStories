fashionApp.controller('homepageController', function($scope, $http) {
  $http.get('clothes/fullClothesList.json').success(function(data) {
    $scope.clothes = data;
  });

  $http.get('clothes/vouchers.json').success(function(data) {
    $scope.vouchers = data;
  });

  $scope.basket = [];
  $scope.total = 0;
  $scope.voucher;
  $scope.message = "No voucher applied.";

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

  // this isn't working because you are adding iterating through all vouchers and not all vouchers equal your voucher name

  $scope.applyVoucher = function(voucher) { 
    for(var i = 0; i < $scope.vouchers.length; i++) { 
      if($scope._checkVoucherName($scope.vouchers[i], voucher)) { 
        if($scope._checkPriceConditions($scope.vouchers[i]) && $scope._checkCategoryConditions($scope.vouchers[i])) { 
          $scope.total = $scope.calculateTotal() - $scope.vouchers[i].price;
          return $scope.message = "£" + $scope.vouchers[i].price + " voucher added."
        } else {
          return $scope.updateMessage("Your basket doesn't meet the voucher requirements.");
        };
      }
    };
  };

  $scope.updateMessage = function(message) { 
    $scope.message = message;
  }

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

  $scope._checkCategoryConditions = function(voucher) { 
    if(voucher.categoryConditions != undefined) { 
      for(var i = 0; i < voucher.categoryConditions.length; i++) {
        for(var e = 0; e < $scope.basket.length; e++) { 
          if(voucher.categoryConditions[i].category === $scope.basket[e].category) {             
            return true;
          }
        }
      }
    } else {  
      return true;
    }
  }
});