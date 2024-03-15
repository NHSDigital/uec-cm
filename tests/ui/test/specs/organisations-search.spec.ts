import { test, expect } from '@playwright/test';
import OrgPage from '../../src/pages/organisations-page';
import OrgSearchPage from '../../src/pages/organisation-search-page';

let orgPage: OrgPage;
let orgSearchPage: OrgSearchPage;

test.describe.only('As a user I want to be able to search for an organisation', async () => {
  test.beforeEach(async ({ page }) => {
    await test.step('Navigate to landing page', async () => {
      await page.goto('/organisations/add');
      orgPage = new OrgPage(page);
      orgSearchPage = new OrgSearchPage(page);
    });
  });

  test('The organisation search returns organisation and location records', async () => {
    await test.step('When I search for an organisation', async () => {
      await orgSearchPage.inputSearchText('London');
      await orgSearchPage.clickSearch();
    });
    await test.step('Then a location record is displayed', async () => {
      expect.soft(orgSearchPage.getSearchResultType('0', 'location')).toHaveText('LOCATION' )
      expect.soft(orgSearchPage.getSearchResultItem('0')).toHaveText('Default Mock Location 1 - Nottingham XX1 1XX' )
    });
    await test.step('And an organisation record is displayed', async () => {
      expect.soft(orgSearchPage.getSearchResultType('3', 'organisation')).toHaveText('ORGANISATION' )
      expect.soft(orgSearchPage.getSearchResultItem('3')).toHaveText('Default Mock Organisation 1' )
    });

  });
});
