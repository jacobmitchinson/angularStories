fashionApp.controller('homepageController', function($scope, $http) {
  $http.get('clothes/fullClothesList.json').success(function(data) {
    $scope.clothes = data;
  });

  $http.get('clothes/vouchers.json').success(function(data) {
    $scope.vouchers = data;
  });

  $scope.basket = [];
  $scope.total = 0;
  $scope.totalWithDiscount = null;
  $scope.voucher;
  $scope.message = "No voucher applied.";

  $scope.add = function(item) { 
    if($scope._hasItemInBasket(item)){
      $scope.increaseQuantity(item);
    } else { 
      item.desiredQuantity = 1;
      $scope.basket.push(item);
    }
    item.quantity -= 1;
  };

  $scope.remove = function(item) { 
    $scope.basket.pop(item);
  };

  $scope.increaseQuantity = function(item) { 
    var index = $scope.basket.indexOf(item);
    $scope.basket[index].desiredQuantity += 1;
  };

  $scope._hasItemInBasket = function(item) { 
    for(var i = 0; i < $scope.basket.length; i++) { 
      if($scope.basket[i] === item) { 
        return true;
      }; 
    };
    return false;
  };

  $scope.calculateTotal = function() { 
    $scope.total = 0;
    for(var i = 0; i < $scope.basket.length; i++) { 
      $scope.total += ($scope.basket[i].price * $scope.basket[i].desiredQuantity);
    };
    return $scope.total;
  };

  // TODO: This should be in a voucher controller
  $scope.applyVoucher = function(voucher) {   
    var validVoucher = $scope._check(voucher)
    if(validVoucher) { 
      $scope.totalWithDiscount = $scope.calculateTotal() - validVoucher.price;
      $scope.message = "£" + validVoucher.price + " voucher added."
    } else if(voucher != undefined) { 
      $scope.totalWithDiscount = $scope.total;
      $scope.message = "Invalid voucher."
    }  
  };

  // TODO: this needs refactoring
  $scope._check = function(voucher) { 
    for(var i = 0; i < $scope.vouchers.length; i++) {
      var checkName = $scope._checkName($scope.vouchers[i], voucher);
      var checkPrice = $scope._checkPrice($scope.vouchers[i], voucher);
      var checkCategory = $scope._checkCategory($scope.vouchers[i]);
      if(checkName && checkPrice && checkCategory) { 
        return $scope.vouchers[i];
      };
    }
  }

  $scope._checkName = function(voucher, wantedVoucher) { 
    if(voucher.name === wantedVoucher) { 
      return true;
    }
  };

  $scope._checkPrice = function(voucher) { 
    if($scope.calculateTotal() > voucher.totalReq) {
      return true;
    }
  };

  // TODO: this needs refactoring
  $scope._checkCategory = function(voucher) { 
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