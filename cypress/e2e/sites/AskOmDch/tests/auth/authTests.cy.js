// En primer lugar, procederemos a importar el modelado de objetos en base a las vistas de la página (POM) que estaremos testeando.
const homePage = require("./pages/home.Page");
const accountPage = require("./pages/account.Page");

// En segundo lugar, procederemos a definir las variables base que estaremos utilizando en nuestro set de pruebas, por medio de variables de entorno.
const baseUrl = Cypress.env("baseUrl");
const username = Cypress.env("env.username");
const email = Cypress.env("env.email");
const password = Cypress.env("env.password");

sqlPayloads = {
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
/*
xssPayloads = {
    "CrossSiteScript1": {
        "1stTry": "<script><script>",
        "2ndTry": ""
    },
        "CrossSiteScript2": {
        "1stTry": "",
        "2ndTry": ""
    },
        "CrossSiteScript3": {
        "1stTry": "",
        "2ndTry": ""
    }

}
*/

describe("Inicio de Sesión", () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit(baseUrl);
        homePage.validateAccessToHomePage();
        homePage.clickAccountButton();
        accountPage.accessToAccountPageValidation();
    })

    it("Debería ser exitoso, inicio de sesión con correo", () => {
        const email = Cypress.env("env.email");
        accountPage.typeEmailOnLoginForm(email);
        const password = Cypress.env("env.password");
        accountPage.typePasswordOnLoginForm(password);
        accountPage.clickSubmitOnLoginForm();
        accountPage.validateRegistrationOrLogin();
    })

    it("Debería ser exitoso, inicio de sesión con nombre de usuario", () => {
        const username = Cypress.env("env.username");
        accountPage.typeUsernameOnLoginForm(username);
        const password = Cypress.env("env.password");
        accountPage.typePasswordOnLoginForm(password);
        accountPage.clickSubmitOnLoginForm();
        accountPage.validateRegistrationOrLogin();
    })

    it("Debería fallar, SQL Injection al campo de contraseña", () => {
        const user = Cypress.env("env.username") || Cypress.env("env.email");
        const payload =
            sqlPayloads.injection1["1stTry"] ||
            sqlPayloads.injection1['2ndTry'] ||
            `" OR "1"="1"`;

        accountPage.typeUsernameOnLoginForm(user);
        accountPage.typePasswordOnLoginForm(payload);
        accountPage.clickSubmitOnLoginForm();

        const message = `Error: The password you entered for the username ${user} is incorrect. Lost your password?`;
        accountPage.getErrorMessage(message);
    });

    it("Debería fallar, formato inválido de correo electrónico", () => {
        // En login WooCommerce acepta 'username' o 'email' en el mismo campo;
        // un email inválido actúa como username inexistente → error genérico
        const badEmail = "no-es-un-email";
        const pass = Cypress.env("env.password");

        accountPage.typeEmailOnLoginForm(badEmail);
        accountPage.typePasswordOnLoginForm(pass);
        accountPage.clickSubmitOnLoginForm();

        const message = 'Unknown email address. Check again or try your username.';
        accountPage.getErrorMessage(message);
    });

    it("Debería fallar, contraseña incorrecta", () => {
        const user = Cypress.env("env.username") || Cypress.env("env.email");
        const wrongPass = "this-is-definitely-wrong-123!";

        accountPage.typeUsernameOnLoginForm(user);
        accountPage.typePasswordOnLoginForm(wrongPass);
        accountPage.clickSubmitOnLoginForm();

        const message = `Error: The password you entered for the username ${user} is incorrect.`;

        accountPage.getErrorMessage(message);
            expect(t).to.include("incorrect"); // suele decir “the password you entered is incorrect”
    });

    /* Este test todavía no sé cómo validarlo bien, puesto que si abro una nueva página sin
    darle check al checkbox, el comportamiento es el mismo que si lo marco.
    it("Debería ser exitoso, validación de checkbox de 'Remember Me'", () => {
        const user = Cypress.env("env.username") || Cypress.env("env.email");
        const pass = Cypress.env("env.password");

        accountPage.typeUsernameOnLoginForm(user);
        accountPage.typePasswordOnLoginForm(pass);

        // Nota: tu método del POM no marca; si no lo modificaste, forzamos el check explícito aquí:
        accountPage.checkRememberMeCheckBox();

        accountPage.clickSubmitOnLoginForm();

        // Validamos sesión iniciada (uso el mismo texto que tus otras pruebas)
        // Si tu método requiere username exacto y logueas con email, puedes omitirlo
        // y solo verificar contenido de My Account:
        accountPage.validateRegistrationOrLogin(user);
    }); */

    it("Debería fallar, campo vacío de username/email", () => {
        // Dejamos vacío username/email
        const pass = Cypress.env("env.password");

        // No tipeamos usuario
        accountPage.typePasswordOnLoginForm(pass);
        accountPage.clickSubmitOnLoginForm();
        
        const message = "Error: Username is required.";
        accountPage.getErrorMessage(message);
    });

    it("Debería fallar, campo vacío de contraseña", () => {
        const user = Cypress.env("env.username") || Cypress.env("env.email");

        accountPage.typeUsernameOnLoginForm(user);
        // No tipeamos password
        accountPage.clickSubmitOnLoginForm();

        const message = "Error: The password field is empty.";
        accountPage.getErrorMessage(message);
    });


    it("Debería ser exitoso, registrar un usuario nuevo e iniciar sesión con el usuario creado", () => {
        cy.fixture("Usuarios").then((usuarios) => {
            usuarios.forEach((usuario) => {
                // Sign Up
                accountPage.typeUsernameOnRegisterForm(usuario.username);
                accountPage.typeEmailOnRegisterForm(usuario.email);
                accountPage.typePasswordOnRegisterForm(usuario.password);
                accountPage.clickSubmitOnRegisterForm();
                accountPage.validateRegistrationOrLogin(usuario.username);

                accountPage.clickLogOutAnchor();

                // Login
                accountPage.typeEmailOnLoginForm(usuario.email);
                accountPage.typePasswordOnLoginForm(usuario.password);
                accountPage.clickSubmitOnLoginForm();
                accountPage.validateRegistrationOrLogin();
            })
        })
    })
});

