import { Locator, Page } from "@playwright/test";

export default class OrgSearchPage {
  constructor(readonly page: Page) {
    this.page = page;
  }

// search page
// static readonly searchInputField = 'search-field-input'
static readonly searchInputField = 'name-input'
static readonly searchInputFieldError= 'search-field-error-message'
static readonly searchButton= 'search-button'

// results page
static readonly nextResultsSet = 'next-link'
static readonly previousResultsSet = 'previous-link'
static readonly searchResultsText = 'search-results-list'
static readonly searchResultsTable = 'search-results-table'
static readonly searchResultsPaginationDisplay = 'results-info'
static readonly addNewItemLink = 'add-new-item-link'
static readonly searchResultItem = (number: string) => `search-row-${number}-link`
static readonly searchResultType = (number: string, type: string) => `search-row-${number}-${type}-box`

// Getters

searchInputField(): Locator {
  return this.page.getByTestId(OrgSearchPage.searchInputField);
}

searchInputFieldError(): Locator {
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

}
