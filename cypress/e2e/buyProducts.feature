# language: en
@buyProducts
Feature: Buying Products

  Background:
    Given the user is on the home page

  @guest
  Scenario: Buy a product without logging in
    When the user selects a product from the home page
    Then the product detail page should be visible
    When the user adds the product to the cart
    Then the add to cart alert should say "Product added."
    When the user goes to the cart and places an order
    And the user fills the order form with valid data
    Then the purchase should be successful

  @loggedUser
  Scenario: Buy a product after logging in
    Given the user logs in with valid credentials
    When the user selects a product from the home page
    Then the product detail page should be visible
    When the user adds the product to the cart
    Then the add to cart alert should say "Product added."
    When the user goes to the cart and places an order
    And the user fills the order form with valid data
    Then the purchase should be successful
