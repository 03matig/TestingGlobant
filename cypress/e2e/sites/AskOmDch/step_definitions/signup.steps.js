// Cómo ejecutar sin Cucumber (Mocha):
// npx cypress run --spec "cypress/e2e/sites/AskOmDch/tests/authTests.cy.js"
//
// Cómo ejecutar con Cucumber (Gherkin):
// npx cypress run --spec "cypress/e2e/sites/AskOmDch/features/signup.feature"

const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const homePage = require("../POM/home.Page");
const accountPage = require("../POM/account.Page");

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
// Utilidad: credenciales únicas
// ------------------------
Given("que genero credenciales únicas de registro", function () {
  const ts = Date.now();
  const state = {
    username: `qa_user_${ts}`,
    email: `qa_${ts}@mailinator.com`,
    password: `Qa!${ts}abc`,
  };
  cy.wrap(state).as("regData");
});

// ------------------------
// Éxito
// ------------------------
When(
  "completo el formulario de registro con username, email y password válidos",
  function () {
    const { username, email, password } = this.regData;
    accountPage.typeUsernameOnRegisterForm(username);
    accountPage.typeEmailOnRegisterForm(email);
    accountPage.typePasswordOnRegisterForm(password);
  }
);

When("envío el formulario de registro", () => {
  accountPage.clickSubmitOnRegisterForm();
});

Then(
  "debería ver el panel de Mi Cuenta con el saludo del nuevo usuario",
  function () {
    // Tu método asume saludo con username
    accountPage.validateRegistrationOrLogin(this.regData.username);
  }
);

When("cierra sesión desde Mi Cuenta", () => {
  accountPage.clickLogOutAnchor();
});

When(
  "vuelve a iniciar sesión con el nuevo email y password",
  function () {
    const { email, password } = this.regData;
    accountPage.typeEmailOnLoginForm(email);
    accountPage.typePasswordOnLoginForm(password);
    accountPage.clickSubmitOnLoginForm();
  }
);

Then("debería ver el panel de Mi Cuenta", () => {
  cy.get("div.woocommerce-MyAccount-content")
    .should("be.visible")
    .and("contain.text", "Hello");
});

// ------------------------
// Fallos
// ------------------------
When("completo el formulario de registro con un email inválido", function () {
  const { username, password } = this.regData;
  accountPage.typeUsernameOnRegisterForm(username);
  accountPage.typeEmailOnRegisterForm("no-es-un-email");
  accountPage.typePasswordOnRegisterForm(password);
});

Then("debería ver un error indicando que el email debe ser válido", () => {
  cy.get("ul.woocommerce-error li")
    .should("be.visible")
    .then(($li) => {
      const t = $li.text().toLowerCase();
      expect(t.includes("email") && (t.includes("valid") || t.includes("required"))).to.eq(true);
    });
});

When(
  "completo el formulario de registro con un username con caracteres no permitidos",
  function () {
    const { email, password } = this.regData;
    accountPage.typeUsernameOnRegisterForm("inv@lid user*"); // especiales/espacios
    accountPage.typeEmailOnRegisterForm(email);
    accountPage.typePasswordOnRegisterForm(password);
  }
);

Then("debería ver un error indicando username inválido", () => {
  cy.get("ul.woocommerce-error li")
    .should("be.visible")
    .then(($li) => {
      const t = $li.text().toLowerCase();
      expect(t.includes("valid") && t.includes("username")).to.eq(true);
    });
});

When(
  "dejo vacío el username y completo email y password válidos",
  function () {
    const { email, password } = this.regData;
    // No tipeamos username
    accountPage.typeEmailOnRegisterForm(email);
    accountPage.typePasswordOnRegisterForm(password);
  }
);

Then("debería ver un error indicando que el username es requerido", () => {
  cy.get("ul.woocommerce-error li")
    .should("be.visible")
    .then(($li) => {
      const t = $li.text().toLowerCase();
      expect(t.includes("username") && (t.includes("required") || t.includes("enter"))).to.eq(true);
    });
});

When(
  "dejo vacío el email y completo username y password válidos",
  function () {
    const { username, password } = this.regData;
    accountPage.typeUsernameOnRegisterForm(username);
    // No tipeamos email
    accountPage.typePasswordOnRegisterForm(password);
  }
);

Then("debería ver un error indicando que el email es requerido o válido", () => {
  cy.get("ul.woocommerce-error li")
    .should("be.visible")
    .then(($li) => {
      const t = $li.text().toLowerCase();
      expect(t.includes("email") && (t.includes("valid") || t.includes("required"))).to.eq(true);
    });
});

When(
  "dejo vacío el password y completo username y email válidos",
  function () {
    const { username, email } = this.regData;
    accountPage.typeUsernameOnRegisterForm(username);
    accountPage.typeEmailOnRegisterForm(email);
    // No tipeamos password
  }
);

Then("debería ver un error indicando que el password es requerido", () => {
  cy.get("ul.woocommerce-error li")
    .should("be.visible")
    .then(($li) => {
      const t = $li.text().toLowerCase();
      expect(t.includes("password") && (t.includes("required") || t.includes("enter"))).to.eq(true);
    });
});
