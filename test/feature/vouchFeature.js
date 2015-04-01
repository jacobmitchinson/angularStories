describe('Basket', function() { 

  beforeEach(function() {
    browser.get('/app/index.html');
  });

  function addToBasket(item) { 
    element.all(by.css(".add-to-basket")).get(item).click();
    element.all(by.css("#checkout_link")).first().click();
  };

  it('can apply a £5 voucher to the order', function() { 
    addToBasket(0);   
    var voucherEntry = element.all(by.id('enter-voucher')).first();
    voucherEntry.sendKeys('5off');
    var el = element.all(by.id('voucher-price')).first();
    expect(el.getText()).toContain("£94.00");
  });

  it('can apply a £10 voucher to the order', function() { 
    addToBasket(0);   
    var voucherEntry = element.all(by.id('enter-voucher')).first();
    voucherEntry.sendKeys('10off');
    var el = element.all(by.id('voucher-price')).first();
    expect(el.getText()).toContain("£89.00");
  });

  it('can not apply a £10 voucher unless order over £50', function() { 
    addToBasket(1);
    var voucherEntry = element.all(by.id('enter-voucher')).first();
    voucherEntry.sendKeys('10off');
    var el = element.all(by.id('voucher-price')).first();
    expect(el.getText()).toContain("42.00");
  });

  it('can apply a £15 voucher to the order', function() { 
    addToBasket(0);   
    var voucherEntry = element.all(by.id('enter-voucher')).first();
    voucherEntry.sendKeys('15off');
    var el = element.all(by.id('voucher-price')).first();
    expect(el.getText()).toContain("£84.00");
  }); 

  it('will not apply a £15 voucher to the order unless order contains shoes', function() { 
    addToBasket(12);
    var voucherEntry = element.all(by.id('enter-voucher')).first();
    voucherEntry.sendKeys('15off');
    var el = element.all(by.id('voucher-price')).first();
    expect(el.getText()).toContain("£540.00");
  }); 

  it('will not apply a £15 voucher to the order unless it is over £75', function() { 
    addToBasket(1);
    var voucherEntry = element.all(by.id('enter-voucher')).first();
    voucherEntry.sendKeys('15off');
    var el = element.all(by.id('voucher-price')).first();
    expect(el.getText()).toContain("42.00");
  }); 

  it('will display when the voucher is invalid', function() { 
    addToBasket(12);
    var voucherEntry = element.all(by.id('enter-voucher')).first();
    voucherEntry.sendKeys('15off');
    var el = element.all(by.id('voucher-message')).first();
    expect(el.getText()).toContain("Invalid voucher.");
  }); 

  it('will display when the voucher is valid', function() { 
    addToBasket(0);
    var voucherEntry = element.all(by.id('enter-voucher')).first();
    voucherEntry.sendKeys('15off');
    var el = element.all(by.id('voucher-message')).first();
    expect(el.getText()).toContain("£15 voucher added.");
  }); 

}); 
