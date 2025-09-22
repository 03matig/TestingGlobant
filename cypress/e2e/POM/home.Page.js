class Home {
    elements = {
        // Sign In Functionality
        navSignIn: () => cy.get('#signin2'),
        signUpUsername:() => cy.get('#sign-username'),
        signUpPassword:() => cy.get('#sign-password'),
        signUpButton:() => cy.get("button[onclick='register()']"),
        signUpCancelButton:() => cy.get('#signInModal > div > div > div.modal-footer > button.btn.btn-secondary'),

        // Log In Functionality
        navLogIn: () => cy.get('#login2'),
        logInUsername: () => cy.get('#loginusername'),
        logInPassword: () => cy.get('#loginpassword'),
        logInButton: () => cy.get("button[onclick='logIn()']"),
        logInCancelButton: () => cy.get('#logInModal > div > div > div.modal-footer > button.btn.btn-secondary'),
        logInValidationText: () => cy.get("#nameofuser"),

        // Log Out Functionality
        navLogOut: () => cy.get('#logout2'),

        // Cart Functionality
        navCart: () => cy.get('#cartur'),
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

    fillSignUpPassword(password) {
        this.elements.signUpPassword().clear().type(password);
    }

    clickSignUpButton() {
        this.elements.signUpButton().click();
    }

    clickSignUpCancelButton() {
        this.elements.signUpCancelButton().click();
    }

    validateSignUpAlert() {
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Sign up successful.');
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

    fillLogInPassword(password) {
        this.elements.logInPassword().clear().type(password);
    }

    clickLogInButton() {
        this.elements.logInButton().click();
    }

    clickLogInCancelButton() {
        this.elements.logInCancelButton().click();
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
}

module.exports = new Home();