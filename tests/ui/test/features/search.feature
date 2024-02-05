Feature: Cloudfront tests

  Scenario: Navigate to home page via env
    Given I navigate to the cloudfront endpoint
    Then "Capacity Management" link is displayed on the page
    And "Hello and welcome to UEC Capacity Management" is displayed on the page
