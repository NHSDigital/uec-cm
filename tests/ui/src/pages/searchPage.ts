import { expect, Page } from "@playwright/test";
import {pageFixture} from "../../src/hooks/pageFixture";

export default class SearchPage {
  constructor(page: Page) {
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
