// cypress/e2e/step_definitions/login.ts

import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
const { LoginPage } = require( "../POM/login.Page");
const { InventoryPage } = require("../POM/inventory.Page");

const loginPage = new LoginPage();
const inventoryPage = new InventoryPage();

const baseUrl = Cypress.env("baseUrl") || Cypress.config("baseUrl");
const username = Cypress.env("username");
const password = Cypress.env("password");

Given("the user opens the login page", () => {
  cy.viewport(1920, 1080);
  cy.visit(baseUrl);
});

When(
  "the user logs in with username {string} and password {string}",
  (user: string, pass: string) => {
    if (user) loginPage.enterUsername(user);
    if (pass) loginPage.enterPassword(pass);
    loginPage.clickLoginButton();
  }
);

Then("the user should be redirected to the inventory page", () => {
  inventoryPage.validateLoginAccessSuccessful();
});

Then("the user should see the error message {string}", (message: string) => {
  loginPage.validateErrorMessage(message);
});

Then("the login result should be {string}", (expected: string) => {
  if (expected === "success") {
    inventoryPage.validateLoginAccessSuccessful();
  } else if (expected === "locked_out") {
    loginPage.validateErrorMessage(
      "Epic sadface: Sorry, this user has been locked out."
    );
  } else {
    throw new Error("Unknown expected result: " + expected);
  }
});
