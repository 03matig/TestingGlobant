# language: en
@login
Feature: Authentication Login

  Background:
    Given the user is on the home page

  @happyflow
  Scenario: Login + logout flow
    When the user logs in with valid credentials
    Then the login should be successful
    When the user logs out
    Then the logout should be successful

  @invalidPassword
  Scenario: Login with invalid password
    When the user tries to log in with an invalid password
    Then the login alert should say "Wrong password."

  @invalidUsername
  Scenario: Login with invalid username
    When the user tries to log in with an invalid username
    Then the login alert should say "User does not exist."

  @emptyUsername
  Scenario: Login with empty username field
    When the user tries to log in without a username
    Then the login alert should say "Please fill out Username and Password."

  @emptyPassword
  Scenario: Login with empty password field
    When the user tries to log in without a password
    Then the login alert should say "Please fill out Username and Password."

  @sqlInjection
  Scenario: SQL Injection attempts in password field
    When the user tries SQL injection on the password field
    Then the login alert should say "Wrong password."

  @modalClose
  Scenario: Validate close button works on login modal
    When the user opens the login modal and closes it
    Then the login modal should not be visible
