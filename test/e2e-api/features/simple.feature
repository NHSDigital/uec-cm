Feature: Open weather api
  As a user,
  I want to find the temperature at a location

  # The "@" annotations are tags
  # One feature can have multiple scenarios
  # The lines immediately after the feature title are just comments

  Scenario: Basic temperature request
    Given I send a temperature request
    Then I will receive a 200 status response
