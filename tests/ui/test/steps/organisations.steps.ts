import { Given , When , Then } from "@cucumber/cucumber";
import { pageFixture } from "../../src/hooks/pageFixture";
import OrganisationsPage from "../../src/pages/organisationsPage";
import { expect } from "playwright/test";

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

Then('{string} is displayed on the screen', async function (text: string) {
  await organisationsPage.errorMessage(text);
});

Then('a managing organisation error is not displayed on the page', async function () {
  await organisationsPage.orgErrorNotVisible();
});

Then('all validation errors are displayed on the page', async function () {
  await organisationsPage.orgErrorVisible();
  await organisationsPage.postcodeErrorVisible();
  await organisationsPage.orgNameErrorVisible();
});

Then('no field level errors are displayed on the page', async function () {
  await organisationsPage.orgErrorNotVisible(),
  await organisationsPage.postcodeErrorNotVisible(),
  await organisationsPage.orgNameErrorNotVisible();
});

Then('option to add a new organisation is selected by default', async function () {
  await organisationsPage.addOrganisationOptionIsSelected();
});

Then('a summary {string} error link text: {string} is displayed on the page', async function (type: string, message: string) {
  expect(await organisationsPage.getOrgErrorSummaryLink(type)).toContainText(message);
});

Then('a summary {string} error message: {string} is displayed on the page', async function (type: string, message: string) {
  expect(await organisationsPage.getOrgErrorSummary(type)).toContainText(message);
});

Then('I click the summary {string} error link text', async function (type: string) {
    await organisationsPage.clickOrgInputField(type);
});

Then('the organisation {string} field is focused', async function (type: string) {
  expect(await organisationsPage.getOrgInputField(type)).toBeFocused();;
});
