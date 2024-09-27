import { Locator, Page } from "@playwright/test";
export default class ViewLocationsPage {
  constructor(readonly page: Page) {
    this.page = page;
  }

  static readonly myLocations_lbl = "My locations";
  static readonly reports_lbl = "Reports";
  static readonly downloadReport_btn = "Continue";

  // Getters
  getMyLocationsLabel(): Locator {
    return this.page.getByRole("heading", { name: "My locations" });
  }

  getReportsLabel(): Locator {
    return this.page.getByRole("heading", { name: "Reports" });
  }

  getDownloadReportButton(): Locator {
    return this.page.getByRole("button", { name: "Download Report" });
  }
}
