import { test, expect } from '@playwright/test';
import SearchPage from '../../src/pages/search-page';

let searchPage: SearchPage;

test.describe('Accessibility tests', async () => {
  test.beforeEach(async ({ page }) => {
    await test.step('Navigate to the cloudfront endpoint', async () => {
      searchPage = new SearchPage(page);
      await page.goto('/test');
    });
  });

  test('Navigate to poor accessibility test page', async () => {
    await test.step('Then "Capacity Management" link is displayed on the page', async () => {
      await expect(searchPage.linkIsReturned('Capacity Management')).toBeVisible();
    });
    await test.step('And the accessibility checks are failing', async () => {
      let reportCount = await searchPage.expectAccessibilityCheckFails("Navigate to poor accessibility test page");
      console.log(reportCount)
      expect(reportCount).toBeGreaterThan(0);
    });
  });
});
