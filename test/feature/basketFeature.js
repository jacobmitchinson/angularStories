describe('Basket', function() { 

  beforeEach(function() {
    browser.get('/app/');
  });

  function addToBasket() { 
    element.all(by.css(".add-to-basket")).first().click();
    element.all(by.css("#checkout_link")).first().click();
  };

  function removeFromBasket() { 
    element.all(by.css("#checkout_link")).first().click();
    element.all(by.css(".remove-from-basket")).first().click();
  }

  it('can add items to the order', function() { 
    addToBasket();
    var el = element.all(by.repeater('item in basket'));
    expect(el.count()).toEqual(1);
  }); 

  it('can remove items from the order', function() { 
    addToBasket();
    removeFromBasket();
    var el = element.all(by.repeater('item in basket'));
    expect(el.count()).toEqual(0);
  });

  it('can show the total price of the order', function() { 
    addToBasket();
    var el = element.all(by.id('total-price')).first();
    expect(el.getText()).toContain("£99.00");
  });

}); 
