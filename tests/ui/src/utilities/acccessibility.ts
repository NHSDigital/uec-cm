import { Page } from "playwright";
import { pageFixture } from "../hooks/pageFixture";
import { AxeBuilder } from "@axe-core/playwright";
import { createHtmlReport } from "axe-html-reporter";

export default class Accessibility {
  constructor(page: Page) {
    pageFixture.page = page;
  }

  async runAxeCheck(testId: string) {
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

    return accessibilityScanResults;
  }
}
