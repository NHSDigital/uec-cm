import { expect, Page } from "@playwright/test";
import {pageFixture} from "../../src/hooks/pageFixture";
// import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";


// export default class LoginPage {
//     private base: PlaywrightWrapper
//     constructor(private page: Page) {
//         this.base = new PlaywrightWrapper(page);
//     }


export default class SearchPage {
  constructor(page: Page) {
    pageFixture.page = page;
  }


private searchPageElements = {
  acceptAllCookies : "//div[text()='Accept all']",
  searchBox: 'Search',
  searchText: 'duck',
  searchResults: 'images for duck',
  googleSearchBtn: "//div[text()='Google Search']"
  }

async acceptAllCookies() {
  await pageFixture.page.locator(this.searchPageElements.acceptAllCookies).click();
}

async searchForText(searchString: string) {
  await pageFixture.page.getByTitle(this.searchPageElements.searchBox).click();
  await pageFixture.page.getByTitle(this.searchPageElements.searchBox).fill(searchString);
  await pageFixture.page.getByTitle(this.searchPageElements.searchBox).click();
  await pageFixture.page.getByTitle(this.searchPageElements.searchBox).click();
  // await pageFixture.page.keyboard.down('ArrowDown');
  await pageFixture.page.getByTitle(this.searchPageElements.searchBox).press('Tab');
  await pageFixture.page.getByTitle(this.searchPageElements.searchBox).press('Tab');
  await pageFixture.page.getByTitle(this.searchPageElements.searchBox).press('Tab');
  await pageFixture.page.getByTitle(this.searchPageElements.searchBox).press('Enter');
  // await pageFixture.page.getByTitle(this.searchPageElements.searchBox).fill(this.searchPageElements.searchText);
  // await pageFixture.page.getByLabel(this.searchPageElements.googleSearchBtn).click();
  // await pageFixture.page.getByTitle('Search').press('Enter');
}

async textIsReturned(searchResultsString: string) {
  // expect(pageFixture.page.getByRole('heading', { name: searchResultsString })).toBeVisible();
  // expect(pageFixture.page.getByRole('heading', {name: this.searchPageElements.searchResults })).toBeVisible();
  await expect(pageFixture.page.getByRole('heading', {name: 'DuckDuckGo — Privacy, simplified.' })).toBeVisible();
}

}



