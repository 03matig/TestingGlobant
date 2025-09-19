import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
const homePage = require('./POM/home.Page');
const accountPage = require('./POM/account.Page');

// Test data (define these in cypress.env.json or via CLI/GitHub Secrets)
const baseUrl = Cypress.env('baseUrl') || Cypress.config('baseUrl');
const username = Cypress.env('username');
const email    = Cypress.env('email');
const password = Cypress.env('password');

// Unique creds per run
const ts       = Date.now();
const newUser  = `qa_${username}_${ts}`;
const newEmail = `qa_${ts}${email}`;
const newPass  = `Qa!${password}`;

// Use baseUrl from cypress.config.js and just visit "/"
Given('the user navigates to the registration page', () => {
  cy.viewport(1920, 1080);
  cy.visit(baseUrl);
  homePage.validateAccessToHomePage();
  homePage.clickAccountButton();
  accountPage.accessToAccountPageValidation();
});

When('they register with unique valid credentials', () => {
  accountPage.typeUsernameOnRegisterForm(newUser);
  accountPage.typeEmailOnRegisterForm(newEmail);
  accountPage.typePasswordOnRegisterForm(newPass);
  accountPage.clickSubmitOnRegisterForm();
});

Then('the My Account greeting should be visible', () => {
  accountPage.validateRegistrationOrLogin(newUser);
});

Then('they can log out and sign back in with the new user', () => {
  accountPage.clickLogOutAnchor();
  accountPage.typeEmailOnLoginForm(newEmail);
  accountPage.typePasswordOnLoginForm(newPass);
  accountPage.clickSubmitOnLoginForm();
  accountPage.validateRegistrationOrLogin(newUser);
});

// --- Negative flows ---

When('they register using an invalid email (with the ! symbol)', () => {
  const badEmail = `!qa_${ts}${email}`;
  const user = `qa_user_${ts}`;
  const pass = `Qa!${ts}abc`;

  accountPage.typeUsernameOnRegisterForm(user);
  accountPage.typeEmailOnRegisterForm(badEmail);
  accountPage.typePasswordOnRegisterForm(pass);
  accountPage.clickSubmitOnRegisterForm();
});

Then('the native email validation message should be shown', () => {
  const msg = 'El texto antes del signo "@" no debe incluir el símbolo "!".';
  accountPage.getErrorInvalidEmailFormat(msg);
});

When('they register with an invalid username', () => {
  const badUser = 'inv@lid user*';
  const email = `qa_${ts}@mailinator.com`;
  const pass  = `Qa!${ts}abc`;

  accountPage.typeUsernameOnRegisterForm(badUser);
  accountPage.typeEmailOnRegisterForm(email);
  accountPage.typePasswordOnRegisterForm(pass);
  accountPage.clickSubmitOnRegisterForm();
});

Then('a username invalid error message should be shown', () => {
  accountPage.getErrorMessage('Error: Please enter a valid account username.');
});

When('they try to register without a username', () => {
  const email = `qa_${ts}@mailinator.com`;
  const pass  = `Qa!${ts}abc`;

  accountPage.typeEmailOnRegisterForm(email);
  accountPage.typePasswordOnRegisterForm(pass);
  accountPage.clickSubmitOnRegisterForm();
});

Then('an empty username error message should be shown', () => {
  accountPage.getErrorMessage('Error: Please enter a valid account username.');
});

When('they try to register without an email', () => {
  const user = `qa_user_${ts}`;
  const pass = `Qa!${ts}abc`;

  accountPage.typeUsernameOnRegisterForm(user);
  accountPage.typePasswordOnRegisterForm(pass);
  accountPage.clickSubmitOnRegisterForm();
});

Then('an empty email error message should be shown', () => {
  accountPage.getErrorMessage('Error: Please provide a valid email address.');
});

When('they try to register without a password', () => {
  const user  = `qa_user_${ts}`;
  const email = `qa_${ts}@mailinator.com`;

  accountPage.typeUsernameOnRegisterForm(user);
  accountPage.typeEmailOnRegisterForm(email);
  accountPage.clickSubmitOnRegisterForm();
});

Then('an empty password error message should be shown', () => {
  accountPage.getErrorMessage('Error: Please enter an account password.');
});
