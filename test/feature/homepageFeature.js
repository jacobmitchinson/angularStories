describe('Homepage', function() { 

  beforeEach(function() {
    browser.get('/app/index.html');
  });

  it('can display all products', function() { 
    var items = element.all(by.repeater('item in clothes'));
    expect(items.count()).toEqual(13); 
  });

  it('will hide unavailable items', function() { 
    var items = element.all(by.repeater('item in clothes'));
    items.getText().then(function(item) { 
      expect(item[4]).toEqual('');
    });
  });

  it('can display the names of the products', function() { 
    var item = element.all(by.binding('item.name')).first();
    expect(item.getText()).toEqual('Almond Toe Court Shoes');
  });

  it('can display the color of the items', function() { 
    var item = element.all(by.binding('item.colour')).first();
    expect(item.getText()).toEqual('Patent Black');
  });

  it('can display the category of the items', function() { 
    var item = element.all(by.binding('item.category')).first();
    expect(item.getText()).toEqual("Women’s Footwear");
  });

  it('can display the available quantity', function() { 
    var item = element.all(by.binding('item.quantity')).first();
    expect(item.getText()).toEqual('5');
  });

  it('can display the price of each item', function() { 
    var item = element.all(by.binding('item.price')).first();
    expect(item.getText()).toEqual('£99.00');
  });

}); 
