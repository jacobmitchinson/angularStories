describe('Basket', function() { 

  beforeEach(function() {
    browser.get('/app/index.html');
  });

  function addToBasket() { 
    element.all(by.css(".add-to-basket")).first().click();
  };

  function removeFromBasket() { 
    element.all(by.css(".remove-from-basket")).first().click();
  }

  it('can add items to the basket', function() { 
    addToBasket();
    var el = element.all(by.repeater('item in basket'));
    expect(el.count()).toEqual(1);
  }); 

  it('can remove items from the basket', function() { 
    addToBasket();
    removeFromBasket();
    var el = element.all(by.repeater('item in basket'));
    expect(el.count()).toEqual(0);
  });

}); 
