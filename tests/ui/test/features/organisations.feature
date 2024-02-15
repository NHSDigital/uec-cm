Feature: As a user I want to be able to manage organisation data

  Scenario: Navigate to add organisation page
    Given I navigate to the organisations page
    When I add an organisation
    Then "Organisation search" is displayed on the page
    And The instructions stating "Search by either name, postcode or managing organisation." are displayed on the page

@Test
  Scenario: Search for an organisation name
    Given I navigate to the organisations page
    When I add an organisation
    And I enter "Test Organisation" as the organisation name
    And I submit the search
    Then "Test Organisation" is input as the organisation name
    # And no errors are displayed on the page


  Scenario: Search for an invalid length in organisation name
    Given I navigate to the organisations page
    When I add an organisation
    And I enter "This is a name of more than 100 characters. This name is 101 characters. This name is 101 characters." as the organisation name
    And I submit the search
    Then a name message "Error: Enter a name postcode" is displayed on the page

  Scenario: Search for an invalid characters in organisation name
    Given I navigate to the organisations page
    When I add an organisation
    And I enter "^This is a name of with invalid characters £" as the organisation name
    And I submit the search
    Then a name message "Error: Enter a name postcode" is displayed on the page

  Scenario: Search for all valid characters in organisation name
    Given I navigate to the organisations page
    When I add an organisation
    And I enter "St. Vincent & Mary's Hospital - Trust, Outcome+ No (1)" as the organisation name
    And I submit the search
    Then "St. Vincent & Mary's Hospital - Trust, Outcome+ No (1)" is input as the organisation name
    # And no errors are displayed on the page

  Scenario: Search for an organisation postcode
    Given I navigate to the organisations page
    When I add an organisation
    And I enter "BD1 1AW" as the organisation postcode
    And I submit the search
    And "BD1 1AW" is input as the organisation postcode
    # And a postcode error is not displayed on the page

  Scenario: Search for an invalid organisation postcode
    Given I navigate to the organisations page
    When I add an organisation
    And I enter "BD1 1AWW" as the organisation postcode
    And I submit the search
    Then a postcode error message "Error: Enter a valid postcode" is displayed on the page


  Scenario: Search for a managing organisation
    Given I navigate to the organisations page
    When I add an organisation
    And I enter "TAD" as the managing organisation
    And I submit the search
    And "TAD" is input as the managing organisation
    # And no errors are displayed on the page

  Scenario: Search for an invalid length in managing organisation
    Given I navigate to the organisations page
    When I add an organisation
    And I enter "This is a name of more than 100 characters. This name is 101 characters. This name is 101 characters." as the managing organisation
    And I submit the search
    Then a managing organisation error message "Error: Enter a managing organisation" is displayed on the page

  Scenario: Search for an invalid characters in managing organisation
    Given I navigate to the organisations page
    When I add an organisation
    And I enter "^This is a name of with invalid characters £" as the managing organisation
    And I submit the search
    Then a managing organisation error message "Error: Enter a managing organisation" is displayed on the page

  Scenario: Search for all valid characters in managing organisation
    Given I navigate to the organisations page
    When I add an organisation
    And I enter "St. Vincent & Mary's Hospital - Trust, Outcome+ No (1)" as the managing organisation
    And I submit the search
    Then "St. Vincent & Mary's Hospital - Trust, Outcome+ No (1)" is input as the managing organisation
    # And no errors are displayed on the page

  Scenario: Search for all valid characters in managing organisation
    Given I navigate to the organisations page
    When I add an organisation
    And I enter "St. Vincent & Mary's Hospital - Trust, Outcome+ No (1)" as the managing organisation
    And I submit the search
    Then "St. Vincent & Mary's Hospital - Trust, Outcome+ No (1)" is input as the managing organisation
    # And no errors are displayed on the page


  Scenario: Search for invalid characters in all search fields
    Given I navigate to the organisations page
    When I add an organisation
    And I enter "!123$£" as the organisation name
    And I enter "1AA W22" as the organisation postcode
    And "!123\ £" is input as the managing organisation
    And I submit the search
    # And all validation errors are displayed on the page
