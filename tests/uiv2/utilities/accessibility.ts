import { Page } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';
import { createHtmlReport }  from 'axe-html-reporter';
import countFilesInDirectory from "../utilities/fileCount"

export default class Accessibility {
  page: Page;

  constructor(page: Page){
    this.page = page;
  }


  async runAxeCheck(testId: string, maxErrors = 0)

  {const accessibilityScanResults = await new AxeBuilder({ page: this.page }
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

    if (!accessibilityScanResults.url.includes("/test")) {
    const errorCount = accessibilityScanResults.violations.length;
    if(errorCount > maxErrors) {
      throw new Error(`Accessibility Error: Page has ${errorCount} violations which exceeds the allowed maximum of ${maxErrors}`);
    }
  }
    return accessibilityScanResults;
  }
}

async expectAccessibilityCheckFails(partFileName: string) {
  const fileCount = await countFilesInDirectory("./accessibility-reports/artifacts/",partFileName);
  return fileCount
}


}
