Feature: As a user I want to be able to see no results screen displayed

  Scenario: No results found for non existent organisation search
    Given I navigate to the organisations page
    When I add an organisation
    And I enter "abc" as the organisation name
    And I submit the search
    Then a no results found text is displayed on organisation page
