class ShoppingCartPage {
    elements = {
        shoppingCartTitle: () => cy.get('span.title'),
        cartItem: () => cy.get('div.cart_item'),
        cartItemPrice: () => cy.get('div.cart_item > div > div > div.inventory_item_price'),
        checkoutButton: () => cy.get('#checkout'),
    }

    validateAccessToShoppingCartPage() {
        this.elements.shoppingCartTitle()
            .should('be.visible')
            .and('have.text', 'Your Cart');
    }

    countCartItems() {
        // devuelve el número de items en el carrito
        return this.elements.cartItem().its('length');
    }

    validateItemsInShoppingCart(expectedAmount) {
        this.countCartItems().should('eq', expectedAmount);
    }

    clickCheckoutButton() {
        this.elements.checkoutButton().click();
    }

    getAllCartItemsPrices() {
        return this.elements.cartItemPrice().then(($prices) => {
            return Cypress._.map($prices, (el) => {
                const text = el.innerText.trim(); // "$11.11"
                return parseFloat(text.replace('$', '')); // 11.11
            });
        });
    }

    getCartTotal() {
    return this.getAllCartItemsPrices().then((prices) => {
        return Cypress._.sum(prices); // número único
    });
}
}

module.exports = new ShoppingCartPage();