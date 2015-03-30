describe('Basket', function() { 

  beforeEach(function() {
    browser.get('/app/index.html');
  });

  it('can add items to the basket', function() { 
    element.all(by.css(".add-to-basket")).first().click();
    var el = element.all(by.repeater('item in basket'));
    expect(el.count()).toEqual(1);
  }); 

}); 
