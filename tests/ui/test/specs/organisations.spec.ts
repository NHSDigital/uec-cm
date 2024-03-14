import { test, expect } from '@playwright/test';
import OrgPage from '../../src/pages/organisations-page';

let orgPage: OrgPage;

test.describe.only('As a user I want to be able to work with organisations', async () => {
  test.beforeEach(async ({ page }) => {
    await test.step('Navigate to landing page', async () => {
      await page.goto('/');
      orgPage = new OrgPage(page);
    });
  });

  test('The Organisations page is presented correctly', async () => {
    await test.step('Then the Organisations banner is visible', async () => {
      await expect(orgPage.orgBanner()).toBeVisible;
      await expect(orgPage.getText('Organisations')).toContainText('Organisations');
      await expect(orgPage.getText('Organisations')).toBeVisible();
    });
  });
});
