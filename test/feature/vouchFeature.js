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

  it('can not apply a £10 voucher unless order over £50', function() { 
    element.all(by.css(".add-to-basket")).get(1).click();
    var voucherEntry = element.all(by.id('enter-voucher')).first();
    voucherEntry.sendKeys('10off');
    var el = element.all(by.id('voucher-price')).first();
    expect(el.getText()).toContain("42.00");
  });

  it('can apply a £15 voucher to the order', function() { 
    addToBasket();   
    var voucherEntry = element.all(by.id('enter-voucher')).first();
    voucherEntry.sendKeys('15off');
    var el = element.all(by.id('voucher-price')).first();
    expect(el.getText()).toContain("£84.00");
  }); 

  it('will not apply a £15 voucher to the order unless order contains shoes', function() { 
    element.all(by.css(".add-to-basket")).last().click(); 
    var voucherEntry = element.all(by.id('enter-voucher')).first();
    voucherEntry.sendKeys('15off');
    var el = element.all(by.id('voucher-price')).first();
    expect(el.getText()).toContain("£540.00");
  }); 

  it('will not apply a £15 voucher to the order unless it is over £75', function() { 
    element.all(by.css(".add-to-basket")).get(1).click(); 
    var voucherEntry = element.all(by.id('enter-voucher')).first();
    voucherEntry.sendKeys('15off');
    var el = element.all(by.id('voucher-price')).first();
    expect(el.getText()).toContain("42.00");
  }); 

  it('will display when the voucher is invalid', function() { 
    element.all(by.css(".add-to-basket")).last().click(); 
    var voucherEntry = element.all(by.id('enter-voucher')).first();
    voucherEntry.sendKeys('15off');
    var el = element.all(by.id('voucher-message')).first();
    expect(el.getText()).toContain("Invalid voucher.");
  }); 

  it('will display when the voucher is valid', function() { 
    element.all(by.css(".add-to-basket")).first().click(); 
    var voucherEntry = element.all(by.id('enter-voucher')).first();
    voucherEntry.sendKeys('15off');
    var el = element.all(by.id('voucher-message')).first();
    expect(el.getText()).toContain("£15 voucher added.");
  }); 

}); 
