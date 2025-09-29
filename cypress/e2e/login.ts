import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import homePage from "./POM/home.Page";

const baseUrl = Cypress.env("baseUrl2");
const username = Cypress.env("username2");
const password = Cypress.env("password2");
const ts = Date.now();

const sqlPayloads = {
  "injection1": {
    "1stTry": '" OR "1"="1"',
    "2ndTry": "' OR '1'='1'"
  },
  "injection2": {
    "1stTry": '" OR ""=""',
    "2ndTry": "' OR ''=''"
  },
  "injection3": {
    "1stTry": '" OR 1=1',
    "2ndTry": "' OR 1=1"
  }
};

Given("the user is on the home page", () => {
  cy.viewport(1920, 1080);
  cy.visit(baseUrl);
});

When("the user logs in with valid credentials", () => {
  homePage.clickLogIn();
  homePage.fillLogInUsername(username);
  homePage.fillLogInPassword(password);
  homePage.clickLogInButton();
});

Then("the login should be successful", () => {
  cy.wait(2000);
  homePage.validateLogIn(username);
});

When("the user logs out", () => {
  homePage.clickLogOut();
});

Then("the logout should be successful", () => {
  homePage.validateLogOut();
});

When("the user tries to log in with an invalid password", () => {
  const invalidPassword = `${ts}${password}`;
  homePage.clickLogIn();
  homePage.fillLogInUsername(username);
  homePage.fillLogInPassword(invalidPassword);
  homePage.clickLogInButton();
});

Then("the login alert should say {string}", (message: string) => {
  homePage.loginFailedValidationMessage(message);
});

When("the user tries to log in with an invalid username", () => {
  const invalidUsername = `${ts}${username}`;
  homePage.clickLogIn();
  homePage.fillLogInUsername(invalidUsername);
  homePage.fillLogInPassword(password);
  homePage.clickLogInButton();
});

When("the user tries to log in without a username", () => {
  homePage.clickLogIn();
  homePage.fillLogInPassword(password);
  homePage.clickLogInButton();
});

When("the user tries to log in without a password", () => {
  homePage.clickLogIn();
  homePage.fillLogInUsername(username);
  homePage.clickLogInButton();
});

When("the user tries SQL injection on the password field", () => {
  const payload =
    sqlPayloads.injection1["1stTry"] ||
    sqlPayloads.injection1["2ndTry"] ||
    `" OR "1"="1"`;

  homePage.clickLogIn();
  homePage.fillLogInUsername(username);
  homePage.fillLogInPassword(payload);
  homePage.clickLogInButton();
});

When("the user opens the login modal and closes it", () => {
  homePage.clickLogIn();
  homePage.fillLogInUsername(username);
  homePage.fillLogInPassword(password);
  homePage.clickLogInCancelButton();
});

Then("the login modal should not be visible", () => {
  homePage.validateLogInModalClosure();
});