describe("Set de pruebas E2E orientadas al registro de cada usuario", () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit(baseUrl);
        homePage.validateAccessToHomePage();
        homePage.clickAccountButton();
        accountPage.accessToAccountPageValidation();
    })

    it("Debería ser exitoso, registro simple de usuario", () => {
        // Generamos credenciales únicas para evitar usuarios duplicados
        const ts = Date.now();
        const user = Cypress.env("env.username");
        const email = Cypress.env("env.email");
        const password = Cypress.env("env.password");
        const newUser = `qa_${user}_${ts}`;
        const newEmail = `qa_${email}`;
        const newPass = `Qa!${password}`; // fuerte/suficientemente complejo

        // Registro
        accountPage.typeUsernameOnRegisterForm(newUser);
        accountPage.typeEmailOnRegisterForm(newEmail);
        accountPage.typePasswordOnRegisterForm(newPass);
        accountPage.clickSubmitOnRegisterForm();

        // Validación: saludo en panel de cuenta
        accountPage.validateRegistrationOrLogin(newUser);
           
        // Logout para dejar estado limpio
        accountPage.clickLogOutAnchor();

        // Login con el usuario recién creado para verificar que quedó usable
        accountPage.typeEmailOnLoginForm(newEmail);
        accountPage.typePasswordOnLoginForm(newPass);
        accountPage.clickSubmitOnLoginForm();

        accountPage.validateRegistrationOrLogin(newUser);
    });


    it("Debería fallar, formato inválido de correo electrónico", () => {
        const ts = Date.now();
        const badEmail = "no-es-un-email"; // formato inválido
        const user = `qa_user_${ts}`;
        const pass = `Qa!${ts}abc`;

        accountPage.typeUsernameOnRegisterForm(user);
        accountPage.typeEmailOnRegisterForm(badEmail);
        accountPage.typePasswordOnRegisterForm(pass);
        accountPage.clickSubmitOnRegisterForm();

        cy.get("ul.woocommerce-error li")
            .should("be.visible")
            .and(($li) => {
            const t = $li.text().toLowerCase();
            expect(t).to.satisfy((txt) =>
                txt.includes("valid email") || txt.includes("email address") || txt.includes("invalid")
            );
            });
    });


    it("Debería fallar, caracteres especiales en el usuario", () => {
    const ts = Date.now();
    const badUser = "inv@lid user*"; // caracteres no permitidos/espacios
    const email = `qa_${ts}@mailinator.com`;
    const pass = `Qa!${ts}abc`;

    accountPage.typeUsernameOnRegisterForm(badUser);
    accountPage.typeEmailOnRegisterForm(email);
    accountPage.typePasswordOnRegisterForm(pass);
    accountPage.clickSubmitOnRegisterForm();

    cy.get("ul.woocommerce-error li")
        .should("be.visible")
        .and(($li) => {
        const t = $li.text().toLowerCase();
        // WooCommerce típico: “Please enter a valid account username.”
        expect(t).to.include("valid").and.include("username");
        });
    });


    it("Debería fallar, campo vacío de username", () => {
    const ts = Date.now();
    const email = `qa_${ts}@mailinator.com`;
    const pass = `Qa!${ts}abc`;

    // username vacío
    accountPage.typeEmailOnRegisterForm(email);
    accountPage.typePasswordOnRegisterForm(pass);
    accountPage.clickSubmitOnRegisterForm();

    cy.get("ul.woocommerce-error li")
        .should("be.visible")
        .and(($li) => {
        const t = $li.text().toLowerCase();
        expect(t).to.satisfy((txt) =>
            txt.includes("username") && (txt.includes("required") || txt.includes("enter"))
        );
        });
    });


    it("Debería fallar, campo vacío de email", () => {
    const ts = Date.now();
    const user = `qa_user_${ts}`;
    const pass = `Qa!${ts}abc`;

    accountPage.typeUsernameOnRegisterForm(user);
    // email vacío
    accountPage.typePasswordOnRegisterForm(pass);
    accountPage.clickSubmitOnRegisterForm();

    cy.get("ul.woocommerce-error li")
        .should("be.visible")
        .and(($li) => {
        const t = $li.text().toLowerCase();
        expect(t).to.satisfy((txt) =>
            txt.includes("email") && (txt.includes("valid") || txt.includes("required"))
        );
        });
    });


    it("Debería fallar, campo vacío de password", () => {
    const ts = Date.now();
    const user = `qa_user_${ts}`;
    const email = `qa_${ts}@mailinator.com`;

    accountPage.typeUsernameOnRegisterForm(user);
    accountPage.typeEmailOnRegisterForm(email);
    // password vacío
    accountPage.clickSubmitOnRegisterForm();

    cy.get("ul.woocommerce-error li")
        .should("be.visible")
        .and(($li) => {
        const t = $li.text().toLowerCase();
        // “Please enter an account password.” / “password is required”
        expect(t).to.satisfy((txt) =>
            txt.includes("password") && (txt.includes("enter") || txt.includes("required"))
        );
        });
    });
});