import { Locator, Page } from "@playwright/test";

export default class OrgSummaryPage {
  constructor(readonly page: Page) {
    this.page = page;
  }

  // static readonly pageHeading = 'Summary'
  // static readonly pageSubheading = 'Organisation'
  // static readonly organisationSummary = 'organisation-summary'
  static readonly organisationName = 'organisation-name'

  getPageLabel(text: string): Locator {
    return this.page.locator('label', { has: this.page.locator(`text=${text}`)});
  }

  // getPageSubHeading(): Locator {
  //   return this.page.getByLabel(OrgSummaryPage.pageSubheading);
  // }

  getOrganisationName(): Locator {
    return this.page.getByTestId(OrgSummaryPage.organisationName);
  }
}
