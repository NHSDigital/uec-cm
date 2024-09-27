import { test, expect } from "@playwright/test";
import { allure } from "allure-playwright";
import ViewLocationsPage from "../../src/pages/view-locations-page";
import BasePage from "../../src/pages/base-page";

let viewLcPage: ViewLocationsPage;
let basePage: BasePage;
let pageTitle: string = "UEC Capacity Management";

test.describe("As a user I want to be able to view the locations", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await allure.parentSuite(testInfo.project.name);
    await allure.suite("Tests for view locations journeys");
    await allure.subSuite("Tests for locations landing page");
    viewLcPage = new ViewLocationsPage(page);
    basePage = new BasePage(page);
    await test.step("Navigate to landing page", async () => {
      await page.goto("/prototype");
      await test.step("Enter user name and password", async () => {
        await basePage.login();
      });
      await test.step("Verify Title of the page", async () => {
        await expect(page).toHaveTitle(pageTitle);
      });
    });
  });

  test("My locations page is presented correctly", { tag: ["@prototype"] }, async () => {
      await test.step(" My locations label is visible", async () => {
        await expect.soft(viewLcPage.getMyLocationsLabel()).toHaveText("My locations");
      });
      await test.step(" Reports and Download report button is visible", async () => {
        await expect(viewLcPage.getReportsLabel()).toBeVisible();
        await expect(viewLcPage.getDownloadReportButton()).toBeVisible();
      });
    });
});
