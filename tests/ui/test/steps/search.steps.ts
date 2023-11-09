import { Given , When , Then } from "@cucumber/cucumber";
import {pageFixture} from "../../src/hooks/pageFixture";
import SearchPage from "../../src/pages/searchPage";
import { expect, Page } from "@playwright/test";

let searchPage: SearchPage;
searchPage = new SearchPage(pageFixture.page);

Given('the Google home page is displayed', async function () {
  await pageFixture.page.goto("https://www.google.co.uk");
});


Given('the User accepts all cookies', async function () {
  // await searchPage.acceptAllCookies();
  pageFixture.page.locator("//div[text()='Accept all']").click();
});

When('the User searches for {string}', async function (searchString) {
  await searchPage.searchForText(searchString);
  // await pageFixture.page.getByTitle('Search').click();
  // await pageFixture.page.getByTitle('Search').fill('DuckDuckGo');
  // await pageFixture.page.getByTitle('Search').click();
  // await pageFixture.page.getByTitle('Search').click();
  // // await pageFixture.page.keyboard.down('ArrowDown');
  // await pageFixture.page.getByTitle('Search').press('Tab');
  // await pageFixture.page.getByTitle('Search').press('Tab');
  // await pageFixture.page.getByTitle('Search').press('Tab');
  // await pageFixture.page.getByTitle('Search').press('Enter');
  // await pageFixture.page.getByRole('presentation', {name: 'DuckDuckGo' }).click();



});
Then('{string} is returned', async function (searchResultsString) {
  await searchPage.textIsReturned(searchResultsString)
});

// Then('images for duck are returned', async function () {
//     // await searchPage.textIsReturned(searchResultsString)
//     await expect(pageFixture.page.getByRole('heading', {name: 'DuckDuckGo — Privacy, simplified.' })).toBeVisible();
//   //  await expect( pageFixture.page.locator("//h3[text()='DuckDuckGo — Privacy, simplified.']")).toBeVisible();
//   });
