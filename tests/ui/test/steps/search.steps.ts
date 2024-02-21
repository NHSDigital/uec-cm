import { Given, When, Then } from "@cucumber/cucumber";
import { pageFixture } from "../../src/hooks/pageFixture";
import SearchPage from "../../src/pages/searchPage";
import { getCloudFrontUrl } from "../../src/utilities/cloudFront";

const searchPage: SearchPage = new SearchPage(pageFixture.page);

Given("I navigate to the cloudfront endpoint", async function () {
  const workspace = process.env.WORKSPACE as string;
  const env = process.env.ENV as string;
  const region = process.env.REGION as string;
  const distribution = getCloudFrontUrl(region, env, workspace);
  const url = JSON.parse(distribution);
  await pageFixture.page.goto("https://" + url.DomainName);
});

Given("I navigate to the organisations page", async function () {
  const workspace = process.env.WORKSPACE as string;
  const env = process.env.ENV as string;
  const region = process.env.REGION as string;
  const distribution = getCloudFrontUrl(region, env, workspace);
  const url = JSON.parse(distribution);
  await pageFixture.page.goto("https://" + url.DomainName);
});

Then("{string} is displayed on the page", async function (searchResultsText) {
  await searchPage.textIsReturned(searchResultsText);
});

Then(
  "{string} link is displayed on the page",
  async function (searchResultsLink) {
    await searchPage.linkIsReturned(searchResultsLink);
  },
);

Then("the accessibility checks are passing", async function () {
  await searchPage.runAxeCheck("accessibility_passing");
});

When("I remove any input element", async function () {
  await searchPage.removeAnyInputElement();
});

Then("the accessibility checks are failing", async function () {
  await searchPage.expectAccessibilityCheckFails("accessibility_failing");
});
