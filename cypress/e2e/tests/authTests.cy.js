const homePage = require("../POM/home.Page");

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
}

describe("Authentication SignUp Tests", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit(baseUrl);

  });

  it("Full signup + login + logout flow", () => {
    // We sign up with our new user
    homePage.clickSignUp();
    homePage.fillSignUpUsername(`${username}`);
    homePage.fillSignUpPassword(`${password}`);
    homePage.clickSignUpButton();

    const message = 'Sign up successful.';
    homePage.validateSignUpAlert(message);

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

  it("Sign up with existing username", () => {
    // We try to sign up with an existing username
    homePage.clickSignUp();
    homePage.fillSignUpUsername(`${username}`);
    homePage.fillSignUpPassword(`${password}`);
    homePage.clickSignUpButton();

    const message = 'This user already exist.';
    homePage.validateSignUpAlert(message);
  });

  it("Sign up with empty username field", () => {
    // We try to sign up with an empty username field
    homePage.clickSignUp();
    // homePage.fillSignUpUsername(" "); --> We don't fill the username field
    homePage.fillSignUpPassword(`${password}`);
    homePage.clickSignUpButton();

    const message = 'Please fill out Username and Password.';
    homePage.validateSignUpAlert(message);
  });

  it("Sign up with empty password field", () => {
    // We try to sign up with an empty password field
    homePage.clickSignUp();
    homePage.fillSignUpUsername(`${username}`);
    // homePage.fillSignUpPassword(" "); --> We don't fill the password field
    homePage.clickSignUpButton();

    const message = 'Please fill out Username and Password.';
    homePage.validateSignUpAlert(message);
  });

  it("Validate close button works on sign up modal", () => {
    // We open the sign up modal and then close it using the cancel button
    homePage.clickSignUp();
    homePage.fillSignUpUsername(`${username}`);
    homePage.fillSignUpPassword(`${password}`);
    homePage.clickSignUpCancelButton();

    // We validate that the sign up modal is closed by checking that the sign up button in the navbar is visible again
    homePage.validateSignUpModalClosure();
  });

  it("Try password input limits", () => {
    const longPassword = password.repeat(50);

    // We try to sign up with a very long password
    homePage.clickSignUp();
    homePage.fillSignUpUsername(`${ts}${username}`);
    homePage.fillSignUpPassword(longPassword);
    homePage.clickSignUpButton();

    const message = 'Sign up successful.';
    homePage.validateSignUpAlert(message);
  })
});

describe("Authentication Login Tests", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit(baseUrl);

  });

  // Corregir este primer test
  it("Login + logout flow", () => {
    // We log in with our new credentials
    homePage.clickLogIn();
    homePage.fillLogInUsername(`${username}`);
    homePage.fillLogInPassword(`${password}`);
    homePage.clickLogInButton();
    homePage.validateLogIn(`${username}`);
  });

  it("Login with invalid password", () => {
    const invalidPassword = `${ts}${password}`;
    // We try to log in with an invalid password
    homePage.clickLogIn();
    homePage.fillLogInUsername(`${username}`);
    homePage.fillLogInPassword(`${invalidPassword}`);
    homePage.clickLogInButton();

    const message = 'Wrong password.';
    homePage.loginFailedValidationMessage(message);
  });

  it("Login with invalid username", () => {
    const invalidUsername = `${ts}${username}`;

    // We try to log in with an invalid username
    homePage.clickLogIn();
    homePage.fillLogInUsername(`${invalidUsername}`);
    homePage.fillLogInPassword(`${password}`);
    homePage.clickLogInButton();

    const message = 'User does not exist.';
    homePage.loginFailedValidationMessage(message);
  });

  it("Trying to login with empty username field", () => {
    // We try to log in with an empty username field
    homePage.clickLogIn();
    // homePage.fillLogInUsername(" "); --> We don't fill the username field
    homePage.fillLogInPassword(`${password}`);
    homePage.clickLogInButton();

    const message = 'Please fill out Username and Password.';
    homePage.loginFailedValidationMessage(message);
  });

  it("Trying to login with empty password field", () => {
    // We try to log in with an empty password field
    homePage.clickLogIn();
    homePage.fillLogInUsername(`${username}`);
    // homePage.fillLogInPassword(" "); --> We don't fill the password field
    homePage.clickLogInButton();

    const message = 'Please fill out Username and Password.';
    homePage.loginFailedValidationMessage(message);
  });

  it("SQL Injection attempts in password field", () => {
    const payload = sqlPayloads.injection1["1stTry"] ||
      sqlPayloads.injection1["2ndTry"] ||
      `" OR "1"="1"`;

    // We try to log in with an SQL Injection payload in the password field
    homePage.clickLogIn();
    homePage.fillLogInUsername(`${username}`);
    homePage.fillLogInPassword(payload);
    homePage.clickLogInButton();
    
    // We expect to see an alert indicating a wrong password as the website should NOT allow SQL Injection
    const message = 'Wrong password.';
    homePage.loginFailedValidationMessage(message);
  })

  it("Validate close button works on login modal", () => {
    // We open the login modal and then close it using the cancel button
    homePage.clickLogIn();
    homePage.fillLogInUsername(`${username}`);
    homePage.fillLogInPassword(`${password}`);
    homePage.clickLogInCancelButton();

    // We validate that the login modal is closed by checking that the login button in the navbar is visible again
    homePage.validateLogInModalClosure();
  });
});