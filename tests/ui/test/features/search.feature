Feature: Cloudfront tests

  # Scenario: Navigate to home page
  #   Given I navigate to the cloudfront endpoint for workspace "dr-667"
  #   Then "Hello and welcome to UEC Capacity Management" is returned

  Scenario: Navigate to home page via env
    Given I navigate to the env cloudfront endpoint
    # Then "Hello and welcome to UEC Capacity Management" is returned
