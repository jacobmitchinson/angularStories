describe('Homepage', function() { 

  beforeEach(function() {
    browser.get('/app/index.html');
  });

  it('can display all products', function() { 
    var items = element.all(by.repeater('item in clothes'));
    expect(items.count()).toEqual(13); 
  });

  it('will hide unavailable items', function() { 
    var isElDisabled = element.all(by.tagName('input')).get(4).getAttribute('disabled');
    expect(isElDisabled).toEqual('true');
  });

  it('can display the names of the products', function() { 
    var item = element.all(by.binding('item.name')).first();
    expect(item.getText()).toContain('Almond Toe Court Shoes');
  });

  it('can display the color of the items', function() { 
    var item = element.all(by.binding('item.colour')).first();
    expect(item.getText()).toContain('Patent Black');
  });

  it('can display the category of the items', function() { 
    var item = element.all(by.binding('item.category')).first();
    expect(item.getText()).toContain("Women's Footwear");
  });

  it('can display the available quantity', function() { 
    var item = element.all(by.binding('item.quantity')).first();
    expect(item.getText()).toContain('5');
  });

  it('can display the price of each item', function() { 
    var item = element.all(by.binding('item.price')).first();
    expect(item.getText()).toContain('£99.00');
  });

  it('can display the image of the item', function() { 
    var items = element.all(by.repeater('item in clothes')).first();
    var src = items.element(by.tagName('img')).getAttribute('src');
    expect(src).toEqual("http://localhost:8000/app/images/black_shoe.jpg");
  });

}); 
