import { test , expect} from '@playwright/test';
import Accessibility from '../../src/utilities/accessibility';
import OrgPage from '../../src/pages/organisations-page';
import OrgSearchPage from '../../src/pages/organisation-search-page';
import OrgAddPage from '../../src/pages/organisation-add-page';

let accessibility: Accessibility;
let orgPage: OrgPage;
let orgSearchPage: OrgSearchPage;
let orgAddPage: OrgAddPage;

test.describe('As a user I want to be able to check the Test pages for accessibility issues', {
  tag: '@Accessibility',
}, async () => {

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
      let reportCount = await accessibility.expectAccessibilityCheckFails(testInfo.title);
      expect(reportCount).toBeGreaterThan(0);
    });
  });

});

test.describe('As a user I want to be able to check the Organisation pages for accessibility issues', {
  tag: '@Accessibility',
}, async () => {

  test.beforeEach(async ({ page }, testInfo) => {
    await test.step('Set up page objects', async () => {
      accessibility = new Accessibility(page);
      orgPage = new OrgPage(page);
      orgAddPage = new OrgAddPage(page);
      orgSearchPage = new OrgSearchPage(page);
    });
  });

  test('The Organisation landing pages has no accessibility issues',  async ({page}, testInfo) => {
    await test.step('Load the organisation landing page', async () => {
      await page.goto('/');
        });
      await test.step('The accessibility tests do not fail', async () => {
        const timestamp = new Date().toISOString().replace(/:/g, '-');
        await accessibility.runAxeCheck(testInfo.title+'-'+timestamp);
        let reportCount = await accessibility.expectAccessibilityCheckFails(testInfo.title);
        expect(reportCount).toBe(0);
      });
    });

  test('The Organisation search pages have no accessibility issues',  async ({page}, testInfo) => {
    await test.step('Load the organisation search page', async () => {
      await page.goto('/');
      await orgPage.clickGoToSearch();
        });
    await test.step('The accessibility tests do not fail', async () => {
      const timestamp = new Date().toISOString().replace(/:/g, '-');
      await accessibility.runAxeCheck(testInfo.title+'-'+timestamp);
      let reportCount = await accessibility.expectAccessibilityCheckFails(testInfo.title);
      expect(reportCount).toBe(0);
    });
  });

    test('The Organisation search results page has no accessibility issues',  async ({page}, testInfo) => {
    await test.step('Load the organisation search results page', async () => {
      await page.goto('/');
      await orgPage.clickGoToSearch();
      await orgSearchPage.inputSearchText('London');
      await orgSearchPage.clickSearch();
        });
      await test.step('The accessibility tests do not fail', async () => {
        const timestamp = new Date().toISOString().replace(/:/g, '-');
        await accessibility.runAxeCheck(testInfo.title+'-'+timestamp);
        let reportCount = await accessibility.expectAccessibilityCheckFails(testInfo.title);
        expect(reportCount).toBe(0);
      });
    });

  test('The Organisation add page has no accessibility issues',  async ({page}, testInfo) => {
    await test.step('Load the organisation add page', async () => {
      await page.goto('/');
      await orgPage.clickGoToSearch();
      await orgSearchPage.inputSearchText('Royal');
      await orgSearchPage.clickSearch();
      await orgSearchPage.clickNewItemLink();
        });
    await test.step('The accessibility tests do not fail', async () => {
      const timestamp = new Date().toISOString().replace(/:/g, '-');
      await accessibility.runAxeCheck(testInfo.title+'-'+timestamp);
      let reportCount = await accessibility.expectAccessibilityCheckFails(testInfo.title);
      expect(reportCount).toBe(0);
    });
  });

});

