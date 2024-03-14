import { test, expect } from '@playwright/test';
// import SearchPage from '../../src/pages/search-page';
import { getCloudFrontUrl } from "../../src/utilities/cloudFront";

// let searchPage: SearchPage;

// test.describe('Cloudfront tests', async () => {
//   test.beforeEach(async ({ page }) => {
//     await test.step('Navigate to the cloudfront endpoint', async () => {
//       searchPage = new SearchPage(page);
//       await page.goto('https://d3e14zbb5ii12g.cloudfront.net/');
//     });
//   });

//   test('Navigate to home page via env', async () => {
//     await test.step('Then "Capacity Management" link is displayed on the page', async () => {
//       await expect(searchPage.linkIsReturned('Capacity Management')).toBeVisible();
//     });
//   });
// });
