import { Given , When , Then } from "@cucumber/cucumber";
import {pageFixture} from "../../src/hooks/pageFixture";
import SearchPage from "../../src/pages/searchPage";
import OrganisationsPage from "../../src/pages/organisationsPage";
import {getCloudFrontUrl} from "../../src/utilities/cloudfront";

let organisationsPage: OrganisationsPage;
organisationsPage = new OrganisationsPage(pageFixture.page);

When('I choose to {string} an organisation', async function (action) {
  await organisationsPage.clickTestId(action)
});
