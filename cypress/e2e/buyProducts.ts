import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import homePage from "./POM/home.Page";
import productDetail from "./POM/productDetail.Page";
import checkoutPage from "./POM/checkout.Page";

const baseUrl = Cypress.env("baseUrl2");
const username = Cypress.env("username2");
const password = Cypress.env("password2");

Given("the user is on the home page", () => {
  cy.viewport(1920, 1080);
  cy.visit(baseUrl);
});

Given("the user logs in with valid credentials", () => {
  homePage.clickLogIn();
  homePage.fillLogInUsername(username);
  homePage.fillLogInPassword(password);
  homePage.clickLogInButton();
  homePage.validateLogIn(username);
});

When("the user selects a product from the home page", () => {
  homePage.goToProductDetail(0); // puedes parametrizar con índice dinámico
});

Then("the product detail page should be visible", () => {
  productDetail.validateAccessToProductDetail();
});

When("the user adds the product to the cart", () => {
  productDetail.clickAddToCart();
});

Then("the add to cart alert should say {string}", (message: string) => {
  productDetail.validateAddToCartAlert(message);
});

When("the user goes to the cart and places an order", () => {
  homePage.clickCart();
  checkoutPage.validateAccessToCart();
  checkoutPage.clickPlaceOrder();
});

When("the user fills the order form with valid data", () => {
  checkoutPage.fillPlaceOrderName("John Doe");
  checkoutPage.fillPlaceOrderCountry("USA");
  checkoutPage.fillPlaceOrderCity("New York");
  checkoutPage.fillPlaceOrderCreditCard("1234 5678 9012 3456");
  checkoutPage.fillPlaceOrderMonth("12");
  checkoutPage.fillPlaceOrderYear("2025");
  checkoutPage.clickPurchase();
});

Then("the purchase should be successful", () => {
  checkoutPage.validatePurchaseModal();
  checkoutPage.clickOKModalButton();
});
