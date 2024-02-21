import { Page } from "playwright";
import { pageFixture } from "../hooks/pageFixture";
import { AxeBuilder } from "@axe-core/playwright";
import { createHtmlReport } from "axe-html-reporter";

export default class Accessibility {
  constructor(page: Page) {
    pageFixture.page = page;
  }

  async runAxeCheck(testId: string, maxErrors = 10) {
    const accessibilityScanResults = await new AxeBuilder({
      page: pageFixture.page,
    }).analyze();

    createHtmlReport({
      results: accessibilityScanResults,
      options: {
        projectKey: "uec-cm-" + testId,
        outputDirPath: "artifacts/" + testId,
      },
    });

    // Check violations against the threshold
    const errorCount = accessibilityScanResults.violations.length;
    if(errorCount > maxErrors) {
      throw new Error(`Accessibility Error: Page has ${errorCount} violations which exceeds the allowed maximum of ${maxErrors}`);
    }

    return accessibilityScanResults;
  }
}
