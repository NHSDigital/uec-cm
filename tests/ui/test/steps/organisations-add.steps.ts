import { Given , When , Then } from "@cucumber/cucumber";
import { pageFixture } from "../../src/hooks/pageFixture";
import OrganisationsPage from "../../src/pages/organisations-add-page";
import { expect } from "playwright/test";

let organisationsPage: OrganisationsPage;
organisationsPage = new OrganisationsPage(pageFixture.page);


When('I add an organisation', async function () {
  await organisationsPage.clickAdd();
});

When('I enter {string} in the {string} field', async function (text: string, field: string) {
  await organisationsPage.inputTextInField(field, text);
});

When('I submit the search', async function () {
  await organisationsPage.clickOrgAddSearch();
});

Then('The instructions stating {string} are displayed on the page', async function (text: string) {
  await organisationsPage.searchInstructionsAreReturned(text);
});

Then('a {string} field error message {string} is displayed on the page', async function (field: string, text: string) {
  expect(await organisationsPage.getFieldError(field)).toBeVisible();
  expect(await organisationsPage.errorMessage(text)).toBeVisible();
});

Then('a {string} error is not displayed on the page', async function (field: string) {
  expect(await organisationsPage.getFieldError(field)).toBeHidden();
});

Then('{string} is displayed on the screen', async function (text: string) {
  expect(await organisationsPage.errorMessage(text)).toBeVisible();
});

Then('all field level validation errors are displayed on the page', async function () {
  expect(await organisationsPage.getFieldError('name')).toBeVisible();
  expect(await organisationsPage.getFieldError('postcode')).toBeVisible();
  expect(await organisationsPage.getFieldError('organisation')).toBeVisible();
});

Then('no field level validation errors are displayed on the page', async function () {
  expect(await organisationsPage.getFieldError('name')).toBeHidden();
  expect(await organisationsPage.getFieldError('postcode')).toBeHidden();
  expect(await organisationsPage.getFieldError('managing-organisation')).toBeHidden();
});

Then('option to add a new organisation is selected by default', async function () {
  expect(await organisationsPage.addOrganisationOptionIsSelected()).toBeChecked();
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
