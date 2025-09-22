import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import loginPage from "./POM/login.Page";
import inventoryPage from "./POM/inventory.Page";
import shoppingCartPage from "./POM/shoppingCart.Page";
import checkoutPage from "./POM/checkout.Page";

const baseUrl = Cypress.env("baseUrl1") || Cypress.config("baseUrl1");
const username = Cypress.env("username1");
const password = Cypress.env("password1");
const firstname = Cypress.env("firstname");
const lastname = Cypress.env("lastname");
const zipcode = Cypress.env("zipcode");

Given("the user is on the Checkout Information page", () => {
  cy.viewport(1920, 1080);
  cy.visit(baseUrl);
  loginPage.login(username, password);
  inventoryPage.validateLoginAccessSuccessful();
  inventoryPage.addFirstProductToCart();
  inventoryPage.validateProductAdditionToCart(0);
  inventoryPage.clickShoppingCartAnchor();
  shoppingCartPage.validateAccessToShoppingCartPage();
  shoppingCartPage.clickCheckoutButton();
  checkoutPage.validateAccessToCheckoutPage();
});

When("the user enters numbers in First Name and Last Name", () => {
  checkoutPage.enterFirstName("123");
  checkoutPage.enterLastName("456");
  checkoutPage.enterPostalCode(zipcode);
  checkoutPage.clickContinueButton();
});

When("the user enters valid first and last names but leaves postal code empty", () => {
  checkoutPage.enterFirstName(firstname);
  checkoutPage.enterLastName(lastname);
  checkoutPage.clickContinueButton();
});

When("the user enters special characters in First Name and Last Name", () => {
  checkoutPage.enterFirstName("!@#");
  checkoutPage.enterLastName("$%^");
  checkoutPage.enterPostalCode(zipcode);
  checkoutPage.clickContinueButton();
});

When("the user enters letters in Postal Code", () => {
  checkoutPage.enterFirstName(firstname);
  checkoutPage.enterLastName(lastname);
  checkoutPage.enterPostalCode("ABCDE");
  checkoutPage.clickContinueButton();
});

When("the user leaves First Name empty", () => {
  checkoutPage.enterLastName(lastname);
  checkoutPage.enterPostalCode(zipcode);
  checkoutPage.clickContinueButton();
});

When("the user leaves Last Name empty", () => {
  checkoutPage.enterFirstName(firstname);
  checkoutPage.enterPostalCode(zipcode);
  checkoutPage.clickContinueButton();
});

Then("an error should be displayed with message {string}", (expectedMessage: string) => {
  checkoutPage.validateErrorMessage(expectedMessage);
});
