import { Page } from 'playwright';
import {pageFixture} from "../../src/hooks/pageFixture";
import { AxeBuilder } from '@axe-core/playwright';
import { createHtmlReport }  from 'axe-html-reporter';

export default class Accessibility {

  constructor(page: Page) {
    pageFixture.page = page;
  }

  async runAxeCheck(testId: string, maxErrors = 0)

  {const accessibilityScanResults = await new AxeBuilder({ page: pageFixture.page }
  ).analyze();



  if (accessibilityScanResults.violations.length > 0) {
    const reportHTML = createHtmlReport({
      results: accessibilityScanResults,
      options: {
        projectKey: "uec-cm - "+ testId,
        outputDirPath: "accessibility-reports",
        reportFileName: testId +".html"
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
}
