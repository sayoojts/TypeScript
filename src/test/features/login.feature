Feature: UPS User Login
  As a registered UPS user
  I want to log into my account
  So that I can manage my shipments and view my account details

  Background:
    Given I am on the UPS homepage
    And I navigate to the login page

  @positive
  Scenario: Successful login with valid credentials
    When I enter my username "validUserName"
    And I click the "Continue" button
    And I enter my password "ValidPassword"
    And I click the "Log In" button
    Then I should be redirected to my account dashboard
    And I should see a greeting message with my name

  @negative
  Scenario: Unsuccessful login with invalid credentials
    When I enter my username "validUserName"
    And I click the "Continue" button
    And I enter an invalid password "WrongPassword"
    And I click the "Log In" button
    Then I should see an error message indicating incorrect login details
    And I should remain on the password entry page

  @negative
  Scenario: Unrecognized username during login
    When I enter an unregistered username "unknownUser"
    And I click the "Continue" button
    Then I should see an error message indicating the username is unrecognized
    And I should remain on the username entry page

  @security
  Scenario: Account lockout after multiple failed login attempts
    When I enter my username "validUserName"
    And I click the "Continue" button
    And I enter an invalid password "WrongPassword" three times
    Then I should see a message that my account is locked
    And I should be prompted to reset my password or contact support

  @ui
  Scenario: Password recovery option is available
    Then I should see a "Forgot Username/Password?" link on the login page
    When I click the "Forgot Username/Password?" link
    Then I should be directed to the password recovery page


 