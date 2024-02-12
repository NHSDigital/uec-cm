Feature: As a user I want to be able to manage organisation data

  Scenario: Navigate to add organisation page
    Given I navigate to the organisations page
    When I choose to 'add-card-link' an organisation
    Then "Placeholder for adding an organisation" is displayed on the page
