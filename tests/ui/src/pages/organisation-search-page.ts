import { Locator, Page } from "@playwright/test";

export default class OrgSearchPage {
  constructor(readonly page: Page) {
    this.page = page;
  }

// search page
static readonly searchInputField = 'search-field-input'
static readonly searchInputFieldError= 'search-field-error-message'
static readonly searchButton= 'search-button'

// results page
static readonly nextResultsSet = 'next-link'
static readonly previousResultsSet = 'previous-link'
static readonly searchResultsText = 'search-results-list'
static readonly searchResultsTable = 'search-results-table-body'
static readonly searchResultsPaginationDisplay = 'results-info'
static readonly pagination = 'pagination'
static readonly addNewItemLink = 'add-new-item-link'
static readonly orgAddNewOption = 'yes-radio'
static readonly searchResultItem = (number: string) => `search-row-${number}-link`
static readonly searchResultType = (number: string, type: string) => `search-row-${number}-${type}-box`


// Getters

searchInputField(): Locator {
  return this.page.getByTestId(OrgSearchPage.searchInputField);
}

getSearchInputFieldError(): Locator {
  return this.page.getByTestId(OrgSearchPage.searchInputFieldError);
}

searchButton(): Locator {
  return this.page.getByTestId(OrgSearchPage.searchButton);
}

getSearchResultItem(number: string): Locator {
  return this.page.getByTestId(OrgSearchPage.searchResultItem(number));
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

errorMessage(text: string): Locator {
  return this.page.getByText(text);
}

addOrganisationOptionIsSelected(): Locator {
  return this.page.getByTestId(OrgSearchPage.orgAddNewOption);
}


// Methods
async clickSearch() {
  await this.page.getByTestId(OrgSearchPage.searchButton).click();
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
    return await table.locator('tr').count();;
    }
}
