import { test } from '@playwright/test';
import OrgAddPage from '../pages/organisation-add-page';
import { getCloudFrontUrl } from "../utilities/cloudFront";

let orgAddPage: OrgAddPage;

test.describe('As a user I want to be able to manage organisation data', () => {

test.beforeEach(async ({page}) => {
  await test.step('Navigate to landing page', async () => {

    const workspace = process.env.WORKSPACE as string;
    const env = process.env.ENV as string;
    const region = process.env.REGION as string;
    const distribution = getCloudFrontUrl(region,env, workspace);
    const url = JSON.parse(distribution);

    await page.goto("https://"+url.DomainName);
  });
  await test.step('Add an organisation', async () => {
    orgAddPage = new OrgAddPage(page);
    await orgAddPage.clickAddOrg()
});  });





  test('The search instructions are displayed on the page', async () => {
    await orgAddPage.searchInstructionsToBeVisible;
    await orgAddPage.exactTextToExist('Search by either name, postcode or managing organisation.');
    });

  test('Search for an organisation that does not exist allows you to add a new organisation', async () => {
    await test.step('When I input an organisation that does not exist', async () => {
      await orgAddPage.inputTextInField('name','0');
      await orgAddPage.clickSearchBtn();
    });
    await test.step('Then I am given the option to add a new organisation', async () => {
      await orgAddPage.exactTextToExist('No results found');
      await orgAddPage.addOrgOptionIsSelected();
    });
  });

  test('Search etet for an organisation that does not exist allows you to add a new organisation', async () => {

      await orgAddPage.inputTextInField('name','0');
      await orgAddPage.clickSearchBtn();
      await orgAddPage.exactTextToExist('No results found');
      await orgAddPage.addOrgOptionIsSelected();

  });



  test('Search for an existing organisation by name returns a list of matching results' , async () => {
    await test.step('When I input an organisation that does exist', async () => {
      await orgAddPage.inputTextInField('name','london');
      await orgAddPage.clickSearchBtn();
    });
    await test.step('Then I am given a list of matching organisations and locations', async () => {
      await orgAddPage.orgSearchResultsToBeVisible();
      await orgAddPage.partialTextToExist('The following organisations or locations match your search.');

    });
  });

  test('Search for an organisation name with an invalid length', async () => {
    await test.step('When I input an organisation that is 101 characters long', async () => {
      await orgAddPage.inputTextInField('name','This is a name of more than 100 characters. This name is 101 characters. This name is 101 characters.');
      await orgAddPage.clickSearchBtn();
    });
    await test.step('Then the invalid name message is displayed on the page', async () => {
      await orgAddPage.fieldErrorIsVisible('name');
      await orgAddPage.fieldErrorMessageIsVisible('Enter a valid name')
    });
  });
});
