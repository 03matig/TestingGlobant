const homePage = require("../POM/home.Page");

const baseUrl = Cypress.env("baseUrl2");
const username = Cypress.env("username2");
const password = Cypress.env("password2");

const ts = Date.now();

describe("Authentication Tests", () => {
  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it("Full registration + login + logout flow", () => {
    // We sign up with our new user
    homePage.clickSignUp();
    homePage.fillSignUpUsername(`${username}`);
    homePage.fillSignUpPassword(`${password}`);
    homePage.clickSignUpButton();
    homePage.validateSignUpAlert();

    // Now, we log in with our new credentials
    homePage.clickLogIn();
    homePage.fillLogInUsername(`${username}`);
    homePage.fillLogInPassword(`${password}`);
    homePage.clickLogInButton();
    homePage.validateLogIn(`${username}`);

    // Finally, we log out
    homePage.clickLogOut();
    homePage.validateLogOut();
  });
});
