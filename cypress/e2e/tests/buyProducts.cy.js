const checkoutPage = require("../POM/checkout.Page");
const productDetail = require("../POM/productDetail.Page");
const homePage = require("../POM/home.Page");

const baseUrl = Cypress.env("baseUrl2");
const username = Cypress.env("username2");
const password = Cypress.env("password2");

const ts = Date.now();

describe("Buying Products Tests", () => {
    beforeEach(() => {
        cy.visit(baseUrl);
        cy.viewport(1920, 1080);
    });

    it("Buy a product without logging in", () => {
        homePage.getEachProductContainer().then(($products) => {
            const total = $products.length;

            for (let i = 0; i < total; i++) {
            homePage.goToProductDetail(i);

            // Validate access
            productDetail.validateAccessToProductDetail();
            productDetail.clickAddToCart();

            // Product added to cart alert validation
            const message = 'Product added';
            productDetail.validateAddToCartAlert(message);

            // Go to checkout
            homePage.clickCart();
            checkoutPage.validateAccessToCart();
            checkoutPage.clickPlaceOrder();

            // Fill the form
            checkoutPage.fillPlaceOrderName('John Doe');
            checkoutPage.fillPlaceOrderCountry('USA');
            checkoutPage.fillPlaceOrderCity('New York');
            checkoutPage.fillPlaceOrderCreditCard('1234 5678 9012 3456');
            checkoutPage.fillPlaceOrderMonth('12');
            checkoutPage.fillPlaceOrderYear('2025');
            checkoutPage.clickPurchase();

            // Validate purchase
            checkoutPage.validatePurchaseModal();
            checkoutPage.clickOKModalButton();
            }
        });
    });

    it("Buy a product after logging in", () => {
        // Log in first
        homePage.clickLogIn();
        homePage.fillLogInUsername(`${username}`);
        homePage.fillLogInPassword(`${password}`);
        homePage.clickLogInButton();
        homePage.validateLogIn(`${username}`);

        homePage.getEachProductContainer().then(($products) => {
            const total = $products.length;

            for (let i = 0; i < total; i++) {
            homePage.goToProductDetail(i);

            // Validate access
            productDetail.validateAccessToProductDetail();
            productDetail.clickAddToCart();

            // Product added to cart alert validation
            const message = 'Product added';
            productDetail.validateAddToCartAlert(message);

            // Go to checkout
            homePage.clickCart();
            checkoutPage.validateAccessToCart();
            checkoutPage.clickPlaceOrder();

            // Fill the form
            checkoutPage.fillPlaceOrderName('John Doe');
            checkoutPage.fillPlaceOrderCountry('USA');
            checkoutPage.fillPlaceOrderCity('New York');
            checkoutPage.fillPlaceOrderCreditCard('1234 5678 9012 3456');
            checkoutPage.fillPlaceOrderMonth('12');
            checkoutPage.fillPlaceOrderYear('2025');
            checkoutPage.clickPurchase();

            // Validate purchase
            checkoutPage.validatePurchaseModal();
            checkoutPage.clickOKModalButton();
            }
        });
    });
})

describe("Place Order Form Tests", () => {
    beforeEach(() => {
        cy.visit(baseUrl);
        cy.viewport(1920, 1080);
        homePage.goToFirstProductDetail();
        productDetail.clickAddToCart();

        const message = 'Product added';
        productDetail.validateAddToCartAlert(message);

        homePage.clickCart();
        checkoutPage.validateAccessToCart();
        checkoutPage.clickPlaceOrder();
    });

    // This one passes (expected 'Please fill out Name and Credit Card) when done manually
    // but fails (throws 'Product added') when done automatically ¯\_(ツ)_/¯
    it("Try to purchase with empty name field", () => {
        checkoutPage.fillPlaceOrderCountry('USA');
        checkoutPage.fillPlaceOrderCity('New York');
        checkoutPage.fillPlaceOrderCreditCard('1234 5678 9012 3456');
        checkoutPage.fillPlaceOrderMonth('12');
        checkoutPage.fillPlaceOrderYear('2025');
        checkoutPage.clickPurchase();

        // We can add validation for the error message if the application provides one
        const keyword = 'Name';
        const message = 'Please fill out Name and Creditcard.';
        checkoutPage.purchaseErrorMessage(message, keyword);

    });

    it("Try to purchase with empty country field", () => {
        checkoutPage.fillPlaceOrderName('John Doe');
        checkoutPage.fillPlaceOrderCity('New York');
        checkoutPage.fillPlaceOrderCreditCard('1234 5678 9012 3456');
        checkoutPage.fillPlaceOrderMonth('12');
        checkoutPage.fillPlaceOrderYear('2025');
        checkoutPage.clickPurchase();

        // We can add validation for the error message if the application provides one
        const keyword = 'Country';
        const message = 'Please fill out Country and Creditcard.';
        checkoutPage.purchaseErrorMessage(message, keyword);
    });

    it("Try to purchase with empty city field", () => {
        checkoutPage.fillPlaceOrderName('John Doe');
        checkoutPage.fillPlaceOrderCountry('USA');
        checkoutPage.fillPlaceOrderCreditCard('1234 5678 9012 3456');
        checkoutPage.fillPlaceOrderMonth('12');
        checkoutPage.fillPlaceOrderYear('2025');
        checkoutPage.clickPurchase();

        // We can add validation for the error message if the application provides one
        const keyword = 'City';
        const message = 'Please fill out City and Creditcard.';
        checkoutPage.purchaseErrorMessage(message, keyword);
    });

    // This one also passes (expected 'Please fill out Name and Credit Card) when done manually
    // but fails (throws 'Product added') when done automatically ¯\_(ツ)_/¯
    it("Try to purchase with empty credit card field", () => {
        checkoutPage.fillPlaceOrderName('John Doe');
        checkoutPage.fillPlaceOrderCountry('USA');
        checkoutPage.fillPlaceOrderCity('New York');
        checkoutPage.fillPlaceOrderMonth('12');
        checkoutPage.fillPlaceOrderYear('2025');
        checkoutPage.clickPurchase();

        // We can add validation for the error message if the application provides one
        const keyword = 'Creditcard';
        const message = 'Please fill out Creditcard.';
        checkoutPage.purchaseErrorMessage(message, keyword);
    });

    it("Try to purchase with empty month field", () => {
        checkoutPage.fillPlaceOrderName('John Doe');
        checkoutPage.fillPlaceOrderCountry('USA');
        checkoutPage.fillPlaceOrderCity('New York');
        checkoutPage.fillPlaceOrderCreditCard('1234 5678 9012 3456');
        checkoutPage.fillPlaceOrderYear('2025');
        checkoutPage.clickPurchase();

        // We can add validation for the error message if the application provides one
        const keyword = 'Month';
        const message = 'Please fill out Month and Creditcard.';
        checkoutPage.purchaseErrorMessage(message, keyword);
    });

    it("Try to purchase with empty year field", () => {
        checkoutPage.fillPlaceOrderName('John Doe');
        checkoutPage.fillPlaceOrderCountry('USA');
        checkoutPage.fillPlaceOrderCity('New York');
        checkoutPage.fillPlaceOrderCreditCard('1234 5678 9012 3456');
        checkoutPage.fillPlaceOrderMonth('12');
        checkoutPage.clickPurchase();

        // We can add validation for the error message if the application provides one
        const keyword = 'Year';
        const message = 'Please fill out Year and Creditcard.';
        checkoutPage.purchaseErrorMessage(message, keyword);
    });
})