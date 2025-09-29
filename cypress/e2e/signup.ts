import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import homePage from "./POM/home.Page";

const baseUrl = Cypress.env("baseUrl2");
const username = Cypress.env("username2");
const password = Cypress.env("password2");
const ts = Date.now();

Given("the user is on the home page", () => {
  cy.viewport(1920, 1080);
  cy.visit(baseUrl);
});

When("the user signs up with valid credentials", () => {
  homePage.clickSignUp();
  homePage.fillSignUpUsername(`${username}${ts}`);
  homePage.fillSignUpPassword(password);
  homePage.clickSignUpButton();
});

Then("the signup alert should say {string}", (message: string) => {
  homePage.validateSignUpAlert(message);
});

When("the user logs in with the same credentials", () => {
  homePage.clickLogIn();
  homePage.fillLogInUsername(username);
  homePage.fillLogInPassword(password);
  homePage.clickLogInButton();
});

Then("the login should be successful", () => {
  homePage.validateLogIn(username);
});

When("the user logs out", () => {
  homePage.clickLogOut();
});

Then("the logout should be successful", () => {
  homePage.validateLogOut();
});

When("the user tries to sign up with an existing username", () => {
  homePage.clickSignUp();
  homePage.fillSignUpUsername(username);
  homePage.fillSignUpPassword(password);
  homePage.clickSignUpButton();
});

When("the user tries to sign up without a username", () => {
  homePage.clickSignUp();
  homePage.fillSignUpPassword(password);
  homePage.clickSignUpButton();
});

When("the user tries to sign up without a password", () => {
  homePage.clickSignUp();
  homePage.fillSignUpUsername(username);
  homePage.clickSignUpButton();
});

When("the user opens the signup modal and closes it", () => {
  homePage.clickSignUp();
  homePage.fillSignUpUsername(username);
  homePage.fillSignUpPassword(password);
  homePage.clickSignUpCancelButton();
});

Then("the signup modal should not be visible", () => {
  homePage.validateSignUpModalClosure();
});

When("the user tries to sign up with a very long password", () => {
  const longPassword = password.repeat(50);
  homePage.clickSignUp();
  homePage.fillSignUpUsername(`${ts}${username}`);
  homePage.fillSignUpPassword(longPassword);
  homePage.clickSignUpButton();
});
