import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import loginPage from "./POM/login.Page";
import inventoryPage from "./POM/inventory.Page";
import shoppingCartPage from "./POM/shoppingCart.Page";
import checkoutPage from "./POM/checkout.Page";

const baseUrl = Cypress.env("baseUrl") || Cypress.config("baseUrl");
const username = Cypress.env("username");
const password = Cypress.env("password");
const firstname = Cypress.env("firstname");
const lastname = Cypress.env("lastname");
const zipcode = Cypress.env("zipcode");

const productsToAdd = [
  () => inventoryPage.addFirstProductToCart(),
  () => inventoryPage.addSecondProductToCart(),
  () => inventoryPage.addThirdProductToCart(),
];

Given("the user is logged in on Saucedemo", () => {
  cy.viewport(1920, 1080);
  cy.visit(baseUrl);
  loginPage.login(username, password);
  inventoryPage.validateLoginAccessSuccessful();
});

When("the user adds the first product to the cart", () => {
  inventoryPage.addFirstProductToCart();
  inventoryPage.validateProductAdditionToCart(0);
});

When("proceeds to checkout", () => {
  inventoryPage.clickShoppingCartAnchor();
  shoppingCartPage.validateAccessToShoppingCartPage();
  shoppingCartPage.validateItemsInShoppingCart(1);

  shoppingCartPage.getCartTotal().then((cartTotal) => {
    cy.wrap(cartTotal).as("cartTotal");
    shoppingCartPage.clickCheckoutButton();
  });
});

Then("the checkout total should equal the cart total", () => {
  cy.get<number>("@cartTotal").then((cartTotal) => {
    checkoutPage.validateAccessToCheckoutPage();
    checkoutPage.enterFirstName(firstname);
    checkoutPage.enterLastName(lastname);
    checkoutPage.enterPostalCode(zipcode);
    checkoutPage.clickContinueButton();
    checkoutPage.validateCartTotal(cartTotal);
  });
});

Then("the order should be successfully completed", () => {
  checkoutPage.clickFinishButton();
  checkoutPage.validateSuccessfulOrderCompletion();
});

When("the user adds multiple products to the cart one by one", () => {
  productsToAdd.forEach((addProduct, index) => {
    const expectedCount = index + 1;
    addProduct();
    inventoryPage.validateProductAdditionToCart(index);

    inventoryPage.clickShoppingCartAnchor();
    shoppingCartPage.validateAccessToShoppingCartPage();
    shoppingCartPage.validateItemsInShoppingCart(expectedCount);

    shoppingCartPage.getCartTotal().then((cartTotal) => {
      cy.wrap(cartTotal).as("cartTotal");
      shoppingCartPage.clickCheckoutButton();

      checkoutPage.validateAccessToCheckoutPage();
      checkoutPage.enterFirstName(firstname);
      checkoutPage.enterLastName(lastname);
      checkoutPage.enterPostalCode(zipcode);
      checkoutPage.clickContinueButton();

      checkoutPage.validateCartTotal(cartTotal);

      cy.go("back");
      cy.go("back");
      cy.go("back");
    });
  });
});

When("the user removes the product from the cart", () => {
  inventoryPage.removeFirstProductFromCart();
});

Then("the cart should be empty", () => {
  inventoryPage.getShoppingCartItemsAmount().should("eq", 0);
});
