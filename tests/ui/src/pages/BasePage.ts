import { Page } from 'playwright';
import {pageFixture} from "../../src/hooks/pageFixture";
import { AxeBuilder } from '@axe-core/playwright';

export default class BasePage {

  constructor(page: Page) {
    pageFixture.page = page;
  }

  async runAxeCheck()

  {     const results = await new AxeBuilder({ page: pageFixture.page }
  ).analyze();
    if (results.violations.length > 0) {
      throw new Error(`Accessibility violations found: ${JSON.stringify(results.violations)}`);
    }
  }
}
