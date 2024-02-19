import { Given , When , Then } from "@cucumber/cucumber";
import {pageFixture} from "../../src/hooks/pageFixture";
import SearchPage from "../../src/pages/searchPage";
import OrganisationsPage from "../../src/pages/organisationsPage";
import {getCloudFrontUrl} from "../../src/utilities/cloudFront";

let organisationsPage: OrganisationsPage;
organisationsPage = new OrganisationsPage(pageFixture.page);


When('I add an organisation', async function () {
  await organisationsPage.clickAdd();
});

When('I enter {string} as the organisation name', async function (name: string) {
  await organisationsPage.inputName(name);
});

When('I enter {string} as the organisation postcode', async function (postcode: string) {
  await organisationsPage.inputPostcode(postcode);
});

When('I submit the search', async function () {
  await organisationsPage.clickOrgAddSearch();
});

Then('I enter {string} as the managing organisation', async function (org: string) {
  await organisationsPage.inputOrg(org);
});

When('{string} is input as the organisation name', async function (name: string) {
  await organisationsPage.inputName(name);
});

When('{string} is input as the organisation postcode', async function (postcode: string) {
  await organisationsPage.inputPostcode(postcode);
});

When('{string} is input as the managing organisation', async function (org: string) {
  await organisationsPage.inputOrg(org);
});

Then('The instructions stating {string} are displayed on the page', async function (text: string) {
  await organisationsPage.searchInstructionsAreReturned(text);
});

Then('a postcode error message {string} is displayed on the page', async function (text: string) {
  await organisationsPage.postcodeErrorVisible();
  await organisationsPage.errorMessage(text);
});

Then('a name message {string} is displayed on the page', async function (text: string) {
  await organisationsPage.orgNameErrorVisible();
  await organisationsPage.errorMessage(text);
});

Then('a managing organisation error message {string} is displayed on the page', async function (text: string) {
  await organisationsPage.orgErrorVisible();
  await organisationsPage.errorMessage(text);
});

Then('a postcode error is not displayed on the page', async function () {
  await organisationsPage.postcodeErrorNotVisible();
});

Then('a name error is not displayed on the page', async function () {
  await organisationsPage.orgNameErrorNotVisible();
});

Then('a no results found text is displayed on organisation page', async function () {
  await organisationsPage.orgNoResultsFound();
});

Then('a managing organisation error is not displayed on the page', async function () {
  await organisationsPage.orgErrorNotVisible();
});

Then('no errors are displayed on the page', async function () {
  await organisationsPage.orgErrorNotVisible(),
  await organisationsPage.postcodeErrorNotVisible(),
  await organisationsPage.orgNameErrorNotVisible();
});

Then('all validation errors are displayed on the page', async function () {
  await organisationsPage.orgErrorVisible();
  await organisationsPage.postcodeErrorVisible();
  await organisationsPage.orgNameErrorVisible();
});

Then('a managing organisation error message {string} is displayed on the page', async function (text: string) {
  await organisationsPage.orgErrorVisible();
  await organisationsPage.errorMessage(text);
});

Then('a postcode error is not displayed on the page', async function () {
  await organisationsPage.postcodeErrorNotVisible();
});

Then('a name error is not displayed on the page', async function () {
  await organisationsPage.orgNameErrorNotVisible();
});

Then('a managing organisation error is not displayed on the page', async function () {
  await organisationsPage.orgErrorNotVisible();
});

Then('no errors are displayed on the page', async function () {
  await organisationsPage.orgErrorNotVisible(),
  await organisationsPage.postcodeErrorNotVisible(),
  await organisationsPage.orgNameErrorNotVisible();
});

Then('all validation errors are displayed on the page', async function () {
  await organisationsPage.orgErrorVisible();
  await organisationsPage.postcodeErrorVisible();
  await organisationsPage.orgNameErrorVisible();
});
