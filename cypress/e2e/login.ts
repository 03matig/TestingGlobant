// cypress/e2e/step_definitions/login.ts

import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
const loginPage = require( "./POM/login.Page");
const inventoryPage = require("./POM/inventory.Page");

const baseUrl = Cypress.env("baseUrl1") || Cypress.config("baseUrl1");
const username = Cypress.env("username1");
const password = Cypress.env("password1");

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
