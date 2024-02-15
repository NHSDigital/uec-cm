import { Page } from 'playwright';
import {pageFixture} from "../../src/hooks/pageFixture";
import { AxeBuilder } from '@axe-core/playwright';
import { createHtmlReport }  from 'axe-html-reporter';

export default class Accessibility {

  constructor(page: Page) {
    pageFixture.page = page;
  }

  async runAxeCheck()

  {const accessibilityScanResults = await new AxeBuilder({ page: pageFixture.page }
  ).analyze();

  const reportHTML = createHtmlReport({
    results: accessibilityScanResults,
    options: {
      projectKey: "uec-cm"
    },
  });

  if (accessibilityScanResults.violations.length > 0) {
    throw new Error(`Accessibility violations found: ${JSON.stringify(accessibilityScanResults.violations)}`);
  }

  }
}
