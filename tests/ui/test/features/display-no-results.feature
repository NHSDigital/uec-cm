Feature: As a user I want to be able to display no results screen

  Scenario: Search for a non existent organisation
    Given I navigate to the organisations page
    When I add an organisation
    And I enter "£" as the organisation name
    And I submit the search
    Then the reults page is displayed
    And no results are displayed
