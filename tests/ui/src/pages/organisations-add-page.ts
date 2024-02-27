
import { expect, Locator, Page } from "@playwright/test";
import { pageFixture } from "../../src/hooks/pageFixture";

export default class OrganisationsPage {
  constructor(page: Page) {
    pageFixture.page = page;
  }

  static readonly add = 'add-card-link'
  static readonly searchInstructions = 'search-by'
  static readonly fieldError = (field: string) => `#${field}-error-message`
  static readonly orgAddSearchBtn = 'search-button'
  static readonly orgAddNewOption = 'yes-radio'
  static readonly orgErrorSummaryLink = (type: string) => `error-summary-${type}-link`
  static readonly orgErrorSummary = (type: string) => `error-summary-${type}`
  static readonly inputField = (field: string) => `${field}-input`

  // Getters
  async getOrgErrorSummaryLink(type: string): Promise<Locator> {
    return pageFixture.page.getByTestId(OrganisationsPage.orgErrorSummaryLink(type));
  }

  async getOrgErrorSummary(type: string): Promise<Locator> {
    return pageFixture.page.getByTestId(OrganisationsPage.orgErrorSummary(type));
  }

  async getOrgInputField(type: string): Promise<Locator> {
    return pageFixture.page.getByTestId(OrganisationsPage.inputField(type));
  }

  async getFieldErrorMessage(field: string): Promise<Locator> {
    return pageFixture.page.getByTestId(OrganisationsPage.fieldError(field));
  }

  async getFieldError(field: string): Promise<Locator> {
    return pageFixture.page.locator(OrganisationsPage.fieldError(field));
  }

  // Methods
  async clickAdd() {
    await pageFixture.page.getByTestId(OrganisationsPage.add).click();
  }

  async clickOrgAddSearch() {
    await pageFixture.page.getByTestId(OrganisationsPage.orgAddSearchBtn).click();
  }

  async inputTextInField(field: string, text: string) {
    await pageFixture.page.getByTestId(OrganisationsPage.inputField(field)).fill(text);
  }

  async searchInstructionsAreReturned(text: string) {
    await expect(pageFixture.page.getByTestId(OrganisationsPage.searchInstructions)).toContainText(text);
  }

  async errorMessage(text: string): Promise<Locator> {
    return pageFixture.page.getByText(text);
  }

  async addOrganisationOptionIsSelected(): Promise<Locator> {
    return pageFixture.page.getByTestId(OrganisationsPage.orgAddNewOption);
  }

  async clickOrgInputField(type: string) {
    (await this.getOrgInputField(type)).click();
  }
}
