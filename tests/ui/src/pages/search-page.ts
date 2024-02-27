import { Locator, Page } from "@playwright/test";
import { pageFixture } from "../../src/hooks/pageFixture";
import Accessibility from "../utilities/accessibility"
import countFilesInDirectory from "../utilities/fileCount"

export default class SearchPage extends Accessibility {
  constructor(page: Page) {
    super(page);
    pageFixture.page = page;
  }

  async headerIsReturned(searchResultsHeader: string) {
    return pageFixture.page.getByRole('heading', {name: searchResultsHeader });
  }

  async textIsReturned(searchResultsText: string): Promise<Locator> {
    return pageFixture.page.getByText(searchResultsText, { exact: true });
  }

  async runAxeCheck(testId: string) {
    return super.runAxeCheck(testId);
  }

  async expectAccessibilityCheckFails(partFileName: string) {
    const fileCount = await countFilesInDirectory("./accessibility-reports/artifacts",partFileName);
    return fileCount
  }

  async linkIsReturned(searchResultsLink: string): Promise<Locator> {
    return pageFixture.page.getByRole("link" , { name: searchResultsLink } );
  }
}
