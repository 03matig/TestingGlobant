Feature: AskOmDch Login

  @login
  Scenario: Successful login with email
    Given the user navigates to the login page
    When they sign in with a valid email
    Then the greeting for the configured user should be visible

  @login
  Scenario: Successful login with username
    Given the user navigates to the login page
    When they sign in with a valid username
    Then the greeting for the configured user should be visible

  @login @sqlinjection
  Scenario: Login attempt with SQL injection in password
    Given the user navigates to the login page
    When they try to sign in with a SQL payload in the password field
    Then an incorrect password error should be shown

  @login
  Scenario: Login fails with wrong password
    Given the user navigates to the login page
    When they sign in with a wrong password
    Then an incorrect password error should be shown

  @login
  Scenario: Login fails with empty username/email
    Given the user navigates to the login page
    When they try to sign in without entering a username or email
    Then a username required error should be shown

  @login
  Scenario: Login fails with empty password
    Given the user navigates to the login page
    When they try to sign in without entering a password
    Then a password empty error should be shown
