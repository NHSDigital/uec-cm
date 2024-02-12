import { Given , When , Then } from "@cucumber/cucumber";
import {pageFixture} from "../../src/hooks/pageFixture";
import SearchPage from "../../src/pages/searchPage";
import OrganisationsPage from "../../src/pages/organisationsPage";
import {getCloudFrontUrl} from "../../src/utilities/cloudfront";

let organisationsPage: OrganisationsPage;
organisationsPage = new OrganisationsPage(pageFixture.page);

When('I choose to {string} an organisation', async function (action) {
  await organisationsPage.clickTestId(action);
});

When('I add an organisation', async function () {
  await organisationsPage.clickAdd();
});

When('I enter {string} as the organisation name', async function (name) {
  await organisationsPage.inputName(name);
});

When('I enter {string} as the organisation postcode', async function (postcode) {
  await organisationsPage.inputPostcode(postcode);
});

When('I enter {string} as the organisation code', async function (org) {
  await organisationsPage.inputOrg(org);
});

Then('The instructions stating {string} are displayed on the page', async function (Text) {
  await organisationsPage.searchInstructionsAreReturned(Text);
});
