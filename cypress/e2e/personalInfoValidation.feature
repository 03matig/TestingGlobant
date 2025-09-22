# language: en
@personalinformation
Feature: Personal Information form validation in Saucedemo

  Background:
    Given the user is on the Checkout Information page

  @numbers
  Scenario: Writing numbers on 'First Name' and 'Last Name' fields should not be allowed
    When the user enters numbers in First Name and Last Name
    Then an error should be displayed with message "Error: First Name and Last Name cannot contain numbers"

  @emptyPostal
  Scenario: Leaving postal code empty should show an error
    When the user enters valid first and last names but leaves postal code empty
    Then an error should be displayed with message "Error: Postal Code is required"

  @specialchars
  Scenario: Entering special characters in 'First Name' and 'Last Name' should not be allowed
    When the user enters special characters in First Name and Last Name
    Then an error should be displayed with message "Error: First Name and Last Name cannot contain special characters"

  @lettersPostal
  Scenario: Entering letters in 'Postal Code' field should not be allowed
    When the user enters letters in Postal Code
    Then an error should be displayed with message "Error: Postal Code must be numeric"

  @emptyFirstname
  Scenario: Leaving First Name field empty should show an error
    When the user leaves First Name empty
    Then an error should be displayed with message "Error: First Name is required"

  @emptyLastname
  Scenario: Leaving Last Name field empty should show an error
    When the user leaves Last Name empty
    Then an error should be displayed with message "Error: Last Name is required"
