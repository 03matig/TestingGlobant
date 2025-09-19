Feature: AskOmDch Signup

  @signup
  Scenario: Successful signup and subsequent login with the created user
    Given the user navigates to the registration page
    When they register with unique valid credentials
    Then the My Account greeting should be visible
    And they can log out and sign back in with the new user

  @signup
  Scenario: Signup fails due to invalid character in email
    Given the user navigates to the registration page
    When they register using an invalid email (with the ! symbol)
    Then the native email validation message should be shown

  @signup
  Scenario: Signup fails due to special characters in the username
    Given the user navigates to the registration page
    When they register with an invalid username
    Then a username invalid error message should be shown

  @signup
  Scenario: Signup fails due to empty username
    Given the user navigates to the registration page
    When they try to register without a username
    Then an empty username error message should be shown

  @signup
  Scenario: Signup fails due to empty email
    Given the user navigates to the registration page
    When they try to register without an email
    Then an empty email error message should be shown

  @signup
  Scenario: Signup fails due to empty password
    Given the user navigates to the registration page
    When they try to register without a password
    Then an empty password error message should be shown
