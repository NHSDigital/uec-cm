Feature: no results found screen

  As a user I want to be able to see no results found screen displayed
  for valid search criteria where the organisation is not found

  Scenario: No results found displayed with non existent organisation name
    Given I navigate to the organisations page
    When I add an organisation
    And I enter "abc" as the organisation name
    And I submit the search
    Then a no results found text is displayed on organisation page
    And option to add a new organisation is selected by default

  Scenario: No results found displayed with non existent organisation postcode
    Given I navigate to the organisations page
    When I add an organisation
    And I enter "BD1 1AW" as the organisation postcode
    And I submit the search
    Then a no results found text is displayed on organisation page
    And option to add a new organisation is selected by default

  Scenario: No results found displayed with non existent managing organisation
    Given I navigate to the organisations page
    When I add an organisation
    And I enter "TAD" as the managing organisation
    And I submit the search
    Then a no results found text is displayed on organisation page
    And option to add a new organisation is selected by default
