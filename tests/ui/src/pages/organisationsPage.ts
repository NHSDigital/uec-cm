import { expect, Page } from "@playwright/test";
import {pageFixture} from "../../src/hooks/pageFixture";

export default class OrganisationsPage {
  constructor(page: Page) {
    pageFixture.page = page;
  }

private organisationsPageElements = {
  addOrganisation : 'add-card-link',
  name : 'name-input',
  postcode : 'postcode-input',
  org : 'managing-organisation-input',
  searchInstructions: 'search-by'
  }


  async clickTestId(action: string) {
    const pageAction = `this.organisationsPageElements.${action}`
    console.log(pageAction)
    await pageFixture.page.getByTestId(pageAction).click();
}

async clickAdd() {
  await pageFixture.page.getByTestId(this.organisationsPageElements.addOrganisation).click();
}

async inputName(name: string) {
  await pageFixture.page.getByTestId(this.organisationsPageElements.name).fill(name);
}

async inputPostcode(postcode: string) {
  await pageFixture.page.getByTestId(this.organisationsPageElements.postcode).fill(postcode);
}

async inputOrg(org: string) {
  await pageFixture.page.getByTestId(this.organisationsPageElements.org).fill(org);
}

async enteredName(name: string) {
  await expect(pageFixture.page.getByTestId(this.organisationsPageElements.name)).toHaveValue(name);
}

async enteredPostcode(postcode: string) {
  await expect(pageFixture.page.getByTestId(this.organisationsPageElements.postcode)).toHaveValue(postcode);
}

async enteredOrg(org: string) {
  await expect(pageFixture.page.getByTestId(this.organisationsPageElements.org)).toHaveValue(org);
}

async searchInstructionsAreReturned(Text: string) {
  await expect(pageFixture.page.getByTestId(this.organisationsPageElements.searchInstructions)).toContainText(Text);
}

}
