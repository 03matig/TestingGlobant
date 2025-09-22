const loginPage = require("../POM/login.Page");
const inventoryPage = require("../POM/inventory.Page");

const baseUrl = Cypress.env("baseUrl") || Cypress.config("baseUrl");
const username = Cypress.env("username");
const password = Cypress.env("password");


describe("Login tests for Saucedemo website", () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        console.log("Base URL: " + baseUrl);
        cy.visit(baseUrl);
    });

    it("Login with valid credentials", () => {
        loginPage.enterUsername(username);
        loginPage.enterPassword(password);
        loginPage.clickLoginButton();

        inventoryPage.validateLoginAccessSuccessful();
    });

    it("Login with invalid credentials", () => {
        loginPage.enterUsername(`123${username}`);
        loginPage.enterPassword(password);
        loginPage.clickLoginButton();

        const message = "Epic sadface: Username and password do not match any user in this service";
        loginPage.validateErrorMessage(message);
    });

    it("Login with empty username credential", () => {
        loginPage.enterPassword(password);
        loginPage.clickLoginButton();

        const message = "Epic sadface: Username is required";
        loginPage.validateErrorMessage(message);
    });

    it("Login with empty password credential", () => {
        loginPage.enterUsername(username);
        loginPage.clickLoginButton();

        const message = "Epic sadface: Password is required";
        loginPage.validateErrorMessage(message);
    });

    it("Login successful with all users", () => {
        cy.fixture("Usuarios").then((usuarios) => {
            usuarios.forEach((usuario) => {
                loginPage.enterUsername(usuario.username);
                loginPage.enterPassword(usuario.password);
                loginPage.clickLoginButton();

                if(usuario.username !== "locked_out_user") {
                    inventoryPage.validateLoginAccessSuccessful();
                    inventoryPage.clickSidebarBurgerButton();
                    inventoryPage.clickSidebarLogoutButton();
                    inventoryPage.validateLogOutSuccessful();
                } else {
                    const message = "Epic sadface: Sorry, this user has been locked out.";
                    loginPage.validateErrorMessage(message);
                    loginPage.emptyUsernameInput();
                    loginPage.emptyPasswordInput();
                }
            });
        });
    });
});