import { test, expect } from '@playwright/test';
import { allure } from "allure-playwright";
import OrgPage from '../../src/pages/organisations-page';

let orgPage: OrgPage;

test.describe('As a user I want to be able to work with organisations', async () => {
  test.beforeEach(async ({page}, testInfo) => {
    allure.parentSuite(testInfo.project.name);
    allure.suite("Tests for organisation journeys");
    allure.subSuite("Tests for organisation landing page");
    await test.step('Navigate to landing page', async () => {
      await page.goto('/');
      orgPage = new OrgPage(page);
    });
  });

  test('The Organisations page is presented correctly', async () => {
    await test.step('The Organisations banner is visible', async () => {
      await expect.soft(orgPage.orgBannerId()).toBeVisible;
      await expect.soft(orgPage.getBanner()).toBeVisible;
    });
    await test.step('And the Organisations banner text is visible', async () => {
      await expect.soft(orgPage.orgBannerTextId()).toBeVisible;
      await expect.soft(orgPage.getBannerText()).toBeVisible;
    });
    await test.step('And a Search card is visible', async () => {
      await expect.soft(orgPage.searchCard()).toBeVisible;
      await expect.soft(orgPage.searchCardLink()).toBeVisible;
    });
  });
});
