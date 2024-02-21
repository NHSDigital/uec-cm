import { expect, Page } from "@playwright/test";
import { pageFixture } from "../hooks/pageFixture";
import Accessibility from "../utilities/acccessibility";

export default class SearchPage extends Accessibility {
  constructor(page: Page) {
    super(page);
    pageFixture.page = page;
  }

  async runAxeCheck(testId: string) {
    return super.runAxeCheck(testId);
  }
  async headerIsReturned(searchResultsHeader: string) {
    await expect(
      pageFixture.page.getByRole("heading", { name: searchResultsHeader }),
    ).toBeVisible();
  }

  async textIsReturned(searchResultsText: string) {
    await expect(
      pageFixture.page.getByText(searchResultsText, { exact: true }),
    ).toBeVisible();
  }

  async linkIsReturned(searchResultsLink: string) {
    await expect(
      pageFixture.page.getByRole("link", { name: searchResultsLink }),
    ).toBeVisible();
  }

  async removeAccessibleElement(selector: string) {
    await pageFixture.page.evaluate((selector) => {
      const element = document.querySelector(selector);
      if (element) {
        element.parentNode.removeChild(element);
      }
    }, selector);
  }
  async removeAnyInputElement() {
    const inputElement = await pageFixture.page.$("input");
    await pageFixture.page.evaluate((el) => el.remove(), inputElement);
  }
  async expectAccessibilityCheckFails(testId: string) {
    const result = await this.runAxeCheck(testId);
    expect(result.violations.length).toBeGreaterThan(0);
  }
}
