class Account {
    elements = {
        validateAccessToAccountPage: () => cy.get("h1.has-text-align-center"),

        // Register selectors
        registerUsernameInput: () => cy.get("#reg_username"),
        registerEmailInput: () => cy.get("#reg_email"),
        registerPasswordInput: () => cy.get("#reg_password"),
        registerSubmitButton: () => cy.get("#customer_login > div.u-column2.col-2 > form > p:nth-child(5) > button"),
        checkRegistrationText: () => cy.get("div.woocommerce-MyAccount-content > p"),

        // Log out
        logOutAnchor: () => cy.get("div.woocommerce-MyAccount-content > p > a"),

        // Login selectors
        loginUsernameEmailInput: () => cy.get("#username"),
        loginPasswordInput: () => cy.get("#password"),
        loginRememberMeCheckbox: () => cy.get("#rememberme"),
        loginSubmitButton: () => cy.get("#customer_login > div.u-column1.col-1 > form > p:nth-child(3) > button"),

        // ErrorMessage
        errorMessageListIndex: () => cy.get("ul.woocommerce-error > li")
    }

    accessToAccountPageValidation(){
        this.elements.validateAccessToAccountPage()
            .should("be.visible")
            .and("contain", "Account");
    }

    typeUsernameOnRegisterForm(username){
        this.elements.registerUsernameInput().type(username);
    }

    typeEmailOnRegisterForm(email){
        this.elements.registerEmailInput().type(email);
    }

    typePasswordOnRegisterForm(password){
        this.elements.registerPasswordInput().type(password);
    }

    clickSubmitOnRegisterForm(){
        this.elements.registerSubmitButton().click();
    }

    validateRegistrationOrLogin(username){
        this.elements.checkRegistrationText()
            .should("be.visible")
            .and("contain", `Hello ${username} (not ${username}? Log out)`);
    }

    clickLogOutAnchor(){
        this.elements.logOutAnchor().contains('Log out').click();
    }

    typeUsernameOnLoginForm(username){
        this.elements.loginUsernameEmailInput().type(username);
    }

    typeEmailOnLoginForm(email){
        this.elements.loginUsernameEmailInput().type(email);
    }

    typePasswordOnLoginForm(password){
        this.elements.loginPasswordInput().type(password)
    }

    checkRememberMeCheckBox(){
        this.elements.loginRememberMeCheckbox();
    }

    clickSubmitOnLoginForm(){
        this.elements.loginSubmitButton().click();
    }

    getErrorMessage(message){
        this.elements.errorMessageListIndex()
            .should("be.visible")
            .and("contain", message);
    }

    getErrorInvalidEmailFormat(message){
        this.elements.registerEmailInput().then(($input) => {
            expect($input[0].validationMessage).to.eq(message);
        })
    }
}

module.exports = new Account();