import { Locator, Page } from "@playwright/test";
import { pageFixture } from "../../src/hooks/pageFixture";
import Accessibility from "../utilities/accessibility"
import countFilesInDirectory from "../utilities/fileCount"

export default class SearchPage extends Accessibility {
  constructor(page: Page) {
    super(page);
    pageFixture.page = page;
  }

  // Getters
  headerIsReturned(searchResultsHeader: string): Locator {
    return pageFixture.page.getByRole('heading', { name: searchResultsHeader });
  }

  textIsReturned(searchResultsText: string): Locator {
    return pageFixture.page.getByText(searchResultsText, { exact: true });
  }

  linkIsReturned(searchResultsLink: string): Locator {
    return pageFixture.page.getByRole("link" , { name: searchResultsLink } );
  }

  // Methods
  async runAxeCheck(testId: string) {
    return super.runAxeCheck(testId);
  }

  async expectAccessibilityCheckFails(partFileName: string) {
    const fileCount = await countFilesInDirectory("./accessibility-reports/artifacts",partFileName);
    return fileCount
  }
}
