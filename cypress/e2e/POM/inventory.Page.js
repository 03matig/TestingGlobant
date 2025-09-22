class InventoryPage {
    elements = {
        firstProductAddToCartButton: () => cy.get('#add-to-cart-sauce-labs-backpack', { timeout: 10000 }),
        secondProductAddToCartButton: () => cy.get('#add-to-cart-sauce-labs-bike-light', { timeout: 10000 }),
        thirdProductAddToCartButton: () => cy.get('#add-to-cart-sauce-labs-bolt-t-shirt', { timeout: 10000 }),
        fourthProductAddToCartButton: () => cy.get('#add-to-cart-sauce-labs-fleece-jacket', { timeout: 10000 }),
        fifthProductAddToCartButton: () => cy.get('#add-to-cart-sauce-labs-onesie', { timeout: 10000 }),
        sixthProductAddToCartButton: () => cy.get('#add-to-cart-test.allthethings()-t-shirt-(red)', { timeout: 10000 }),

        // Remove buttons
        firstProductRemoveButton: () => cy.get('#remove-sauce-labs-backpack', { timeout: 10000 }),
        secondProductRemoveButton: () => cy.get('#remove-sauce-labs-bike-light', { timeout: 10000 }),
        thirdProductRemoveButton: () => cy.get('#remove-sauce-labs-bolt-t-shirt', { timeout: 10000 }),
        fourthProductRemoveButton: () => cy.get('#remove-sauce-labs-fleece-jacket', { timeout: 10000 }),
        fifthProductRemoveButton: () => cy.get('#remove-sauce-labs-onesie', { timeout: 10000 }),
        sixthProductRemoveButton: () => cy.get('#remove-test.allthethings()-t-shirt-(red)', { timeout: 10000 }),

        // Sidebar
        sidebarBurgerButton: () => cy.get('#react-burger-menu-btn'),
        sidebarLogoutButton: () => cy.get('#logout_sidebar_link'),
        
        // Shopping Cart
        shoppingCartItemsAmount: () => cy.get('#shopping_cart_container > a > span'),
        shoppingCartAnchor: () => cy.get('#shopping_cart_container > a'),
    }

    validateLoginAccessSuccessful() {
        cy.url().should('include', '/inventory.html');
    }

    getShoppingCartItemsAmount() {
        return this.elements.shoppingCartItemsAmount()
        .invoke('text')
            .then((text) => {
            const value = parseInt(text.trim(), 10);
            return value;
        });
    }

    addFirstProductToCart() {
        this.elements.firstProductAddToCartButton().click();
    }

    addSecondProductToCart() {
        this.elements.secondProductAddToCartButton().click();
    }

    addThirdProductToCart() {
        this.elements.thirdProductAddToCartButton().click();
    }

    addFourthProductToCart() {
        this.elements.fourthProductAddToCartButton().click();
    }

    addFifthProductToCart() {
        this.elements.fifthProductAddToCartButton().click();
    }

    addSixthProductToCart() {
        this.elements.sixthProductAddToCartButton().click();
    }

    removeFirstProductFromCart() {
        this.elements.firstProductRemoveButton().click();
    }

    removeSecondProductFromCart() {
        this.elements.secondProductRemoveButton().click();
    }

    removeThirdProductFromCart() {
        this.elements.thirdProductRemoveButton().click();
    }

    removeFourthProductFromCart() {
        this.elements.fourthProductRemoveButton().click();
    }

    removeFifthProductFromCart() {
        this.elements.fifthProductRemoveButton().click();
    }

    removeSixthProductFromCart() {
        this.elements.sixthProductRemoveButton().click();
    }

    validateProductAdditionToCart(amountBeforeAddition) {
        this.getShoppingCartItemsAmount().then((amountAfterAddition) => {
            expect(amountAfterAddition).to.equal(amountBeforeAddition + 1);
        });
    }

    validateProductRemovalFromCart(amountBeforeRemoval) {
        this.getShoppingCartItemsAmount().then((amountAfterRemoval) => {
            expect(amountAfterRemoval).to.equal(amountBeforeRemoval - 1);
        });
    }

    clickShoppingCartAnchor() {
        this.elements.shoppingCartAnchor().click();
    }

    clickSidebarBurgerButton() {
        this.elements.sidebarBurgerButton().click();
    }

    clickSidebarLogoutButton() {
        this.elements.sidebarLogoutButton().click();
    }

    validateLogOutSuccessful() {
        cy.url().should('include', '/');
    }
}

module.exports = new InventoryPage();