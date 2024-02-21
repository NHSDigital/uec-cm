const {
  CucumberJSAllureFormatter,
  AllureRuntime,
} = require("allure-cucumberjs");

class Reporter extends CucumberJSAllureFormatter {
  constructor(options) {
    super(
      options,
      new AllureRuntime({
        resultsDir: "./allure-results",
      }),
      {
        labels: [
          {
            pattern: [/@epic:(.*)/],
            name: "epic",
          },
          {
            pattern: [/@story:(.*)/],
            name: "story",
          },
          {
            pattern: [/@severity:(.*)/],
            name: "severity",
          },
        ],
        links: [
          {
            pattern: [/@bug=(.*)/],
            type: "issue",
            urlTemplate: "https://nhsd-jira.digital.nhs.uk/browse/issue/%s",
          },
          {
            pattern: [/@tms=(.*)/],
            type: "tms",
            urlTemplate: "https://nhsd-jira.digital.nhs.uk/browse/tms/%s",
          },
        ],
      },
    );
  }
}

module.exports = Reporter;
