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

async searchForText(searchString: string) {
  await pageFixture.page.getByTitle(this.searchPageElements.searchBox).click();
  await pageFixture.page.getByTitle(this.searchPageElements.searchBox).fill(searchString);
  await pageFixture.page.getByTitle(this.searchPageElements.searchBox).click();
  await pageFixture.page.getByTitle(this.searchPageElements.searchBox).click();
  await pageFixture.page.getByTitle(this.searchPageElements.searchBox).press('Tab');
  await pageFixture.page.getByTitle(this.searchPageElements.searchBox).press('Tab');
  await pageFixture.page.getByTitle(this.searchPageElements.searchBox).press('Tab');
  await pageFixture.page.getByTitle(this.searchPageElements.searchBox).press('Enter');
}

async headerIsReturned(searchResultsString: string) {
  await expect(pageFixture.page.getByRole('heading', {name: searchResultsString }),'Header not found').toBeVisible();
  await expect(pageFixture.page.getByRole('heading', {name: searchResultsString }),'Header not found').toBeVisible();
}

}
