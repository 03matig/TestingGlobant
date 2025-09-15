class Home {
    elements = {
        // Navbar
        homeButton: () => cy.get("#menu-item-1226 > a"),
        storeButton: () => cy.get("#menu-item-1227 > a"),
        menButton: () => cy.get("#menu-item-1228 > a"),
        womenButton: () => cy.get("#menu-item-1229 > a"),
        accesoriesButton: () => cy.get("#menu-item-1230 > a"),
        accountButton: () => cy.get("#menu-item-1237 > a"),
        aboutButton: () => cy.get("#menu-item-1232 > a"),
        contactUsButton: () => cy.get("#menu-item-1233 > a"),
        shoppingBag: () => cy.get("#ast-site-header-cart > div.ast-site-header-cart-li > a > div > span"),

        // Header
        headerText: () => cy.get("h1.alignwide")
        // Featured Products
    }

    validateAccessToHomePage(){
        this.elements.headerText()
            .should("be.visible")
            .and("contain", "Raining Offers for Hot Summer!")
    }

    clickHomeButton(){
        this.elements.homeButton().click();
    }

    clickStoreButton(){
        this.elements.storeButton().click();
    }

    clickMenButton(){
        this.elements.menButton().click();
    }

    clickWomenButton(){
        this.elements.womenButton().click();
    }
    
    clickAccesoriesButton(){
        this.elements.accesoriesButton().click();
    }

    clickAccountButton(){
        this.elements.accountButton().click();
    }

    clickAboutButton(){
        this.elements.aboutButton().click();
    }

    clickContactUsButton(){
        this.elements.contactUsButton().click();
    }

    hoverShoppingBag(){
        this.elements.shoppingBag().trigger("mouseover");
    }
}

module.exports = new Home();