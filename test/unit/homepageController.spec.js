describe('homepageController', function() { 

  var scope, ctrl, $httpBackend;

  beforeEach(module('fashionApp'));

  beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('clothes/fullClothesList.json').
        respond([{name: 'Clothing1', price: 99}, {name: 'Clothing2', price: 10}]);
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
    expect(scope.total()).toEqual(99);
  });
});