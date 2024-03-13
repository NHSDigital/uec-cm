import { Locator, Page } from "@playwright/test";
import Accessibility from "../utilities/accessibility"
import countFilesInDirectory from "../utilities/fileCount"

export default class SearchPage extends Accessibility {
  constructor(readonly page: Page) {
    super(page);
    this.page = page;
  }

  // Getters
  headerIsReturned(searchResultsHeader: string): Locator {
    return this.page.getByRole('heading', { name: searchResultsHeader });
  }

  textIsReturned(searchResultsText: string): Locator {
    return this.page.getByText(searchResultsText, { exact: true });
  }

  linkIsReturned(searchResultsLink: string): Locator {
    return this.page.getByRole("link" , { name: searchResultsLink } );
  }

  // Methods
  async runAxeCheck(testId: string) {
    return super.runAxeCheck(testId);
  }

  async expectAccessibilityCheckFails(partFileName: string) {
    const fileCount = await countFilesInDirectory("../../accessibility-reports", partFileName);
    return fileCount
  }
}
