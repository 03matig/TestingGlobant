// Cómo ejecutar sin Cucumber (Mocha):
// npx cypress run --spec "cypress/e2e/sites/AskOmDch/tests/authTests.cy.js"
//
// Cómo ejecutar con Cucumber (Gherkin):
// npx cypress run --spec "cypress/e2e/sites/AskOmDch/features/login.feature"

import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
const homePage = require("./POM/home.Page");
const accountPage = require("./POM/account.Page");

// Payloads de SQLi para reutilizar en escenarios
/*
const sqlPayloads = {
  injection1: { "1stTry": '" OR "1"="1"', "2ndTry": "' OR '1'='1'" },
  injection2: { "1stTry": '" OR ""=""', "2ndTry": "' OR ''=''" },
  injection3: { "1stTry": '" OR 1=1', "2ndTry": "' OR 1=1" },
};
*/
const baseUrl = Cypress.env('baseUrl') || Cypress.config('baseUrl');
const username = Cypress.env('username');
const email = Cypress.env('email');
const password = Cypress.env('password');
const sqlPayload = `" OR "1"="1"`;
const wrongPassword = 'this-is-definitely-wrong-123!';

Given('the user navigates to the login page', () => {
  cy.viewport(1920, 1080);
  console.log('Base URL:', baseUrl);
  cy.visit(baseUrl);
  homePage.validateAccessToHomePage();
  homePage.clickAccountButton();
  accountPage.accessToAccountPageValidation();
});

When('they sign in with a valid email', () => {
  accountPage.typeEmailOnLoginForm(email);
  accountPage.typePasswordOnLoginForm(password);
  accountPage.clickSubmitOnLoginForm();
});

When('they sign in with a valid username', () => {
  accountPage.typeUsernameOnLoginForm(username);
  accountPage.typePasswordOnLoginForm(password);
  accountPage.clickSubmitOnLoginForm();
});

When('they try to sign in with a SQL payload in the password field', () => {
  const user = username || email;
  accountPage.typeUsernameOnLoginForm(user);
  accountPage.typePasswordOnLoginForm(sqlPayload);
  accountPage.clickSubmitOnLoginForm();
});

When('they sign in with a wrong password', () => {
  const user = username || email;
  accountPage.typeUsernameOnLoginForm(user);
  accountPage.typePasswordOnLoginForm(wrongPassword);
  accountPage.clickSubmitOnLoginForm();
});

When('they try to sign in without entering a username or email', () => {
  accountPage.typePasswordOnLoginForm(password);
  accountPage.clickSubmitOnLoginForm();
});

When('they try to sign in without entering a password', () => {
  const user = username || email;
  accountPage.typeUsernameOnLoginForm(user);
  accountPage.clickSubmitOnLoginForm();
});

Then('the greeting for the configured user should be visible', () => {
  // Your POM asserts: "Hello {username} (not {username}? Log out)"
  accountPage.validateRegistrationOrLogin(username);
});

Then('an incorrect password error should be shown', () => {
  const user = username || email;
  const message = `Error: The password you entered for the username ${user} is incorrect.`;
  accountPage.getErrorMessage(message);
});

Then('a username required error should be shown', () => {
  accountPage.getErrorMessage('Error: Username is required.');
});

Then('a password empty error should be shown', () => {
  accountPage.getErrorMessage('Error: The password field is empty.');
});