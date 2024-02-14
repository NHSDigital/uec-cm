"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allure_cucumberjs_1 = require("allure-cucumberjs");
class Reporter extends allure_cucumberjs_1.CucumberJSAllureFormatter {
    constructor(options) {
        super(options, new allure_cucumberjs_1.AllureRuntime({
            resultsDir: "./allure-results"
        }), {
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
        });
    }
}
exports.default = Reporter;
