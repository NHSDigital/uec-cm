Feature: As a user I want to be able to manage organisation data

  Background:
    Given I navigate to the organisations page
    And I add an organisation

  Scenario: Navigate to add organisation page
    Then "Organisation search" is displayed on the page
    And The instructions stating "Search by either name, postcode or managing organisation." are displayed on the page

  Scenario: Search for an organisation name
    Given I enter "0" in the "name" field
    And I submit the search
    Then "no results found" is displayed on the screen
    And option to add a new organisation is selected by default

  Scenario: Search for an invalid length in organisation name
    Given I enter "This is a name of more than 100 characters. This name is 101 characters. This name is 101 characters." in the "name" field
    And I submit the search
    Then a "name" field error message "Enter a valid name" is displayed on the page

  Scenario: Search for an invalid characters in organisation name
    Given I enter "^This is a name of with invalid characters £" in the "name" field
    And I submit the search
    Then a "name" field error message "Enter a valid name" is displayed on the page

  Scenario: Search for all valid characters in organisation name
    Given I enter "0" in the "name" field
    And I submit the search
    Then "no results found" is displayed on the screen
    And option to add a new organisation is selected by default

  Scenario: Search for an organisation postcode
    Given I enter "BD1 1AW" in the "postcode" field
    And I submit the search
    And a "postcode" error is not displayed on the page

  Scenario: Search for an invalid organisation postcode
    Given I enter "BD1 1AWW" in the "postcode" field
    And I submit the search
    Then a "postcode" field error message "Enter a valid postcode" is displayed on the page

  Scenario: Search for a managing organisation
    Given I enter "0" in the "managing-organisation" field
    And I submit the search
    Then "no results found" is displayed on the screen
    And option to add a new organisation is selected by default

  Scenario: Search for an invalid length in managing organisation
    Given I enter "This is a name of more than 100 characters. This name is 101 characters. This name is 101 characters." in the "managing-organisation" field
    And I submit the search
    Then a "organisation" field error message "Enter a valid managing organisation" is displayed on the page

  Scenario: Search for an invalid characters in managing organisation
    Given I enter "^This is a name of with invalid characters £" in the "managing-organisation" field
    And I submit the search
    Then a "organisation" field error message "Enter a valid managing organisation" is displayed on the page

  Scenario: Search for all valid characters in managing organisation
    Given I enter "0" in the "managing-organisation" field
    And I submit the search
    Then "no results found" is displayed on the screen
    And option to add a new organisation is selected by default

  Scenario: Search for invalid characters in all search fields
    Given I enter "!123$£" in the "name" field
    And I enter "1AA W22" in the "postcode" field
    And I enter "!123\ £" in the "managing-organisation" field
    And I submit the search
    And all field level validation errors are displayed on the page

  Scenario: No results found displayed with non existent organisation name
    Given I enter "0" in the "name" field
    And I submit the search
    Then "no results found" is displayed on the screen
    And option to add a new organisation is selected by default

  Scenario: No results found displayed with non existent organisation postcode
    Given I enter "NG11 1AA" in the "postcode" field
    And I submit the search
    Then "no results found" is displayed on the screen
    And option to add a new organisation is selected by default

  Scenario: No results found displayed with non existent managing organisation
    Given I enter "0" in the "managing-organisation" field
    And I submit the search
    Then "no results found" is displayed on the screen
    And option to add a new organisation is selected by default

  Scenario: Search for valid characters in all search fields
    Given I enter "Test Organisation" in the "name" field
    And I enter "BD1 1AW" in the "postcode" field
    And I enter "TAD" in the "managing-organisation" field
    And I submit the search
    Then no field level validation errors are displayed on the page
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
