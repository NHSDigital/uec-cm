import { expect, Page } from "@playwright/test";
import {pageFixture} from "../hooks/pageFixture";
import BasePage from './BasePage';

export default class SearchPage extends BasePage {
  constructor(page: Page) {
    super(page);
    pageFixture.page = page;
  }

private searchPageElements = {
  acceptAllCookies : "//div[text()='Accept all']",
  searchBox: 'Search'
  }

async acceptAllCookies() {
  await pageFixture.page.locator(this.searchPageElements.acceptAllCookies).click();
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
