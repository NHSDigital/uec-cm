import { Locator, Page } from "@playwright/test";

export default class CheckAnswersPage {
  constructor(readonly page: Page) {
    this.page = page;
  }
    get getGoBackLink(): Locator {
        return this.page.getByRole('button', { name: 'Go back' });
    }

    get getCheckAnswersHeading(): Locator {
        return this.page.getByRole('heading', { name: 'Check your answers' });
    }
}
