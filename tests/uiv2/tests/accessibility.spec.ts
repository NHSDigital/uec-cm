import { test , expect} from '@playwright/test';
import OrgAddPage from '../pages/organisation-add-page';
import { getCloudFrontUrl } from "../utilities/cloudFront";
import Accessibility from '../utilities/accessibility';

let orgAddPage: OrgAddPage;
let accessibility: Accessibility;


test.describe('As a user I want to be able to check the Organisation pages for accessibility issues', () => {

  test.beforeEach(async ({page}, testInfo) => {
    await test.step('Navigate to the accessibility test page', async () => {
      accessibility = new Accessibility(page);
      const workspace = process.env.WORKSPACE as string;
      const env = process.env.ENV as string;
      const region = process.env.REGION as string;
      const distribution = getCloudFrontUrl(region,env, workspace);
      const url = JSON.parse(distribution);
      await page.goto("https://"+url.DomainName+"/test");
    });
  });

  test('The accessibility tests run and the test page fails',{tag: "@Test"} , async ({page}, testInfo) => {

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
