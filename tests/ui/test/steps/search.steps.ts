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
});

When('the User searches for {string}', async function (searchString) {
  await searchPage.searchForText(searchString);

});
Then('{string} is returned', async function (searchResultsString) {
  await searchPage.textIsReturned(searchResultsString)
});


