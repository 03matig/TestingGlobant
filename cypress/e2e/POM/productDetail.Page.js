class ProductDetail {
    elements = {
        productNameHeader: () => cy.get('h2.name'),
        addToCartButton: () => cy.get('a.btn.btn-success.btn-lg')
    }

    validateAccessToProductDetail(){
        this.elements.productNameHeader().should('be.visible');
    }

    clickAddToCart(){
        this.elements.addToCartButton().click();
    }

    validateAddToCartAlert(message) {
        cy.on('window:alert', (str) => {
            expect(str).to.equal(message);
        });
    }
}

module.exports = new ProductDetail();