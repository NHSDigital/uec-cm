import { AllureRuntime, CucumberJSAllureFormatter } from "allure-cucumberjs";

export default class Reporter extends CucumberJSAllureFormatter {
  constructor(options: any) {
    super(
      options,
      new AllureRuntime({
        resultsDir: "./allure-results"
      }),
      {
        exceptionFormatter: (message) => message.replace("qwerty123", "[password edited]"),
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
