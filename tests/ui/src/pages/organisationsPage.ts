import { expect, Page } from "@playwright/test";
import {pageFixture} from "../../src/hooks/pageFixture";

export default class OrganisationsPage {
  constructor(page: Page) {
    pageFixture.page = page;
  }


static readonly add = 'add-card-link'
static readonly orgName = 'name-input'
static readonly postcode = 'postcode-input'
static readonly org = 'managing-organisation-input'
static readonly searchInstructions = 'search-by'
static readonly postcodeError = 'postcode-error-message'
static readonly orgAddSearchBtn = 'search-button'


async clickAdd() {
  await pageFixture.page.getByTestId(OrganisationsPage.add).click();
}

async clickOrgAddSearch() {
  await pageFixture.page.getByTestId(OrganisationsPage.orgAddSearchBtn).click();
}

async inputName(name: string) {
  await pageFixture.page.getByTestId(OrganisationsPage.orgName).fill(name);
}

async inputPostcode(postcode: string) {
  await pageFixture.page.getByTestId(OrganisationsPage.postcode).fill(postcode);
}

async inputOrg(org: string) {
  await pageFixture.page.getByTestId(OrganisationsPage.org).fill(org);
}

async enteredName(name: string) {
  await expect(pageFixture.page.getByTestId(OrganisationsPage.name)).toHaveValue(name);
}

async enteredPostcode(postcode: string) {
  await expect(pageFixture.page.getByTestId(OrganisationsPage.postcode)).toHaveValue(postcode);
}

async enteredOrg(org: string) {
  await expect(pageFixture.page.getByTestId(OrganisationsPage.orgName)).toHaveValue(org);
}

async searchInstructionsAreReturned(Text: string) {
  await expect(pageFixture.page.getByTestId(OrganisationsPage.searchInstructions)).toContainText(Text);
}

async postcodeErrorVisible() {
  await expect(pageFixture.page.getByTestId(OrganisationsPage.postcodeError)).toBeVisible;
}

async postcodeErrorMessage(Text: string) {
  await expect(pageFixture.page.getByText(Text)).toBeVisible;

}

}
