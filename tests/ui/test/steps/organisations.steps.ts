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

When('I enter {string} as the organisation name', async function (name) {
  await organisationsPage.inputName(name);
});

When('I enter {string} as the organisation postcode', async function (postcode) {
  await organisationsPage.inputPostcode(postcode);
});

When('I submit the search', async function () {
  await organisationsPage.clickOrgAddSearch();
});

Then('I enter {string} as the managing organisation', async function (org) {
  await organisationsPage.inputOrg(org);
});

When('{string} is input as the organisation name', async function (name) {
  await organisationsPage.inputName(name);
});

When('{string} is input as the organisation postcode', async function (postcode) {
  await organisationsPage.inputPostcode(postcode);
});

When('{string} is input as the managing organisation', async function (org) {
  await organisationsPage.inputOrg(org);
});

Then('The instructions stating {string} are displayed on the page', async function (Text) {
  await organisationsPage.searchInstructionsAreReturned(Text);
});

Then('a postcode error message {string} is displayed on the page', async function (Text) {
  await organisationsPage.postcodeErrorVisible();
  await organisationsPage.errorMessage(Text);
});

Then('a name message {string} is displayed on the page', async function (Text) {
  await organisationsPage.orgNameErrorVisible();
  await organisationsPage.errorMessage(Text);
});

Then('a managing organisation error message {string} is displayed on the page', async function (Text) {
  await organisationsPage.orgErrorVisible();
  await organisationsPage.errorMessage(Text);
});

Then('a postcode error is not displayed on the page', async function (Text) {
  await organisationsPage.postcodeErrorNotVisible();
});

Then('a name error is not displayed on the page', async function (Text) {
  await organisationsPage.orgNameErrorNotVisible();
});

Then('a managing organisation error is not displayed on the page', async function (Text) {
  await organisationsPage.orgErrorNotVisible();
});

Then('no errors are displayed on the page', async function (Text) {
  await organisationsPage.orgErrorNotVisible();
  await organisationsPage.postcodeErrorNotVisible();
  await organisationsPage.orgNameErrorNotVisible();
});

Then('all validation errors are displayed on the page', async function (Text) {
  await organisationsPage.orgErrorVisible();
  await organisationsPage.postcodeErrorVisible();
  await organisationsPage.orgNameErrorVisible();
});
