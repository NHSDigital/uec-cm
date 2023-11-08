Feature: Google search tests

  Scenario: Search on Google
    Given the Google home page is displayed
    When the User accepts all cookies
    And the User searches for "duck"
    Then "images for duck" are returned
