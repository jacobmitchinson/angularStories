describe('homepageController', function() { 

  var scope, ctrl, $httpBackend;

  beforeEach(module('fashionApp'));

  beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('clothes/fullClothesList.json').
        respond([ {name: 'Clothing1', price: 99, category: "Men's Footwear", quantity: 1}, 
                  {name: 'Clothing2', price: 60}, 
                  {name: 'Clothing3', price: 76, category: "Toupe"}, 
                  {name: 'Clothing4', price: 49}]); 
    $httpBackend.expectGET('clothes/vouchers.json').
        respond([{name: '5off', price: 5, totalReq: 0}, 
                 {name: '10off', price: 10, totalReq: 50},
                 {name: '15off', price: 15, totalReq: 75, categoryConditions: ["Women's Footwear", "Men's Footwear"]}
                 ]);
    scope = $rootScope.$new();
    ctrl = $controller('homepageController', {$scope: scope});
    $httpBackend.flush();
  }));

  function add() { 
    scope.add(scope.clothes[0]);
  };

  it('can return the items', function() { 
    expect(scope.clothes).toEqual([ {name: 'Clothing1', price: 99, category: "Men's Footwear", quantity: 1}, 
                                    {name: 'Clothing2', price: 60}, 
                                    {name: 'Clothing3', price: 76, category: "Toupe"}, 
                                    {name: 'Clothing4', price: 49} ]);
  });

  it('can add items to the basket', function() { 
    add();
    expect(scope.basket.length).toEqual(1);
  });

  it('can add items of the same type to the basket', function() { 
    add();
    add();
    add();
    expect(scope.basket.length).toEqual(1);
    expect(scope.basket[0].desiredQuantity).toEqual(3);
  });

  it('can remove items from the basket', function() { 
    add();
    scope.remove(scope.clothes[0]);
    expect(scope.basket.length).toEqual(0);
  });

  it('can total the items in the basket', function() { 
    add();
    add();
    scope.add(scope.clothes[1]);
    scope.calculateTotal();
    expect(scope.total).toEqual(258);
  });

  it('can decrease the available quantity when items are added to the basket', function() { 
    add();
    expect(scope.clothes[0].quantity).toEqual(0);
  })

  it('can apply a 5 off voucher to the order', function() { 
    add();
    scope.applyVoucher('5off');
    expect(scope.totalWithDiscount).toEqual(94);
  });

  it('can apply a 10 off voucher to the order', function() { 
    add();
    scope.applyVoucher('10off');
    expect(scope.totalWithDiscount).toEqual(89);
  });

  it('will not apply a 10 off voucher unless the order is over £50', function() { 
    scope.add(scope.clothes[3]);
    scope.applyVoucher('10off');
    expect(scope.totalWithDiscount).toEqual(49);
  });

  it('can apply a 15 off voucher to the order if the order is over £75 and has shoes', function() { 
    add();
    scope.applyVoucher('15off');
    expect(scope.totalWithDiscount).toEqual(84);
  });

  it('will not apply a 15 off voucher unless the order is over 75', function() { 
    scope.add(scope.clothes[1]);
    scope.applyVoucher('15off');
    expect(scope.totalWithDiscount).toEqual(60);
  });

  it('will not apply a 15 off voucher unless the order contains shoes', function() { 
    scope.add(scope.clothes[2]);
    scope.applyVoucher('15off');
    expect(scope.totalWithDiscount).toEqual(76);
  });

});