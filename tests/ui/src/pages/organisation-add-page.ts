
import { Locator, Page } from "@playwright/test";

export default class OrgAddPage {
  constructor(readonly page: Page) {
    this.page = page;
  }

  static readonly orgAddLabel = 'Add a new organisation (e.g. Trust)'
  static readonly orgAddInstructions = 'search-by'
  static readonly orgSearchInputFieldLabelText = 'Organisation or Location or Postcode'
  static readonly inputField = (field: string) => `organisation-${field}-input`
  static readonly fieldError = (field: string) => `#organisation-${field}-error-message`
  static readonly orgAddNextBtn = 'next-button'


  // Getters

  getOrgAddLabel(): Locator {
    return this.page.getByLabel(OrgAddPage.orgAddLabel);
  }

  getOrgAddInstructions(): Locator {
    return this.page.getByTestId(OrgAddPage.orgAddInstructions);
  }

  getAddOrgInputField(type: string): Locator {
    return this.page.getByTestId(OrgAddPage.inputField(type));
  }

  getFieldErrorMessage(field: string): Locator {
    return this.page.getByTestId(OrgAddPage.fieldError(field));
  }

  getFieldError(field: string): Locator {
    return this.page.locator(OrgAddPage.fieldError(field));
  }

  getOrgAddPageText(text: string): Locator {
    return this.page.getByText(text);
  }

    // Methods
  async clickNext() {
    await this.page.getByTestId(OrgAddPage.orgAddNextBtn).click();
  }

  getErrorMessage(text: string): Locator {
    return this.page.getByText(text);
  }

  async inputTextInField(field: string, text: string) {
    await this.page.getByTestId(OrgAddPage.inputField(field)).fill(text);
  }

  async selectFromDropdown(field: string, text: string) {
    await this.page.getByTestId(OrgAddPage.inputField(field)).selectOption(text);
  }

}
