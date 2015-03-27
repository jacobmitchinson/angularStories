describe('Shopping Cart', function() { 

  beforeEach(function() {
    browser.get('/app/index.html');
  });

  it('can display a list of products', function() { 
    var items = element.all(by.repeater('item in clothes'));
    expect(items.count()).toEqual(13);
  });

}); 
