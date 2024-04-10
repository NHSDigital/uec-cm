import { test, expect } from '@playwright/test';
import { allure } from "allure-playwright";
import OrgPage from '../../src/pages/organisations-page';
import OrgSearchPage from '../../src/pages/organisation-search-page';
import OrgSummaryPage from '../../src/pages/organisation-summary-page';

let orgPage: OrgPage;
let orgSearchPage: OrgSearchPage;
let orgSummaryPage: OrgSummaryPage;

const location = 'Default Mock Location 1 - Nottingham XX1 1XX';
const organisation = 'Default Mock Organisation 1';

test.describe('As a user I want to be able to search for an organisation', {
  tag: '@orgSearch',
}, async () => {

  test.beforeEach(async ({page}, testInfo) => {
    await allure.parentSuite(testInfo.project.name);
    await allure.suite("Tests for organisation journeys");
    await allure.subSuite("Tests for searching for organisations");
    await test.step('Navigate to landing page', async () => {
      await page.goto('/');
      orgPage = new OrgPage(page);
      orgSearchPage = new OrgSearchPage(page);
      orgSummaryPage = new OrgSummaryPage(page);
      await orgPage.clickGoToSearch();
    });
  });

  test('The organisation search page is presented correctly', async () => {
    await test.step('The Organisation search label is visible', async () => {
      expect(orgSearchPage.getSearchLabel()).toBeVisible;
    });
    await test.step('And the search instructions text is visible', async () => {
      expect(orgSearchPage.getOrgSearchPageText('Search by either organisation (e.g. Trust name) or location (e.g. Hospital name) or postcode')).toBeVisible;
    });
    await test.step('And a search box is visible', async () => {
      expect(orgSearchPage.getSearchInputField()).toBeVisible;
    });
    await test.step('And a search box label is visible', async () => {
      expect.soft(orgSearchPage.getSearchInputFieldLabel()).toBeVisible;
      expect.soft(orgSearchPage.getSearchInputFieldLabelText()).toBeVisible
    });
  });


  test('The organisation search returns organisation and location records', async () => {
    await test.step('When I search for an organisation that matches an organisation and location record', async () => {
      await orgSearchPage.inputSearchText('London');
      await orgSearchPage.clickSearch();
    });
    await test.step('Then a location record is returned', async () => {
      expect.soft(orgSearchPage.getSearchResultType('0', 'location')).toHaveText('LOCATION' )
      expect.soft(orgSearchPage.getSearchResultItemByPosition('0')).toHaveText(`${location}`)
    });
    await test.step('And an organisation record is returned', async () => {
      expect.soft(orgSearchPage.getSearchResultType('3', 'organisation')).toHaveText('ORGANISATION' )
      expect.soft(orgSearchPage.getSearchResultItemByPosition('3')).toHaveText(`${organisation}`)
    });
  });

  test('The organisation search returns 12 records and displays 10 records on a page one', async () => {
    await test.step('When I search for an organisation that returns 12', async () => {
      await orgSearchPage.inputSearchText('006');
      await orgSearchPage.clickSearch();
    });
    await test.step('Then the results are paginated ', async () => {
      expect(orgSearchPage.getPagination()).toBeVisible;
    });
    await test.step('And the message "Showing 1 to 10 of 12 results" is displayed ', async () => {
      expect.soft(orgSearchPage.getSearchResultsPaginationDisplay()).toBeVisible;
      expect.soft(orgSearchPage.getSearchResultsPaginationDisplay()).toContainText('Showing 1 to 10 of 12 results');
    });
    await test.step('And there are 10 rows displayed ', async () => {
      expect(await orgSearchPage.getResultsTableRowCount()).toEqual(10);
    });
    await test.step('And the Next Page link is enabled', async () => {
      expect(orgSearchPage.getNextResultsSet()).toBeVisible;
    });
    await test.step('And the Previous Page link is disabled', async () => {
      expect(orgSearchPage.getPreviousResultsSet()).toBeDisabled;
    });
  });

  test('The organisation search returns 12 records and displays 2 records on a page two', async () => {
    await test.step('When I search for an organisation that returns 12 records', async () => {
      await orgSearchPage.inputSearchText('006');
      await orgSearchPage.clickSearch();
      await orgSearchPage.clickNext();
    });
    await test.step('Then the results are paginated ', async () => {
      expect(orgSearchPage.getPagination()).toBeVisible;
    });
    await test.step('And the message "Showing 11 to 12 of 12 results" is displayed ', async () => {
      expect.soft(orgSearchPage.getSearchResultsPaginationDisplay()).toBeVisible;
      expect.soft(orgSearchPage.getSearchResultsPaginationDisplay()).toContainText('Showing 11 to 12 of 12 results');
    });
    await test.step('And there are 2 rows displayed ', async () => {
      expect(await orgSearchPage.getResultsTableRowCount()).toEqual(2);
    });
    await test.step('And the Next Page link is disabled', async () => {
      expect(orgSearchPage.getNextResultsSet()).toBeDisabled;
    });
    await test.step('And the Previous Page link is enabled', async () => {
      expect(orgSearchPage.getPreviousResultsSet()).toBeVisible;
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
        await expect(orgSearchPage.getAddOrganisationOption()).toBeChecked();
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

    test('Organisation search result summary correctly displayed', async () => {

      await test.step('When I search for an organisation using London', async () => {
        await orgSearchPage.inputSearchText('London');
        await orgSearchPage.clickSearch();
      });
      await test.step(`When I select ${organisation} from search results`, async () => {
        await orgSearchPage.selectResultItemByName(`${organisation}`);
      });
      await test.step('Then the organisation summary is correctly displayed', async () => {
        expect.soft(orgSummaryPage.getOrganisationName()).toContainText(`${organisation}`);
        expect.soft(orgSummaryPage.getPageLabel('Summary')).toBeVisible();
        expect.soft(orgSummaryPage.getPageLabel('Organisation')).toBeVisible();
      });
    });

    test('Location search result summary correctly displayed', async () => {

      await test.step('When I search for an organisation using London', async () => {
        await orgSearchPage.inputSearchText('London');
        await orgSearchPage.clickSearch();
      });
      await test.step(`When I select ${location} from search results`, async () => {
        await orgSearchPage.selectResultItemByName(`${location}`);
      });
      await test.step('Then the organisation summary is correctly displayed', async () => {
        expect.soft(orgSummaryPage.getOrganisationName()).toContainText(organisation);
        expect.soft(orgSummaryPage.getPageLabel('Summary')).toBeVisible();
        expect.soft(orgSummaryPage.getPageLabel('Organisation')).toBeVisible();
      });
    });
});
