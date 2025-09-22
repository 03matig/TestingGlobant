# language: en
@smoke @login
Feature: Login functionality on SauceDemo

  Background:
    Given the user opens the login page

  @success
  Scenario: Login with valid credentials
    When the user logs in with username "standard_user" and password "secret_sauce"
    Then the user should be redirected to the inventory page

  @invalid
  Scenario: Login with invalid credentials
    When the user logs in with username "<invalid_username>" and password "<invalid_password>"
    Then the user should see the error message "Epic sadface: Username and password do not match any user in this service"

  @empty-username
  Scenario: Login with empty username
    When the user logs in with username "" and password "<valid_password>"
    Then the user should see the error message "Epic sadface: Username is required"

  @empty-password
  Scenario: Login with empty password
    When the user logs in with username "<valid_username>" and password ""
    Then the user should see the error message "Epic sadface: Password is required"

  @data-driven
  Scenario Outline: Login test for all users in fixture
    When the user logs in with username "<username>" and password "<password>"
    Then the login result should be "<expected>"

    Examples:
      | username           | password      | expected             |
      | standard_user      | secret_sauce  | success              |
      | locked_out_user    | secret_sauce  | locked_out           |
      | problem_user       | secret_sauce  | success              |
      | performance_glitch_user | secret_sauce | success          |
