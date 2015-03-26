describe('Shopping Cart', function() { 

  beforeEach(function() {
    browser.get('/');
  });

  it('can display a list of products', function() { 
    var items = element.all(by.repeater('product in products'));
    expect(items.count()).toEqual(13);
  });
     

}); 
