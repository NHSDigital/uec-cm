import { Locator, Page } from "@playwright/test";

export default class OrgPage {
  constructor(readonly page: Page) {
    this.page = page;
  }

  static readonly searchCard = 'search-card-link'
  static readonly searchCardLink = '/organisations/search'
  static readonly orgBannerHeading = 'banner_heading'
  static readonly orgBannerText = 'banner_text'

  // Getters

  orgBannerId(): Locator {
    return this.page.getByTestId(OrgPage.orgBannerHeading);
  }

  orgBannerTextId(): Locator {
    return this.page.getByTestId(OrgPage.orgBannerText);
  }

  searchCard(): Locator {
    return this.page.getByTestId(OrgPage.searchCard);
  }

  searchCardLink(): Locator {
    return this.page.getByRole('link', {name: OrgPage.searchCardLink});
  }

  getText(text: string, matchtype = false ): Locator {
    return this.page.getByText(text, {exact: matchtype});
  }

  getBanner(): Locator {
    return this.getText('Organisations', true);
  }

  getBannerText(): Locator {
    return this.getText('If you wish to add a new entry, first search to check it does not already exist', true);
  }


  // Methods
  async clickGoToSearch() {
  await this.page.getByTestId(OrgPage.searchCard).click();
  }
}
