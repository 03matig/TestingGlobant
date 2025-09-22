const loginPage = require("../POM/login.Page");
const inventoryPage = require("../POM/inventory.Page");
const shoppingCartPage = require("../POM/shoppingCart.Page");
const checkoutPage = require("../POM/checkout.Page");

const baseUrl = Cypress.env("baseUrl") || Cypress.config("baseUrl");
const username = Cypress.env("username");
const password = Cypress.env("password");
const firstname = Cypress.env("firstname");
const lastname = Cypress.env("lastname");
const zipcode = Cypress.env("zipcode");

const productsToAdd = [
  () => inventoryPage.addFirstProductToCart(),
  () => inventoryPage.addSecondProductToCart(),
  () => inventoryPage.addThirdProductToCart()
];

describe("Saucedemo website tests for full buying products functionality", () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit(baseUrl);
        loginPage.login(username, password);
        inventoryPage.validateLoginAccessSuccessful();

    });

    it("Should be successful, add first product to shopping cart and proceed to checkout", () => {
        inventoryPage.addFirstProductToCart();
        inventoryPage.validateProductAdditionToCart(0);
        inventoryPage.clickShoppingCartAnchor();

        shoppingCartPage.validateAccessToShoppingCartPage();
        shoppingCartPage.validateItemsInShoppingCart(1);

        // Aquí usamos .then() porque getAllCartItemsPrices devuelve un Cypress chainable
        shoppingCartPage.getCartTotal().then((cartTotal) => {
            shoppingCartPage.clickCheckoutButton();

            checkoutPage.validateAccessToCheckoutPage();
            checkoutPage.enterFirstName(firstname);
            checkoutPage.enterLastName(lastname);
            checkoutPage.enterPostalCode(zipcode);
            checkoutPage.clickContinueButton();

            // Validación directa: número vs número
            checkoutPage.validateCartTotal(cartTotal);
            checkoutPage.clickFinishButton();
            checkoutPage.validateSuccessfulOrderCompletion();
        });
    });

    it("Validate that Price Total in Checkout Overview matches the sum of item prices in the cart", () => {
        // Recorremos el array y hacemos pruebas incrementales
        productsToAdd.forEach((addProduct, index) => { // addProduct: elemento actual del array, index: índice actual
            const expectedCount = index + 1; // 1 → 2 → 3

            // Agregar producto y validar carrito
            addProduct();
            inventoryPage.validateProductAdditionToCart(index); // index = cantidad antes de añadir

            inventoryPage.clickShoppingCartAnchor();

            shoppingCartPage.validateAccessToShoppingCartPage();
            shoppingCartPage.validateItemsInShoppingCart(expectedCount);

            // Obtenemos la suma de precios del carrito
            shoppingCartPage.getCartTotal().then((cartTotal) => {
                shoppingCartPage.clickCheckoutButton();

                checkoutPage.validateAccessToCheckoutPage();
                checkoutPage.enterFirstName(firstname);
                checkoutPage.enterLastName(lastname);
                checkoutPage.enterPostalCode(zipcode);
                checkoutPage.clickContinueButton();

                // Validamos que Checkout Overview muestre la misma suma
                checkoutPage.validateCartTotal(cartTotal);

                // No terminamos la orden, volvemos atrás para el siguiente loop
                cy.go("back"); // vuelve desde overview → checkout step 1
                cy.go("back"); // vuelve desde step 1 → carrito
                cy.go("back"); // vuelve desde carrito → inventario
            });
        });
    });

    // Fails because the HTML attribute 'span' disappears when the cart is empty
    it("Add first product to cart and then remove it", () => {
        inventoryPage.addFirstProductToCart();
        inventoryPage.validateProductAdditionToCart(0);
        // Remove item
        inventoryPage.removeFirstProductFromCart();
        inventoryPage.validateProductRemovalFromCart(1);
    });
});

describe("Saucedemo website tests for Personal Information form validation", () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit(baseUrl);
        loginPage.login(username, password);
        inventoryPage.validateLoginAccessSuccessful();

        inventoryPage.addFirstProductToCart();
        inventoryPage.validateProductAdditionToCart(0);
        inventoryPage.clickShoppingCartAnchor();

        shoppingCartPage.validateAccessToShoppingCartPage();
        shoppingCartPage.clickCheckoutButton();
        checkoutPage.validateAccessToCheckoutPage();
    });

    // Test fails because the website wrongfully allows these inputs
    it("Writing numbers on 'First Name' and 'Last Name' fields should not be allowed", () => {
        // Enter numbers in the name fields
        checkoutPage.enterFirstName("123");
        checkoutPage.enterLastName("456");
        checkoutPage.enterPostalCode(zipcode);
        checkoutPage.clickContinueButton();

        // Validate error messages
        const message = "Error: First Name and Last Name cannot contain numbers";
        checkoutPage.validateErrorMessage(message);
    });

    // This test should pass
    it("Entering a valid first name and last name but leaving postal code empty should show an error", () => {
        checkoutPage.enterFirstName(firstname);
        checkoutPage.enterLastName(lastname);
        // Leave postal code empty
        checkoutPage.clickContinueButton();

        // Validate error messages
        const message = "Error: Postal Code is required";
        checkoutPage.validateErrorMessage(message);
    });

    // Test fails because the website wrongfully allows these inputs
    it("Entering special characters in 'First Name' and 'Last Name' fields should not be allowed", () => {
        checkoutPage.enterFirstName("!@#");
        checkoutPage.enterLastName("$%^");
        checkoutPage.enterPostalCode(zipcode);
        checkoutPage.clickContinueButton();

        // Validate error messages
        const message = "Error: First Name and Last Name cannot contain special characters";
        checkoutPage.validateErrorMessage(message);
    });

    // Test fails because the website wrongfully allows these inputs
    it("Entering letters in 'Postal Code' field should not be allowed", () => {
        checkoutPage.enterFirstName(firstname);
        checkoutPage.enterLastName(lastname);
        checkoutPage.enterPostalCode("ABCDE");
        checkoutPage.clickContinueButton();

        // Validate error messages
        const message = "Error: Postal Code must be numeric";
        checkoutPage.validateErrorMessage(message);
    });

    // This test should pass
    it("Leaving First Name field empty should show an error", () => {
        // Leave first name empty
        checkoutPage.enterLastName(lastname);
        checkoutPage.enterPostalCode(zipcode);
        checkoutPage.clickContinueButton();

        // Validate error messages
        const message = "Error: First Name is required";
        checkoutPage.validateErrorMessage(message);
    })

    // This test should pass
    it("Leaving Last Name field empty should show an error", () => {
        checkoutPage.enterFirstName(firstname);
        // Leave last name empty
        checkoutPage.enterPostalCode(zipcode);
        checkoutPage.clickContinueButton();

        // Validate error messages
        const message = "Error: Last Name is required";
        checkoutPage.validateErrorMessage(message);
    });
})