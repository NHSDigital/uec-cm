Feature: Cloudfront tests

@Test
  Scenario: Navigate to home page via env
    Given I navigate to the cloudfront endpoint
    Then "Capacity Management" link is displayed on the page
    And the accessibility checks are passing

  @Test
  Scenario: Removing accessible element fails the test
    Given I navigate to the cloudfront endpoint
    When I remove any input element
    Then the accessibility checks are failing
