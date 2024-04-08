import { test, expect } from '@playwright/test';
import { allure } from "allure-playwright";
import OrgPage from '../../src/pages/organisations-page';

let orgPage: OrgPage;

test.describe('As a user I want to be able to work with organisations', async () => {
  test.beforeEach(async ({page}, testInfo) => {
    await allure.parentSuite(testInfo.project.name);
    await allure.suite("Tests for organisation journeys");
    await allure.subSuite("Tests for organisation landing page");
    await test.step('Navigate to landing page', async () => {
      await page.goto('/');
      orgPage = new OrgPage(page);
    });
  });

  test('The Organisations page is presented correctly', async () => {
    await test.step('The Organisations banner is visible', async () => {
      expect.soft(orgPage.orgBannerId()).toBeVisible;
      expect.soft(orgPage.getBanner()).toBeVisible;
    });
    await test.step('And the Organisations banner text is visible', async () => {
      expect.soft(orgPage.orgBannerTextId()).toBeVisible;
      expect.soft(orgPage.getBannerText()).toBeVisible;
    });
    await test.step('And a Search card is visible', async () => {
      expect.soft(orgPage.searchCard()).toBeVisible;
      expect.soft(orgPage.searchCardLink()).toBeVisible;
    });
  });
});
