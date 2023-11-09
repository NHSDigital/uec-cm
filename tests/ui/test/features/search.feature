Feature: Google search tests

  Scenario: Search on Google
    Given the Google home page is displayed
    When the User accepts all cookies
    And the User searches for "DuckDuckGo"
    Then "DuckDuckGo — Privacy, simplified." is returned
