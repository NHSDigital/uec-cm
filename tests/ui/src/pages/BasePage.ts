import { Page } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';

export default class BasePage {
  protected page: Page;

  constructor(page: Page)

  {     this.page = page;   }
  async runAxeCheck()

  {     const results = await new AxeBuilder({ page: this.page }
  ).analyze();
    if (results.violations.length > 0) {
      throw new Error(`Accessibility violations found: ${JSON.stringify(results.violations)}`);
    }
  }
}
