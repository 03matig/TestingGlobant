class LoginPage {
    elements = {
        usernameInput: () => cy.get('#user-name'),
        passwordInput: () => cy.get('#password'),
        loginButton: () => cy.get('#login-button'),
        errorMessage: () => cy.get('h3[data-test="error"]')
    }

    enterUsername(username) {
        this.elements.usernameInput().type(username);
    }

    enterPassword(password) {
        this.elements.passwordInput().type(password);
    }

    emptyUsernameInput() {
        this.elements.usernameInput().clear();
    }

    emptyPasswordInput() {
        this.elements.passwordInput().clear();
    }

    clickLoginButton() {
        this.elements.loginButton().click();
    }

    getErrorMessage() {
        return this.elements.errorMessage();
    }

    validateErrorMessage(expectedMessage) {
        this.getErrorMessage()
            .should('be.visible')
            .and('have.text', expectedMessage);
    }

    login(username, password) {
        this.enterUsername(username);
        this.enterPassword(password);
        this.clickLoginButton();
    }
}

module.exports = new LoginPage();