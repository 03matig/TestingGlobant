# language: en
@fullbuying
Feature: Full buying products functionality in Saucedemo

  Background:
    Given the user is logged in on Saucedemo

  @single
  Scenario: Add first product to shopping cart and proceed to checkout
    When the user adds the first product to the cart
    And proceeds to checkout
    Then the checkout total should equal the cart total
    And the order should be successfully completed

  @multiple
  Scenario: Validate that Price Total in Checkout Overview matches the sum of item prices in the cart
    When the user adds multiple products to the cart one by one
    Then the checkout total should equal the cart total for each step

  @remove
  Scenario: Add first product to cart and then remove it
    When the user adds the first product to the cart
    And removes the product from the cart
    Then the cart should be empty
