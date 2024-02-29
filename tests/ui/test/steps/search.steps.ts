import { Given , When , Then } from "@cucumber/cucumber";
import { pageFixture } from "../../src/hooks/pageFixture";
import SearchPage from "../../src/pages/search-page";
import { getCloudFrontUrl } from "../../src/utilities/cloudFront";
import { expect } from "playwright/test";
const searchPage: SearchPage = new SearchPage(pageFixture.page);

Given('I navigate to the cloudfront endpoint', async function () {
  const workspace = process.env.WORKSPACE as string;
  const env = process.env.ENV as string;
  const region = process.env.REGION as string;
  const distribution = getCloudFrontUrl(region,env, workspace);
  const url = JSON.parse(distribution);
  await pageFixture.page.goto("https://"+url.DomainName)

});

Given('I navigate to the organisations page', async function () {
  const workspace = process.env.WORKSPACE as string;
  const env = process.env.ENV as string;
  const region = process.env.REGION as string;
  const distribution = getCloudFrontUrl(region,env, workspace);
  const url = JSON.parse(distribution);
  await pageFixture.page.goto("https://"+url.DomainName);
});

Given('I navigate to the accessibility test page', async function () {
  const workspace = process.env.WORKSPACE as string;
  const env = process.env.ENV as string;
  const region = process.env.REGION as string;
  const distribution = getCloudFrontUrl(region,env, workspace);
  const url = JSON.parse(distribution);
  await pageFixture.page.goto("https://"+url.DomainName+"/test");
});

Then('{string} is displayed on the page', async function (searchResultsText) {
  expect(await searchPage.textIsReturned(searchResultsText)).toBeVisible();
});

Then('{string} link is displayed on the page', async function (searchResultsLink) {
  expect(await searchPage.linkIsReturned(searchResultsLink)).toBeVisible();
});

Then('the accessibility checks are passing', async function(reportName: string){
  await searchPage.runAxeCheck(reportName);
});

Then("the accessibility checks are failing", async function () {
  let reportCount = await searchPage.expectAccessibilityCheckFails("Navigate to poor accessibility test page");
  expect(reportCount).toBeGreaterThan(0);
});
