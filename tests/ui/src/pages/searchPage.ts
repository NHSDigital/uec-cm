import { expect, Page } from "@playwright/test";
import { pageFixture } from "../../src/hooks/pageFixture";
import Accessibility from "../utilities/accessibility"
import countFilesInDirectory from "../utilities/fileCount"

export default class SearchPage extends Accessibility {
  constructor(page: Page) {
    super(page);
    pageFixture.page = page;
  }

async headerIsReturned(searchResultsHeader: string) {
  await expect(pageFixture.page.getByRole('heading', {name: searchResultsHeader })).toBeVisible();
}

async textIsReturned(searchResultsText: string) {
  await expect(pageFixture.page.getByText(searchResultsText, {exact: true} )).toBeVisible();
}

async linkIsReturned(searchResultsLink: string) {
  await expect(pageFixture.page.getByRole("link" , {name: searchResultsLink } )).toBeVisible();
}

async runAxeCheck(testId: string) {
  return super.runAxeCheck(testId);
}


async expectAccessibilityCheckFails(partFileName: string) {
  const fileCount = await countFilesInDirectory("./accessibility-reports/artifacts",partFileName);
  return fileCount
}

}
