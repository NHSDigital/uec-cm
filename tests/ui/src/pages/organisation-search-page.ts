import { Locator, Page } from "@playwright/test";

export default class OrgSearchPage {
  constructor(readonly page: Page) {
    this.page = page;
  }
