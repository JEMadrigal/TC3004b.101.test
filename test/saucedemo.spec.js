const { Builder, By, Key } = require('selenium-webdriver');
const assert = require('assert');

describe('saucedemo', function() {
  this.timeout(30000);
  let driver;
  let vars;

  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build();
    vars = {};
  });

  afterEach(async function() {
    await driver.quit();
  });

  it('saucedemo - Wrong', async function() {
    await driver.get("https://www.saucedemo.com/");
    await driver.manage().window().setRect({ width: 1050, height: 724 });

    //Login incorrecto
    await driver.findElement(By.xpath('//*[@id="user-name"]')).sendKeys("wrong_user");
    await driver.findElement(By.xpath('//*[@id="password"]')).sendKeys("wrong_password");
    await driver.findElement(By.id("login-button")).click();

    
  });

  it('saucedemo - Correct', async function() {
    await driver.get("https://www.saucedemo.com/");
    await driver.manage().window().setRect({ width: 1050, height: 724 });

    //Login correcto
    await driver.findElement(By.xpath('//*[@id="user-name"]')).sendKeys("standard_user");
    await driver.findElement(By.xpath('//*[@id="password"]')).sendKeys("secret_sauce");

    //Click en el botón de login
    await driver.findElement(By.id("login-button")).click()

    await driver.findElement(By.xpath('//*[@id="add-to-cart-sauce-labs-backpack"]'), 5000).click()
    await driver.findElement(By.xpath('//*[@id="shopping_cart_container"]/a'), 5000).click()
    await driver.findElement(By.xpath('//*[@id="checkout"]')).click()

    await driver.findElement(By.xpath('//*[@id="first-name"]')).sendKeys("John");
    await driver.findElement(By.xpath('//*[@id="last-name"]')).sendKeys("Doe");
    await driver.findElement(By.xpath('//*[@id="postal-code"]')).sendKeys("33010");

    await driver.findElement(By.xpath('//*[@id="continue"]')).click()

    await driver.findElement(By.xpath('//*[@id="finish"]')).click()

  });
});
