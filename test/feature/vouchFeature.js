describe('Basket', function() { 

  beforeEach(function() {
    browser.get('/app/index.html');
  });

  function addToBasket() { 
    element.all(by.css(".add-to-basket")).first().click();
  };

  it('can apply a £5 voucher to the order', function() { 
    addToBasket();   
    var voucherEntry = element.all(by.id('enter-voucher')).first();
    voucherEntry.sendKeys('5off');
    var el = element.all(by.id('voucher-price')).first();
    expect(el.getText()).toContain("£94.00");
  });

  it('can apply a £10 voucher to the order', function() { 
    addToBasket();   
    var voucherEntry = element.all(by.id('enter-voucher')).first();
    voucherEntry.sendKeys('10off');
    var el = element.all(by.id('voucher-price')).first();
    expect(el.getText()).toContain("£89.00");
  });

  it('can apply a £15 voucher to the order', function() { 
    addToBasket();   
    var voucherEntry = element.all(by.id('enter-voucher')).first();
    voucherEntry.sendKeys('15off');
    var el = element.all(by.id('voucher-price')).first();
    expect(el.getText()).toContain("£84.00");
  }); 

}); 
