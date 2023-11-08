import { Given , When , Then } from "@cucumber/cucumber";
import {pageFixture} from "../../src/hooks/pageFixture";
import SearchPage from "../../src/pages/searchPage";

let searchPage: SearchPage;
searchPage = new SearchPage(pageFixture.page);

Given('the Google home page is displayed', async function () {
  await pageFixture.page.goto("https://www.google.co.uk");
});


Given('the User accepts all cookies', async function () {
  await searchPage.acceptAllCookies();
  // pageFixture.page.locator("//div[text()='Accept all']").click();
});

When('the User searches for {string}', async function (searchString) {
  await searchPage.searchForText(searchString);
  // await pageFixture.page.getByTitle('Search').click();
  // await pageFixture.page.getByTitle('Search').fill('duck');
  // await pageFixture.page.getByTitle('Search').press('Enter');

});
Then('{string} are returned', async function (searchResultsString) {
  await searchPage.textIsReturned(searchResultsString)
});

