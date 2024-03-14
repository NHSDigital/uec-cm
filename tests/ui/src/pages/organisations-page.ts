import { Locator, Page } from "@playwright/test";

export default class OrgPage {
  constructor(readonly page: Page) {
    this.page = page;
  }

  static readonly search = 'search-card-link'
  static readonly orgBannerHeading = 'banner_heading'
  static readonly orgBannerText = 'banner_text'


  // Getters

  orgBanner(): Locator {
    return this.page.getByTestId(OrgPage.orgBannerHeading);
  }

  orgBannerText(): Locator {
    return this.page.getByTestId(OrgPage.orgBannerText);
  }

  getText(text: string, matchtype = false ): Locator {
    return this.page.getByText(text, {exact: matchtype});
  }


  // Methods
  async clickSearch() {
  await this.page.getByTestId(OrgPage.search).click();
  }
}
