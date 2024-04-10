import { Locator, Page } from "@playwright/test";

export default class OrgSearchPage {
  constructor(readonly page: Page) {
    this.page = page;
  }

  // search page
  static readonly searchInputField = 'search-field-input'
  static readonly searchInputFieldError = 'search-field-error-message'
  static readonly searchButton = 'search-button'

  // results page
  static readonly nextResultsSet = 'next-link'
  static readonly previousResultsSet = 'previous-link'
  static readonly searchResultsText = 'search-results-list'
  static readonly searchResultsTable = 'search-results-table-body'
  static readonly searchResultsPaginationDisplay = 'results-info'
  static readonly pagination = 'pagination'
  static readonly addNewItemLink = 'add-new-item-link'
  static readonly orgAddNewOption = 'yes-radio'
  static readonly orgSearchLabel = 'Organisation search'
  static readonly orgSearchInputFieldLabel = 'search-field--label'
  static readonly orgSearchInputFieldLabelText = 'Organisation or Location or Postcode'
  static readonly orgSearchNextBtn = 'next-button'
  static readonly searchResultItem = `div[role='button']`
  static readonly searchResultItemByPosition = (number: string) => `search-row-${number}-link`
  static readonly searchResultType = (number: string, type: string) => `search-row-${number}-${type}-box`




  // Getters
  getSearchInputField(): Locator {
    return this.page.getByTestId(OrgSearchPage.searchInputField);
  }

  getResultItemByName(name: string): Locator {
    return this.page.locator(OrgSearchPage.searchResultItem, { has: this.page.locator(`text=${name}`)});
  }

  getSearchInputFieldError(): Locator {
    return this.page.locator('id='+ OrgSearchPage.searchInputFieldError);
  }

  searchButton(): Locator {
    return this.page.getByTestId(OrgSearchPage.searchButton);
  }

  getSearchResultItemByPosition(number: string): Locator {
    return this.page.getByTestId(OrgSearchPage.searchResultItemByPosition(number));
  }

  getSearchResultType(number: string, text: string): Locator {
    return this.page.getByTestId(OrgSearchPage.searchResultType(number, text));
  }

  getPagination(): Locator {
    return this.page.getByTestId(OrgSearchPage.pagination);
  }

  getSearchResultsPaginationDisplay(): Locator {
    return this.page.getByTestId(OrgSearchPage.searchResultsPaginationDisplay);
  }

  getNextResultsSet(): Locator {
    return this.page.getByTestId(OrgSearchPage.nextResultsSet);
  }

  getPreviousResultsSet(): Locator {
    return this.page.getByTestId(OrgSearchPage.previousResultsSet);
  }

  getErrorMessage(text: string): Locator {
    return this.page.getByText(text);
  }

  getOrgSearchPageText(text: string): Locator {
    return this.page.getByText(text);
  }

  getAddOrganisationOption(): Locator {
    return this.page.getByTestId(OrgSearchPage.orgAddNewOption);
  }

  getSearchLabel(): Locator {
    return this.page.getByLabel(OrgSearchPage.orgSearchLabel);
  }

  getSearchInputFieldLabel(): Locator {
    return this.page.getByLabel(OrgSearchPage.orgSearchInputFieldLabel);
  }

  getSearchInputFieldLabelText(): Locator {
    return this.page.getByLabel(OrgSearchPage.orgSearchInputFieldLabelText);
  }

  getPageLabelByText(text: string): Locator {
    return this.page.locator('label', { has: this.page.locator(`text=${text}`)});
  }

  // Methods
  async clickSearch() {
    await this.page.getByTestId(OrgSearchPage.searchButton).click();
  }

  async selectResultItemByName(name: string) {
    await this.getResultItemByName(name).click();
  }

  async clickNextBtn() {
    await this.page.getByTestId(OrgSearchPage.orgSearchNextBtn).click();
  }

  async clickNewItemLink() {
    await this.page.getByTestId(OrgSearchPage.addNewItemLink).click();
  }

  async inputSearchText(text: string) {
    await this.page.getByTestId(OrgSearchPage.searchInputField).fill(text);
  }

  async clickNext() {
    await this.page.getByTestId(OrgSearchPage.nextResultsSet).click();
  }

  async clickPrevious() {
      await this.page.getByTestId(OrgSearchPage.previousResultsSet).click();
  }

  async getResultsTableRowCount() {
    const table = await this.page.getByTestId(OrgSearchPage.searchResultsTable);
    return await table.locator('tr').count();
  }
}
