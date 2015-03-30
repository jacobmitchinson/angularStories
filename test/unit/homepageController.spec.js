describe('homepageController', function() { 

  var scope, ctrl, $httpBackend;

  beforeEach(module('fashionApp'));

  beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('clothes/fullClothesList.json').
        respond([{name: 'Clothing1', price: 99}, {name: 'Clothing2', price: 10}]);
    $httpBackend.expectGET('clothes/vouchers.json').
        respond([{name: '5off', price: 5, totalReq: 0}, 
                 {name: '10off', price: 10, totalReq: 50},
                 {name: '15off', price: 15, totalReq: 75, orConditions: [{category: "Women's Footwear", category: "Men's Footwear"}]}
                 ]);
    scope = $rootScope.$new();
    ctrl = $controller('homepageController', {$scope: scope});
    $httpBackend.flush();
  }));

  function add() { 
    scope.add(scope.clothes[0]);
  };

  it('can return the items', function() { 
    expect(scope.clothes).toEqual([{name: 'Clothing1', price: 99}, {name: 'Clothing2', price: 10}]);
  });

  it('can add items to the basket', function() { 
    add();
    expect(scope.basket.length).toEqual(1);
  });

  it('can remove items from the basket', function() { 
    add();
    scope.remove(scope.clothes[0]);
    expect(scope.basket.length).toEqual(0);
  });

  it('can total the items in the basket', function() { 
    add();
    scope.calculateTotal();
    expect(scope.total).toEqual(99);
  });

  it('can apply a 5 off voucher to the order', function() { 
    add();
    scope.applyVoucher('5off');
    expect(scope.total).toEqual(94);
  });

  it('can apply a 10 off voucher to the order', function() { 
    add();
    scope.applyVoucher('10off');
    expect(scope.total).toEqual(89);
  });

  it('can apply a 15 off voucher to the order', function() { 
    add();
    scope.applyVoucher('15off');
    expect(scope.total).toEqual(84);
  });


});