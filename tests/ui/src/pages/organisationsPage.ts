import { expect, Page } from "@playwright/test";
import {pageFixture} from "../../src/hooks/pageFixture";

export default class OrganisationsPage {
  constructor(page: Page) {
    pageFixture.page = page;
  }

private organisationsPageElements = {
  addCardLink : "add-card-link",
  searchBox: 'Search'
  }

  async clickTestId(action: string) {
    await expect(pageFixture.page.getByTestId(this.organisationsPageElements.addCardLink).click());
  }
}
