# language: en
@signup
Feature: Authentication SignUp

  Background:
    Given the user is on the home page

  @happyflow
  Scenario: Full signup + login + logout flow
    When the user signs up with valid credentials
    Then the signup alert should say "Sign up successful."
    When the user logs in with the same credentials
    Then the login should be successful
    When the user logs out
    Then the logout should be successful

  @existingUser
  Scenario: Sign up with existing username
    When the user tries to sign up with an existing username
    Then the signup alert should say "This user already exist."

  @emptyUsername
  Scenario: Sign up with empty username field
    When the user tries to sign up without a username
    Then the signup alert should say "Please fill out Username and Password."

  @emptyPassword
  Scenario: Sign up with empty password field
    When the user tries to sign up without a password
    Then the signup alert should say "Please fill out Username and Password."

  @modalClose
  Scenario: Validate close button works on sign up modal
    When the user opens the signup modal and closes it
    Then the signup modal should not be visible

  @longPassword
  Scenario: Try password input limits
    When the user tries to sign up with a very long password
    Then the signup alert should say "Sign up successful."
