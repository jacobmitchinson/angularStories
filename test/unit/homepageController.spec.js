describe('homepageController', function() { 

  var scope, ctrl, $httpBackend;

  beforeEach(module('fashionApp'));

  beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('clothes/fullClothesList.json').
        respond([{name: 'Clothing1'}, {name: 'Clothing2'}]);
    scope = $rootScope.$new();
    ctrl = $controller('homepageController', {$scope: scope});
  }));

  it('can return the items', function() { 
    expect(scope.clothes).toBeUndefined();
    $httpBackend.flush();
    expect(scope.clothes).toEqual([{name: 'Clothing1'}, {name: 'Clothing2'}]);
  });

  it('can add items to the basket', function() { 
    $httpBackend.flush();
    scope.add(scope.clothes[0]);
    expect(scope.basket.length).toEqual(1);
  });

});