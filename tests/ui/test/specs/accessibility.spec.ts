import { test , expect} from '@playwright/test';
import Accessibility from '../../src/utilities/accessibility';
import OrgAddPage from '../../src/pages/organisation-add-page';

let orgAddPage: OrgAddPage;
let accessibility: Accessibility;


test.describe('As a user I want to be able to check the Organisation pages for accessibility issues', () => {

  test.beforeEach(async ({page}, testInfo) => {
    await test.step('Navigate to the accessibility test page', async () => {
      accessibility = new Accessibility(page);
      await page.goto('/test');
    });
  });

  test('The accessibility tests run and the test page fails',  async ({page}, testInfo) => {
    await test.step('The search instructions are displayed on the page', async () => {
      await expect(page.getByRole('link', { name: 'Capacity management' })).toBeVisible;
        });
    await test.step('The accessibility tests fail', async () => {
      const timestamp = new Date().toISOString().replace(/:/g, '-');
      await accessibility.runAxeCheck(testInfo.title+'-'+timestamp);
      let reportCount = await accessibility.expectAccessibilityCheckFails("The accessibility tests run and the test page fails");
      expect(reportCount).toBeGreaterThan(0);
    });
  });

});
