import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import homePage from "./POM/home.Page";
import productDetail from "./POM/productDetail.Page";
import checkoutPage from "./POM/checkout.Page";

const baseUrl = Cypress.env("baseUrl2");

Given("the user has a product in the cart and is on the place order form", () => {
  cy.viewport(1920, 1080);
  cy.visit(baseUrl);

  homePage.goToFirstProductDetail();
  productDetail.clickAddToCart();
  productDetail.validateAddToCartAlert("Product added");

  homePage.clickCart();
  checkoutPage.validateAccessToCart();
  checkoutPage.clickPlaceOrder();
});

When("the user submits the order form without a name", () => {
  checkoutPage.fillPlaceOrderCountry("USA");
  checkoutPage.fillPlaceOrderCity("New York");
  checkoutPage.fillPlaceOrderCreditCard("1234 5678 9012 3456");
  checkoutPage.fillPlaceOrderMonth("12");
  checkoutPage.fillPlaceOrderYear("2025");
  checkoutPage.clickPurchase();
});

Then("the purchase error should say {string} for {string}", (message: string, keyword: string) => {
  checkoutPage.purchaseErrorMessage(message, keyword);
});

When("the user submits the order form without a country", () => {
  checkoutPage.fillPlaceOrderName("John Doe");
  checkoutPage.fillPlaceOrderCity("New York");
  checkoutPage.fillPlaceOrderCreditCard("1234 5678 9012 3456");
  checkoutPage.fillPlaceOrderMonth("12");
  checkoutPage.fillPlaceOrderYear("2025");
  checkoutPage.clickPurchase();
});

When("the user submits the order form without a city", () => {
  checkoutPage.fillPlaceOrderName("John Doe");
  checkoutPage.fillPlaceOrderCountry("USA");
  checkoutPage.fillPlaceOrderCreditCard("1234 5678 9012 3456");
  checkoutPage.fillPlaceOrderMonth("12");
  checkoutPage.fillPlaceOrderYear("2025");
  checkoutPage.clickPurchase();
});

When("the user submits the order form without a credit card", () => {
  checkoutPage.fillPlaceOrderName("John Doe");
  checkoutPage.fillPlaceOrderCountry("USA");
  checkoutPage.fillPlaceOrderCity("New York");
  checkoutPage.fillPlaceOrderMonth("12");
  checkoutPage.fillPlaceOrderYear("2025");
  checkoutPage.clickPurchase();
});

When("the user submits the order form without a month", () => {
  checkoutPage.fillPlaceOrderName("John Doe");
  checkoutPage.fillPlaceOrderCountry("USA");
  checkoutPage.fillPlaceOrderCity("New York");
  checkoutPage.fillPlaceOrderCreditCard("1234 5678 9012 3456");
  checkoutPage.fillPlaceOrderYear("2025");
  checkoutPage.clickPurchase();
});

When("the user submits the order form without a year", () => {
  checkoutPage.fillPlaceOrderName("John Doe");
  checkoutPage.fillPlaceOrderCountry("USA");
  checkoutPage.fillPlaceOrderCity("New York");
  checkoutPage.fillPlaceOrderCreditCard("1234 5678 9012 3456");
  checkoutPage.fillPlaceOrderMonth("12");
  checkoutPage.clickPurchase();
});
