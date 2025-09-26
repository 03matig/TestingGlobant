# language: en
@placeOrderForm
Feature: Place Order Form Validations

  Background:
    Given the user has a product in the cart and is on the place order form

  @emptyName
  Scenario: Try to purchase with empty name field
    When the user submits the order form without a name
    Then the purchase error should say "Please fill out Name and Creditcard." for "Name"

  @emptyCountry
  Scenario: Try to purchase with empty country field
    When the user submits the order form without a country
    Then the purchase error should say "Please fill out Country and Creditcard." for "Country"

  @emptyCity
  Scenario: Try to purchase with empty city field
    When the user submits the order form without a city
    Then the purchase error should say "Please fill out City and Creditcard." for "City"

  @emptyCreditCard
  Scenario: Try to purchase with empty credit card field
    When the user submits the order form without a credit card
    Then the purchase error should say "Please fill out Creditcard." for "Creditcard"

  @emptyMonth
  Scenario: Try to purchase with empty month field
    When the user submits the order form without a month
    Then the purchase error should say "Please fill out Month and Creditcard." for "Month"

  @emptyYear
  Scenario: Try to purchase with empty year field
    When the user submits the order form without a year
    Then the purchase error should say "Please fill out Year and Creditcard." for "Year"
