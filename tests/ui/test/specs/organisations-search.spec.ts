import { test, expect } from '@playwright/test';
import OrgPage from '../../src/pages/organisations-page';
import OrgSearchPage from '../../src/pages/organisation-search-page';

let orgPage: OrgPage;
let orgSearchPage: OrgSearchPage;

test.describe('As a user I want to be able to search for an organisation', {
  tag: '@orgSearch',
}, async () => {
  test.beforeEach(async ({ page }) => {
    await test.step('Navigate to landing page', async () => {
      await page.goto('/');
      orgPage = new OrgPage(page);
      orgSearchPage = new OrgSearchPage(page);
      await orgPage.clickGoToSearch();
    });
  });

  test('The organisation search page is presented correctly', async () => {
    await test.step('The Organisation search label is visible', async () => {
      await expect(orgSearchPage.getSearchLabel()).toBeVisible;
    });
    await test.step('And the search instructions text is visible', async () => {
      await expect(orgSearchPage.getOrgSearchPageText('Search by either organisation (e.g. Trust name) or location (e.g. Hospital name) or postcode')).toBeVisible;
    });
    await test.step('And a search box is visible', async () => {
      await expect(orgSearchPage.getSearchInputField()).toBeVisible;
    });
    await test.step('And a search box label is visible', async () => {
      await expect.soft(orgSearchPage.getSearchInputFieldLabel()).toBeVisible;
      await expect.soft(orgSearchPage.getSearchInputFieldLabelText()).toBeVisible
    });
  });


  test('The organisation search returns organisation and location records', async () => {
    await test.step('When I search for an organisation that matches an organisation and location record', async () => {
      await orgSearchPage.inputSearchText('London');
      await orgSearchPage.clickSearch();
    });
    await test.step('Then a location record is returned', async () => {
      await expect.soft(orgSearchPage.getSearchResultType('0', 'location')).toHaveText('LOCATION' )
      await expect.soft(orgSearchPage.getSearchResultItem('0')).toHaveText('Default Mock Location 1 - Nottingham XX1 1XX' )
    });
    await test.step('And an organisation record is returned', async () => {
      await expect.soft(orgSearchPage.getSearchResultType('3', 'organisation')).toHaveText('ORGANISATION' )
      await expect.soft(orgSearchPage.getSearchResultItem('3')).toHaveText('Default Mock Organisation 1' )
    });
  });

  test('The organisation search returns 12 records and displays 10 records on a page one', async () => {
    await test.step('When I search for an organisation that returns 12', async () => {
      await orgSearchPage.inputSearchText('006');
      await orgSearchPage.clickSearch();
    });
    await test.step('Then the results are paginated ', async () => {
      await expect(orgSearchPage.getPagination()).toBeVisible;
    });
    await test.step('And the message "Showing 1 to 10 of 12 results" is displayed ', async () => {
      await expect.soft(orgSearchPage.getSearchResultsPaginationDisplay()).toBeVisible;
      await expect.soft(orgSearchPage.getSearchResultsPaginationDisplay()).toContainText('Showing 1 to 10 of 12 results');
    });
    await test.step('And there are 10 rows displayed ', async () => {
      await expect(await orgSearchPage.getResultsTableRowCount()).toEqual(10);
    });
    await test.step('And the Next Page link is enabled', async () => {
      await expect(orgSearchPage.getNextResultsSet()).toBeVisible;
    });
    await test.step('And the Previous Page link is disabled', async () => {
      await expect(orgSearchPage.getPreviousResultsSet()).toBeDisabled;
    });
  });

  test('The organisation search returns 12 records and displays 2 records on a page two', async () => {
    await test.step('When I search for an organisation that returns 12 records', async () => {
      await orgSearchPage.inputSearchText('006');
      await orgSearchPage.clickSearch();
      await orgSearchPage.clickNext();
    });
    await test.step('Then the results are paginated ', async () => {
      await  expect(orgSearchPage.getPagination()).toBeVisible;
    });
    await test.step('And the message "Showing 11 to 12 of 12 results" is displayed ', async () => {
      await expect.soft(orgSearchPage.getSearchResultsPaginationDisplay()).toBeVisible;
      await expect.soft(orgSearchPage.getSearchResultsPaginationDisplay()).toContainText('Showing 11 to 12 of 12 results');
    });
    await test.step('And there are 2 rows displayed ', async () => {
      await expect(await orgSearchPage.getResultsTableRowCount()).toEqual(2);
    });
    await test.step('And the Next Page link is disabled', async () => {
      await expect(orgSearchPage.getNextResultsSet()).toBeDisabled;
    });
    await test.step('And the Previous Page link is enabled', async () => {
      await expect(orgSearchPage.getPreviousResultsSet()).toBeVisible;
    });
  });

    test('The organisation search does not match a location or organisation', async () => {
      await test.step('When I search for an organisation that does not matches an organisation and location record', async () => {
        await orgSearchPage.inputSearchText('000');
        await orgSearchPage.clickSearch();
      });
      await test.step('Then "no results found" is displayed on the screen', async () => {
        await expect(orgSearchPage.getErrorMessage('no results found')).toBeVisible();
      });
      await test.step('And option to add a new organisation is selected by default', async () => {
        await expect(orgSearchPage.addOrganisationOptionIsSelected()).toBeChecked();
      });
    });

    test('Search text of less than 3 characters will not be permitted', async () => {
      await test.step('When I search for an organisation name of 2 characters ', async () => {
        await orgSearchPage.inputSearchText('NH');
        await orgSearchPage.clickSearch();
      });
      await test.step('Then an error message stating that "Enter a minimum of 3 characters" is displayed on the screen', async () => {
        await expect(orgSearchPage.getErrorMessage('Enter a minimum of 3 characters')).toBeVisible();
        await expect(orgSearchPage.getSearchInputFieldError()).toContainText('Enter a minimum of 3 characters');
      });
    });

});
