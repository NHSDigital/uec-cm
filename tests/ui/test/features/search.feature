Feature: Cloudfront tests

  Feature Description

  @smoke
  @bug=123
  @severity:minor
  @epic:LandingPage
  @story:Search
  Scenario: Navigate to home page via env
    Given I navigate to the cloudfront endpoint
    Then "Capacity Management" link is displayed on the page
