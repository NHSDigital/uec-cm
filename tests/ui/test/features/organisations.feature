Feature: As a user I want to be able to manage organisation data

  Scenario: Navigate to add organisation page
    Given I navigate to the organisations page
    When I add an organisation
    Then "Organisation search" is displayed on the page
    And The instructions stating "Search by either name, postcode or managing organisation." are displayed on the page

  Scenario: Search for an organisation name
    Given I navigate to the organisations page
    When I add an organisation
    And I enter "Test Organisation" as the organisation name
    Then "Test Organisation" is input as the organisation name

  Scenario: Search for an organisation postcode
    Given I navigate to the organisations page
    When I add an organisation
    And I enter "BD1 1AW" as the organisation postcode
    And "BD1 1AW" is input as the organisation postcode

  Scenario: Search for an invalid organisation postcode
    Given I navigate to the organisations page
    When I add an organisation
    And I enter "BD1 1AWW" as the organisation postcode
    And I submit the search
    Then a postcode error message "Error: Enter a valid postcode" is displayed on the page


  Scenario: Search for an organisation code
    Given I navigate to the organisations page
    When I add an organisation
    And I enter "TAD" as the organisation code
    And "TAD" is input as the organisation code



