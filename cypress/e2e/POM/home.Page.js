class Home {
    elements = {
        // Sign In Functionality
        navSignIn: () => cy.get('#signin2'),
        signInModalHeader: () => cy.get('#signInModalLabel'),
        signUpUsername:() => cy.get('#sign-username'),
        signUpPassword:() => cy.get('#sign-password'),
        signUpButton:() => cy.get("button[onclick='register()']"),
        signUpCancelButton:() => cy.get('#signInModal > div > div > div.modal-footer > button.btn.btn-secondary'),

        // Log In Functionality
        navLogIn: () => cy.get('#login2'),
        logInModalHeader: () => cy.get('#logInModalLabel'),
        logInUsername: () => cy.get('#loginusername'),
        logInPassword: () => cy.get('#loginpassword'),
        logInButton: () => cy.get("button[onclick='logIn()']"),
        logInCancelButton: () => cy.get('#logInModal > div > div > div.modal-footer > button.btn.btn-secondary'),
        logInValidationText: () => cy.get("#nameofuser"),

        // Log Out Functionality
        navLogOut: () => cy.get('#logout2'),

        // Cart Functionality
        navCart: () => cy.get('#cartur'),

        // Products
        productContainer: () => cy.get('a.hrefch')
    }

    // ------------------------------------------
    // Sign Up Methods
    // ------------------------------------------

    clickSignUp() {
        this.elements.navSignIn().click();
    }

    fillSignUpUsername(username) {
        this.elements.signUpUsername().clear().type(username);
    }

    validateSignUpUsernameFieldEmpty() {
        this.elements.signUpUsername().should('be.empty');
    }

    fillSignUpPassword(password) {
        this.elements.signUpPassword().clear().type(password);
    }

    validateSignUpPasswordFieldEmpty() {
        this.elements.signUpPassword().should('be.empty');
    }

    clickSignUpButton() {
        this.elements.signUpButton().click();
    }

    clickSignUpCancelButton() {
        this.elements.signUpCancelButton().click();
    }

    validateSignUpModalClosure() {
        this.elements.signInModalHeader().should('not.be.visible');
    }

    validateSignUpAlert(message) {
        cy.on('window:alert', (str) => {
            expect(str).to.equal(message);
        });
    }

    // ------------------------------------------
    // Log In Methods
    // ------------------------------------------

    clickLogIn() {
        this.elements.navLogIn().click();
    }

    fillLogInUsername(username) {
        this.elements.logInUsername().clear().type(username);
    }

    validateLogInUsernameFieldEmpty() {
        this.elements.logInUsername().should('be.empty');
    }

    fillLogInPassword(password) {
        this.elements.logInPassword().clear().type(password);
    }

    validateLogInPasswordFieldEmpty() {
        this.elements.logInPassword().should('be.empty');
    }

    clickLogInButton() {
        this.elements.logInButton().click();
    }

    clickLogInCancelButton() {
        this.elements.logInCancelButton().click();
    }

    validateLogInModalClosure() {
        this.elements.logInModalHeader().should('not.be.visible');
    }

    loginFailedValidationMessage(message) {
        cy.on('window:alert', (str) => {
            expect(str).to.equal(message);
        });
    }

    validateLogIn(username) {
        this.elements.logInValidationText().should('contain.text', `Welcome ${username}`);
    }

    // ------------------------------------------
    // Log Out Methods
    // ------------------------------------------

    clickLogOut() {
        this.elements.navLogOut().click();
    }

    validateLogOut() {
        this.elements.navLogIn().should('be.visible');
    }

    // ------------------------------------------
    // Cart Methods
    // ------------------------------------------

    clickCart() {
        this.elements.navCart().click();
    }

    // ------------------------------------------
    // Products Methods
    // ------------------------------------------

    getEachProductContainer() {
    return cy.get('a.hrefch').then(($products) => {
        // $products es un objeto jQuery con todos los elementos encontrados
        const items = [];
        $products.each((i, el) => {
            items.push(el.innerText); // o puedes usar Cypress.$(el).attr('href')
        });
        return items; // Devuelves un array plano de textos/atributos
    });
    }

    goToProductDetail(index){
        this.elements.productContainer().eq(index).click();
    }

    goToFirstProductDetail(){
        this.elements.productContainer().first().click();
    }
}

module.exports = new Home();