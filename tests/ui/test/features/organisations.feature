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
    And I submit the search
    Then "no results found" is displayed on the screen
    And option to add a new organisation is selected by default

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
    Then "no results found" is displayed on the screen
    And option to add a new organisation is selected by default

  Scenario: Search for an organisation postcode
    Given I navigate to the organisations page
    When I add an organisation
    And I enter "BD1 1AW" as the organisation postcode
    And I submit the search
    And a postcode error is not displayed on the page

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
    Then "no results found" is displayed on the screen
    And option to add a new organisation is selected by default

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
    Then "no results found" is displayed on the screen
    And option to add a new organisation is selected by default

  Scenario: Search for invalid characters in all search fields
    Given I navigate to the organisations page
    When I add an organisation
    And I enter "!123$£" as the organisation name
    And I enter "1AA W22" as the organisation postcode
    And "!123\ £" is input as the managing organisation
    And I submit the search
    And all validation errors are displayed on the page

  Scenario: No results found displayed with non existent organisation name
    Given I navigate to the organisations page
    When I add an organisation
    And I enter "abc" as the organisation name
    And I submit the search
    Then "no results found" is displayed on the screen
    And option to add a new organisation is selected by default

  Scenario: No results found displayed with non existent organisation postcode
    Given I navigate to the organisations page
    When I add an organisation
    And I enter "BD1 1AW" as the organisation postcode
    And I submit the search
    Then "no results found" is displayed on the screen
    And option to add a new organisation is selected by default

  Scenario: No results found displayed with non existent managing organisation
    Given I navigate to the organisations page
    When I add an organisation
    And I enter "TAD" as the managing organisation
    And I submit the search
    Then "no results found" is displayed on the screen
    And option to add a new organisation is selected by default

  Scenario: Search for valid characters in all search fields
    Given I navigate to the organisations page
    When I add an organisation
    And I enter "Test Organisation" as the organisation name
    And I enter "BD1 1AW" as the organisation postcode
    And "TAD" is input as the managing organisation
    And I submit the search
    Then no field level errors are displayed on the page
    But a summary "title" error message: "There is a problem" is displayed on the page
    And a summary "message" error message: "Search by either" is displayed on the page
    And a summary "name" error link text: "name" is displayed on the page
    And a summary "postcode" error link text: "postcode" is displayed on the page
    And a summary "organisation" error link text: "managing organisation" is displayed on the page
    When I click the summary "name" error link text
    Then the organisation "name" field is focused
    When I click the summary "postcode" error link text
    Then the organisation "postcode" field is focused
    When I click the summary "managing-organisation" error link text
    Then the organisation "managing-organisation" field is focused

