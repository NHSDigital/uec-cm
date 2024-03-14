
import { Locator, Page } from "@playwright/test";

export default class OrganisationsPage {
  constructor(readonly page: Page) {
    this.page = page;
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

  getOrgErrorSummaryLink(type: string): Locator {
    return this.page.getByTestId(OrganisationsPage.orgErrorSummaryLink(type));
  }

  getOrgErrorSummary(type: string): Locator {
    return this.page.getByTestId(OrganisationsPage.orgErrorSummary(type));
  }

  getOrgInputField(type: string): Locator {
    return this.page.getByTestId(OrganisationsPage.inputField(type));
  }

  getFieldErrorMessage(field: string): Locator {
    return this.page.getByTestId(OrganisationsPage.fieldError(field));
  }

  getFieldError(field: string): Locator {
    return this.page.locator(OrganisationsPage.fieldError(field));
  }

  searchInstructionsAreReturned(): Locator {
    return this.page.getByTestId(OrganisationsPage.searchInstructions);
  }

  errorMessage(text: string): Locator {
    return this.page.getByText(text);
  }

  addOrganisationOptionIsSelected(): Locator {
    return this.page.getByTestId(OrganisationsPage.orgAddNewOption);
  }

  getText(text: string): Locator {
    return this.page.getByText(text);
  }

  // Methods
  async clickAdd() {
    await this.page.getByTestId(OrganisationsPage.add).click();
  }

  async clickOrgAddSearch() {
    await this.page.getByTestId(OrganisationsPage.orgAddSearchBtn).click();
  }

  async inputTextInField(field: string, text: string) {
    await this.page.getByTestId(OrganisationsPage.inputField(field)).fill(text);
  }

  async clickOrgInputField(type: string) {
    await this.getOrgInputField(type).click();
  }
}
