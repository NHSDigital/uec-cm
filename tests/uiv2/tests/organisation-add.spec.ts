import { test } from '@playwright/test';
import OrgAddPage from '../pages/organisation-add-page';


let orgAddPage: OrgAddPage;

test.describe('As a user I want to be able to manage organisation data', () => {

  test.beforeEach(async ({page}) => {
    await test.step('Navigate to landing page', async () => {
      await page.goto('/');
    });
    await test.step('Add an organisation', async () => {
      orgAddPage = new OrgAddPage(page);
      await orgAddPage.clickAddOrg()
    });
  });


  test('The search instructions are displayed on the page', async () => {
    await orgAddPage.searchInstructionsToBeVisible;
    await orgAddPage.exactTextToExist('Search by either name, postcode or managing organisation.');
    });

  test('Search for an organisation that does not exist allows you to add a new organisation', async () => {
    await test.step('When I input an organisation that does not exist', async () => {
      await orgAddPage.inputTextInField('name','0');
      await orgAddPage.clickSearchBtn();
    });
    await test.step('Then the message no results found is displayed on the screen', async () => {
      await orgAddPage.exactTextToExist('No results found');
    });
    await test.step('Then I am given the option to add a new organisation', async () => {
      await orgAddPage.addOrgOptionIsSelected();
    });
  });


  test('Search for an existing organisation by name returns a list of matching results', {tag: '@Test'} , async () => {
    await test.step('When I input an organisation that does exist', async () => {
      await orgAddPage.inputTextInField('name','london');
      await orgAddPage.clickSearchBtn();
    });
    await test.step('Then I am given a list of matching organisations and locations', async () => {
      await orgAddPage.orgSearchResultsToBeVisible();
      await orgAddPage.partialTextToExist('The following organisations or locations match your search.');

    });
  });

  test('Search for an existing organisation by postcode returns a list of matching results', {tag: '@Test'} , async () => {
    await test.step('When I input an postcode for an organisation that does exist', async () => {
      await orgAddPage.inputTextInField('postcode','BN1 1AW');
      await orgAddPage.clickSearchBtn();
    });
    await test.step('Then I am given a list of matching organisations and locations', async () => {
      await orgAddPage.orgSearchResultsToBeVisible();
      await orgAddPage.partialTextToExist('The following organisations or locations match your search.');

    });
  });

});
