import { test, expect } from '@playwright/test';
import OrgAddPage from '../../src/pages/organisation-add-page';

let orgAddPage: OrgAddPage;

test.describe.skip('As a user I want to be able to manage organisation data', async () => {
  test.beforeEach(async ({ page }) => {
    await test.step('Navigate to landing page', async () => {
      await page.goto('/');
    });
    await test.step('Navigate to Add Organisations page', async () => {
      orgAddPage = new OrgAddPage(page);
      await orgAddPage.clickAdd();
    });
  });


  test('Confirm on organisation page',async () => {
    await expect(orgAddPage.searchInstructionsAreReturned()).toBeVisible();
    await expect(orgAddPage.searchInstructionsAreReturned()).toContainText('Search by either name, postcode or managing organisation.');
    await expect(orgAddPage.getText('Organisation search')).toBeVisible();
  });


  test('Search for an organisation name', async () => {
    await test.step('Given I enter "0" in the "name" field', async () => {
      await orgAddPage.inputTextInField('name', '0');
    });
    await test.step('And I submit the search', async () => {
      await orgAddPage.clickOrgAddSearch();
    });

    await test.step('Then "no results found" is displayed on the screen', async () => {
      await expect(orgAddPage.errorMessage('no results found')).toBeVisible();
    });

    await test.step('And option to add a new organisation is selected by default', async () => {
      await expect(orgAddPage.addOrganisationOptionIsSelected()).toBeChecked();
    });
  });

  test('Search for an invalid length in organisation name', async () => {
    await test.step('Given I enter "This is a name of more than 100 characters. This name is 101 characters. This name is 101 characters." in the "name" field', async () => {
      await orgAddPage.inputTextInField(
        'name',
        'This is a name of more than 100 characters. This name is 101 characters. This name is 101 characters.'
      );
    });
    await test.step('And I submit the search', async () => {
      await orgAddPage.clickOrgAddSearch();
    });
    await test.step('Then a "name" field error message "Enter a valid name" is displayed on the page', async () => {
      await expect(orgAddPage.getFieldError('name')).toContainText('Enter a valid name');
      await expect(orgAddPage.errorMessage('Enter a valid name')).toBeVisible();
    });
  });

  test('Search for an invalid characters in organisation name', async () => {
    await test.step('Given I enter "^This is a name of with invalid characters £" in the "name" field', async () => {
      await orgAddPage.inputTextInField(
        'name',
        '^This is a name of with invalid characters £'
      );
    });
    await test.step('And I submit the search', async () => {
      await orgAddPage.clickOrgAddSearch();
    });
    await test.step('Then a "name" field error message "Enter a valid name" is displayed on the page', async () => {
      await expect(orgAddPage.getFieldError('name')).toContainText('Enter a valid name');
      await expect(orgAddPage.errorMessage('Enter a valid name')).toBeVisible();
    });
  });

  test('Search for an organisation postcode', async () => {
    await test.step('Given I enter "BD1 1AW" in the "postcode" field', async () => {
      await orgAddPage.inputTextInField(
        'postcode',
        'BD1 1AW'
      );
    });
    await test.step('And I submit the search', async () => {
      await orgAddPage.clickOrgAddSearch();
    });
    await test.step('Then a "postcode" error is not displayed on the page', async () => {
      await expect(orgAddPage.getFieldError('postcode')).toBeHidden();
    });
  });

  test('Search for an invalid organisation postcode', async () => {
    await test.step('Given I enter "BD1 1AWW" in the "postcode" field', async () => {
      await orgAddPage.inputTextInField(
        'postcode',
        'BD1 1AWW'
      );
    });
    await test.step('And I submit the search', async () => {
      await orgAddPage.clickOrgAddSearch();
    });
    await test.step('Then a "postcode" field error message "Enter a valid postcode" is displayed on the page', async () => {
      await expect(orgAddPage.getFieldError('postcode')).toContainText('Enter a valid postcode');
      await expect(orgAddPage.errorMessage('Enter a valid postcode')).toBeVisible();
    });
  });

  test('Search for a managing organisation', async () => {
    await test.step('Given I enter "0" in the "managing organisation" field', async () => {
      await orgAddPage.inputTextInField('name', '0');
    });
    await test.step('And I submit the search', async () => {
      await orgAddPage.clickOrgAddSearch();
    });

    await test.step('Then "no results found" is displayed on the screen', async () => {
      await expect(orgAddPage.errorMessage('no results found')).toBeVisible();
    });

    await test.step('And option to add a new organisation is selected by default', async () => {
      await expect(orgAddPage.addOrganisationOptionIsSelected()).toBeChecked();
    });
  });

  test('Search for an invalid length in managing organisation', async () => {
    await test.step('Given I enter "This is a name of more than 100 characters. This name is 101 characters. This name is 101 characters." in the "managing-organisation" field', async () => {
      await orgAddPage.inputTextInField(
        'managing-organisation',
        'This is a name of more than 100 characters. This name is 101 characters. This name is 101 characters.'
      );
    });
    await test.step('And I submit the search', async () => {
      await orgAddPage.clickOrgAddSearch();
    });
    await test.step('Then a "managing organisation" field error message "Enter a valid managing organisation" is displayed on the page', async () => {
      await expect(orgAddPage.getFieldError('organisation')).toContainText('Enter a valid managing organisation');
      await expect(orgAddPage.errorMessage('Enter a valid managing organisation')).toBeVisible();
    });
  });

  test('Search for an invalid characters in managing organisation', async () => {
    await test.step('Given I enter "^This is a name of with invalid characters £" in the "managing-organisation" field', async () => {
      await orgAddPage.inputTextInField(
        'managing-organisation',
        '^This is a name of with invalid characters £'
      );
    });
    await test.step('And I submit the search', async () => {
      await orgAddPage.clickOrgAddSearch();
    });
    await test.step('Then a "managing organisation" field error message "Enter a valid managing organisation" is displayed on the page', async () => {
      await expect(orgAddPage.getFieldError('organisation')).toContainText('Enter a valid managing organisation');
      await expect(orgAddPage.errorMessage('Enter a valid managing organisation')).toBeVisible();
    });
  });

  test('Search for invalid characters in all search fields', async () => {
    await test.step('Given I enter "!123$£" in the "name" field', async () => {
      await orgAddPage.inputTextInField(
        'name',
        '!123$£'
      );
    });
    await test.step('And I enter "1AA W22" in the "postcode" field', async () => {
      await orgAddPage.inputTextInField(
        'postcode',
        '1AA W22'
      );
    });
    await test.step('And I enter "!123\ £" in the "managing-organisation" field', async () => {
      await orgAddPage.inputTextInField(
        'managing-organisation',
        '!123\ £'
      );
    });
    await test.step('And I submit the search', async () => {
      await orgAddPage.clickOrgAddSearch();
    });
    await test.step('Then all field level validation errors are displayed on the page', async () => {
      await expect(orgAddPage.getFieldError('name')).toBeVisible();
      await expect(orgAddPage.getFieldError('postcode')).toBeVisible();
      await expect(orgAddPage.getFieldError('organisation')).toBeVisible();
    });
  });

  test('No results found displayed with non existent organisation name', async () => {
    await test.step('Given I enter "0" in the "name" field', async () => {
      await orgAddPage.inputTextInField(
        'name',
        '0'
      );
    });
    await test.step('And I submit the search', async () => {
      await orgAddPage.clickOrgAddSearch();
    });
    await test.step('Then "no results found" is displayed on the screen', async () => {
      await expect(orgAddPage.errorMessage('no results found')).toBeVisible();
    });

    await test.step('And option to add a new organisation is selected by default', async () => {
      await expect(orgAddPage.addOrganisationOptionIsSelected()).toBeChecked();
    });
  });

  test('No results found displayed with non existent managing organisation', async () => {
    await test.step('Given I enter "0" in the "managing organisation" field', async () => {
      await orgAddPage.inputTextInField('managing-organisation', '0');
    });
    await test.step('And I submit the search', async () => {
      await orgAddPage.clickOrgAddSearch();
    });

    await test.step('Then "no results found" is displayed on the screen', async () => {
      await expect(orgAddPage.errorMessage('no results found')).toBeVisible();
    });

    await test.step('And option to add a new organisation is selected by default', async () => {
      await expect(orgAddPage.addOrganisationOptionIsSelected()).toBeChecked();
    });
  });

  test('Search for valid characters in all search fields', async () => {
    await test.step('Given I enter "Test Organisation" in the "name" field', async () => {
      await orgAddPage.inputTextInField(
        'name',
        'Test Organisation'
      );
    });
    await test.step('And I enter "BD1 1AW" in the "postcode" field', async () => {
      await orgAddPage.inputTextInField(
        'postcode',
        'BD1 1AW'
      );
    });
    await test.step('And I enter "TAD" in the "managing organisation" field', async () => {
      await orgAddPage.inputTextInField(
        'managing-organisation',
        'TAD'
      );
    });
    await test.step('And I submit the search', async () => {
      await orgAddPage.clickOrgAddSearch();
    });
    await test.step('Then no field level validation errors are displayed on the page', async () => {
      await expect(orgAddPage.getFieldError('name')).toBeHidden();
      await expect(orgAddPage.getFieldError('postcode')).toBeHidden();
      await expect(orgAddPage.getFieldError('managing-organisation')).toBeHidden();
    });
    await test.step('But a summary "title" error message: "There is a problem" is displayed on the page', async () => {
      await expect(orgAddPage.getOrgErrorSummary('title')).toContainText('There is a problem');
    });
    await test.step('And a summary "message" error message: "Search by either" is displayed on the page', async () => {
      await expect(orgAddPage.getOrgErrorSummary('message')).toContainText('Search by either');
    });
    await test.step('And a summary "name" error link text: "name" is displayed on the page', async () => {
      await expect(orgAddPage.getOrgErrorSummaryLink('name')).toContainText('name');
    });
    await test.step('And a summary "postcode" error link text: "postcode" is displayed on the page', async () => {
      await expect(orgAddPage.getOrgErrorSummaryLink('postcode')).toContainText('postcode');
    });
    await test.step('And a summary "organisation" error link text: "managing organisation" is displayed on the page', async () => {
      await expect(orgAddPage.getOrgErrorSummaryLink('organisation')).toContainText('managing organisation');
    });
    await test.step('When I click the summary "name" error link text', async () => {
      await orgAddPage.clickOrgInputField('name');
    });
    await test.step('Then the organisation "name" field is focused', async () => {
      await expect(orgAddPage.getOrgInputField('name')).toBeFocused();
    });
    await test.step('When I click the summary "postcode" error link text', async () => {
      await orgAddPage.clickOrgInputField('postcode');
    });
    await test.step('Then the organisation "postcode" field is focused', async () => {
      await expect(orgAddPage.getOrgInputField('postcode')).toBeFocused();
    });
    await test.step('When I click the summary "managing-organisation" error link text', async () => {
      await orgAddPage.clickOrgInputField('managing-organisation');
    });
    await test.step('Then the organisation "managing organisation" field is focused', async () => {
      await expect(orgAddPage.getOrgInputField('managing-organisation')).toBeFocused();
    });
  });
});
