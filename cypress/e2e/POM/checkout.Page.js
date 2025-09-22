class CheckoutPage {
    elements = {
        // ------------ Step 1 ------------
        checkoutTitle: () => cy.get('span.title'),
        firstNameInput: () => cy.get('#first-name'),
        lastNameInput: () => cy.get('#last-name'),
        postalCodeInput: () => cy.get('#postal-code'),
        errorMessage: () => cy.get('div.error-message-container.error'),
        continueButton: () => cy.get('#continue'),
        cancelButton: () => cy.get('#cancel'),

        // ------------ Step 2 ------------
        itemTotalLabel: () => cy.get('div.summary_subtotal_label'),
        finishButton: () => cy.get('#finish'),
        validationHeader: () => cy.get('h2.complete-header')
    }

    // ------------------------------
    // Step 1
    // ------------------------------
    validateAccessToCheckoutPage() {
        this.elements.checkoutTitle()
            .should('be.visible')
            .and('have.text', 'Checkout: Your Information');
    }
    enterFirstName(firstName) {
        this.elements.firstNameInput()
            .type(firstName);
    }
    enterLastName(lastName) {
        this.elements.lastNameInput()
            .type(lastName);
    }
    enterPostalCode(postalCode) {
        this.elements.postalCodeInput()
            .type(postalCode);
    }
    clickContinueButton() {
        this.elements.continueButton().click();
    }
    clickCancelButton() {
        this.elements.cancelButton().click();
    }

    validateErrorMessage(expectedMessage) {
        this.elements.errorMessage()
            .should('be.visible')
            .and('have.text', expectedMessage);
    }

    proceedToOverview() {
        this.enterFirstName(firstName);
        this.enterLastName(lastName);
        this.enterPostalCode(postalCode);
        this.clickContinueButton();
    }

    // ------------------------------
    // Step 2
    // ------------------------------

    getItemTotalValue() {
        return this.elements.itemTotalLabel().invoke('text').then((text) => {
            const value = text.replace('Item total: $', '').trim();
            return parseFloat(value);
        });
    }

    validateCartTotal(expectedTotal) {
        this.getItemTotalValue().then((subtotal) => {
            expect(subtotal).to.equal(expectedTotal);
        });
    }

    clickFinishButton() {
        this.elements.finishButton().click();
    }

    validateSuccessfulOrderCompletion() {
        this.elements.validationHeader()
            .should('be.visible')
            .and('have.text', 'Thank you for your order!');
    }
}

module.exports = new CheckoutPage();
