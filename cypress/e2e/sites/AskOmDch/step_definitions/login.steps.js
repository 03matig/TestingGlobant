// Cómo ejecutar sin Cucumber (Mocha):
// npx cypress run --spec "cypress/e2e/sites/AskOmDch/tests/authTests.cy.js"
//
// Cómo ejecutar con Cucumber (Gherkin):
// npx cypress run --spec "cypress/e2e/sites/AskOmDch/features/login.feature"

const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const homePage = require("../POM/home.Page");
const accountPage = require("../POM/account.Page");

// Payloads de SQLi para reutilizar en escenarios
const sqlPayloads = {
  injection1: { "1stTry": '" OR "1"="1"', "2ndTry": "' OR '1'='1'" },
  injection2: { "1stTry": '" OR ""=""', "2ndTry": "' OR ''=''" },
  injection3: { "1stTry": '" OR 1=1', "2ndTry": "' OR 1=1" },
};

// ------------------------
// Antecedentes
// ------------------------
Given("el usuario navega a la página de login", () => {
  cy.viewport(1920, 1080);
  cy.visit(Cypress.env("baseUrl"));
  homePage.validateAccessToHomePage();
  homePage.clickAccountButton();
  accountPage.accessToAccountPageValidation();
});

// ------------------------
// Éxito
// ------------------------
When("ingresa el correo y la contraseña correctos", () => {
  accountPage.typeEmailOnLoginForm(Cypress.env("env.email"));
  accountPage.typePasswordOnLoginForm(Cypress.env("env.password"));
});

When("ingresa el nombre de usuario y la contraseña correctos", () => {
  accountPage.typeUsernameOnLoginForm(Cypress.env("env.username"));
  accountPage.typePasswordOnLoginForm(Cypress.env("env.password"));
});

When("ingresa el usuario válido y la contraseña válida", () => {
  const user = Cypress.env("env.username") || Cypress.env("env.email");
  accountPage.typeUsernameOnLoginForm(user);
  accountPage.typePasswordOnLoginForm(Cypress.env("env.password"));
});

When("marca la opción Remember Me", () => {
  // Tu POM no hace el check explícito, así que lo forzamos aquí:
  cy.get("#rememberme").check().should("be.checked");
});

When("hace clic en el botón de iniciar sesión", () => {
  accountPage.clickSubmitOnLoginForm();
});

Then("debería ver el panel de Mi Cuenta", () => {
  // Validación genérica robusta (texto del panel)
  cy.get("div.woocommerce-MyAccount-content")
    .should("be.visible")
    .and("contain.text", "Hello");
});

Then("la sesión debería persistir al recargar o volver a /account", () => {
  cy.reload();
  cy.get("div.woocommerce-MyAccount-content").should("be.visible");

  cy.visit(`${Cypress.env("baseUrl")}/account/`);
  cy.get("div.woocommerce-MyAccount-content").should("be.visible");
});

// ------------------------
// Fallos
// ------------------------
When("ingresa un usuario válido", () => {
  const user = Cypress.env("env.username") || Cypress.env("env.email");
  accountPage.typeUsernameOnLoginForm(user);
});

When("escribe una inyección SQL en el campo contraseña", () => {
  const payload =
    sqlPayloads.injection1["1stTry"] ||
    sqlPayloads.injection1["2ndTry"] ||
    `" OR "1"="1"`;
  accountPage.typePasswordOnLoginForm(payload);
});

Then("debería ver un error de credenciales", () => {
  cy.get("ul.woocommerce-error li")
    .should("be.visible")
    .then(($li) => {
      const t = $li.text().toLowerCase();
      expect(
        t.includes("incorrect") || t.includes("invalid") || t.includes("unknown")
      ).to.eq(true);
    });
});

When("ingresa un correo con formato inválido", () => {
  accountPage.typeEmailOnLoginForm("no-es-un-email");
});

When("escribe la contraseña válida", () => {
  accountPage.typePasswordOnLoginForm(Cypress.env("env.password"));
});

Then("debería ver un error de credenciales o formato", () => {
  cy.get("ul.woocommerce-error li")
    .should("be.visible")
    .then(($li) => {
      const t = $li.text().toLowerCase();
      expect(
        t.includes("invalid") ||
          t.includes("unknown") ||
          t.includes("incorrect") ||
          t.includes("email")
      ).to.eq(true);
    });
});

When("escribe una contraseña incorrecta", () => {
  accountPage.typePasswordOnLoginForm("this-is-definitely-wrong-123!");
});

Then("debería ver un error indicando contraseña incorrecta", () => {
  cy.get("ul.woocommerce-error li")
    .should("be.visible")
    .then(($li) => {
      const t = $li.text().toLowerCase();
      expect(t.includes("incorrect")).to.eq(true);
    });
});

When("deja vacío el campo username/email", () => {
  // Aseguramos que el campo quede vacío explícitamente
  cy.get("#username").clear();
});

When("deja vacío el campo contraseña", () => {
  cy.get("#password").clear();
});

Then("debería ver un error indicando que el username es requerido", () => {
  cy.get("ul.woocommerce-error li")
    .should("be.visible")
    .then(($li) => {
      const t = $li.text().toLowerCase();
      expect(t.includes("required") || t.includes("username")).to.eq(true);
    });
});

Then("debería ver un error indicando que la contraseña es requerida", () => {
  cy.get("ul.woocommerce-error li")
    .should("be.visible")
    .then(($li) => {
      const t = $li.text().toLowerCase();
      expect(t.includes("empty") || t.includes("required") || t.includes("password")).to.eq(true);
    });
});
