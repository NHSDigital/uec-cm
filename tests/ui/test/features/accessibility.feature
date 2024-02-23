Feature: Accessibility tests

@Test
  Scenario: Navigate to poor accessibility test page
    Given I navigate to the accessibility test page
    Then "Capacity Management" link is displayed on the page
    And the accessibility checks are failing
