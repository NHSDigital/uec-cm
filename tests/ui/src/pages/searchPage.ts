import { expect, Page } from "@playwright/test";
import { pageFixture } from "../../src/hooks/pageFixture";
import BasePage from './BasePage';
export default class SearchPage extends BasePage {
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

}
