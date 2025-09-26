class Checkout {
    elements = {
        cartHeaderSelector: () => cy.get('h2'),
        placeOrderButton: () => cy.get('button.btn.btn-success'),
        deleteProductFromCartButton: () => cy.get('#tbodyid > tr > td:nth-child(4) > a'),
        placeOrderNameInput: () => cy.get('#name'),
        placeOrderCountryInput: () => cy.get('#country'),
        placeOrderCityInput: () => cy.get('#city'),
        placeOrderCreditCardInput: () => cy.get('#card'),
        placeOrderMonthInput: () => cy.get('#month'),
        placeOrderYearInput: () => cy.get('#year'),
        purchaseButton: () => cy.get('#orderModal > div > div > div.modal-footer > button.btn.btn-primary'),
        closeButton: () => cy.get('#orderModal > div > div > div.modal-footer > button.btn.btn-secondary'),

        validatePurchaseModal: () => cy.get('body > div.sweet-alert.showSweetAlert.visible'),
        OKModalButton: () => cy.get('body > div.sweet-alert.showSweetAlert.visible > div.sa-button-container > div > button')
    }

    validateAccessToCart(){
        this.elements.cartHeaderSelector()
            .should('be.visible')
            .and('contain', 'Products');
    }

    clickPlaceOrder() {
        this.elements.placeOrderButton().click();
    }

    deleteProductFromCart() {
        this.elements.deleteProductFromCartButton().click();
    }

    validateProductDeletionFromCart() {
        this.elements.deleteProductFromCartButton().should('not.exist');
    }

    fillPlaceOrderName(name) {
        this.elements.placeOrderNameInput().clear().type(name);
    }

    fillPlaceOrderCountry(country) {
        this.elements.placeOrderCountryInput().clear().type(country);
    }

    fillPlaceOrderCity(city) {
        this.elements.placeOrderCityInput().clear().type(city);
    }

    fillPlaceOrderCreditCard(creditCard) {
        this.elements.placeOrderCreditCardInput().clear().type(creditCard);
    }

    fillPlaceOrderMonth(month) {
        this.elements.placeOrderMonthInput().clear().type(month);
    }

    fillPlaceOrderYear(year) {
        this.elements.placeOrderYearInput().clear().type(year);
    }

    clickPurchase() {
        this.elements.purchaseButton().click();
    }

    clickClose() {
        this.elements.closeButton().click();
    }

    purchaseErrorMessage(message, keyword){
        cy.on('window:alert', (str) => {
            expect(str).to.eql(message) || expect(str).to.contain(keyword);
        });
    }

    validatePurchaseModal() {
        this.elements.validatePurchaseModal().should('be.visible').and('contain', 'Thank you for your purchase!');
    }

    clickOKModalButton() {
        this.elements.OKModalButton().click();
    }
}

module.exports = new Checkout();