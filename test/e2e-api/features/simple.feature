Feature: Open weather api
  As a user,
  I want to find the temperature at a location

  # The "@" annotations are tags
  # One feature can have multiple scenarios
  # The lines immediately after the feature title are just comments

@tag1
  Scenario: Basic temperature request
    Given I send a temperature request
    Then I receive a 200 status response
    And I will receive a status 200 response

@tag2
  Scenario: Addtional temperature request
    Given I send a temperature request
    Then I receive a 200 status response
    And I will receive a status 400 response
