import { test, expect } from '@playwright/test';
import OrgPage from '../../src/pages/organisations-page';
import OrgAddPage from '../../src/pages/organisation-add-page';
import OrgSearchPage from '../../src/pages/organisation-search-page';

let orgPage: OrgPage;
let orgAddPage: OrgAddPage;
let orgSearchPage: OrgSearchPage;
const orgErrorMsg = 'Please select an Organisation type';
const searchLengthErrorMsg = 'Enter a minimum of 3 characters';

test.describe('As a user I want to be able to add organisation data from no results found', {
  tag: '@orgAdd',
}, async () => {
  test.beforeEach(async ({ page }) => {
    await test.step('Navigate to organisation add page', async () => {
      await page.goto('/');
      orgPage = new OrgPage(page);
      orgSearchPage = new OrgSearchPage(page);
      orgAddPage = new OrgAddPage(page);
      await orgPage.clickGoToSearch();
      await orgSearchPage.inputSearchText('000');
      await orgSearchPage.clickSearch();
      await orgSearchPage.clickNextBtn();
    });
  });

  test('The organisation add page is presented correctly', async () => {
    await test.step('The organisation add label is visible', async () => {
      await expect(orgAddPage.getOrgAddPageLabel()).toBeVisible;
    });
    await test.step('And the add instructions text is visible', async () => {
      await expect.soft(orgAddPage.getOrgAddInstructions()).toBeVisible;
      await expect.soft(orgAddPage.getOrgAddPageText('Please add the following mandatory information')).toBeVisible;
    });
    await test.step('And a org name input box is visible', async () => {
      await expect(orgAddPage.getAddOrgInputField('name')).toBeVisible;
    });
    await test.step('And a org name input box has focus when the label is clicked', async () => {
      await expect.soft(orgAddPage.getOrgAddLabel('name')).toContainText('Organisation name');
      await orgAddPage.clickLabel('name');
      await expect.soft(orgAddPage.getAddOrgInputField('name')).toBeFocused;
    });
    await test.step('And a org type dropdown box is visible', async () => {
      await expect(orgAddPage.getAddOrgInputField('type')).toBeVisible;
    });
    await test.step('And a org type dropdown box has focus when the label is clicked', async () => {
      await expect.soft(orgAddPage.getOrgAddLabel('type')).toContainText('Organisation type');
      await orgAddPage.clickLabel('type');
      await expect.soft(orgAddPage.getAddOrgInputField('type')).toBeFocused;
    });
  });

  // TODO: test will need expanding once the functionality has been created
  test('I can add successfully add an organisation', async () => {
    await test.step('When I add an organisation name of NHS Trust', async () => {
      await orgAddPage.inputTextInField('name','NHS Trust');
    });
    await test.step('And select an organisation type of Mock NHS Trust', async () => {
      await orgAddPage.selectFromDropdown('type','Mock NHS Trust')
      await orgAddPage.clickNext();
    });
  });

  test('Adding org name of less than 3 characters will not be permitted', async () => {
    await test.step('When I add an organisation name of 2 characters ', async () => {
      await orgAddPage.inputTextInField('name','NH');
      await orgAddPage.selectFromDropdown('type','Mock Operational Delivery Network')
      await orgAddPage.clickNext();
    });
    await test.step(`Then an error message stating that ${searchLengthErrorMsg} is displayed on the screen`, async () => {
      await expect(orgAddPage.getErrorMessage(`${searchLengthErrorMsg}`)).toBeVisible();
      await expect(orgAddPage.getFieldError('name')).toContainText(`${searchLengthErrorMsg}`);
    });
  });

  test('Adding org name of less than 3 characters and not selecting an organisation type will not be permitted', async () => {
    await test.step('When I add an organisation name of 2 characters ', async () => {
      await orgAddPage.inputTextInField('name','NH');
    });
    await test.step('When I do not select an organisation type', async () => {
      await orgAddPage.selectFromDropdown('type','')
      await orgAddPage.clickNext();
    });
    await test.step(`Then an error message stating that ${searchLengthErrorMsg} is displayed on the screen`, async () => {
      await expect(orgAddPage.getErrorMessage(`${searchLengthErrorMsg}`)).toBeVisible();
      await expect(orgAddPage.getFieldError('name')).toContainText(`${searchLengthErrorMsg}`);
    });
    await test.step(`Then an error message stating that ${orgErrorMsg} is displayed on the screen`, async () => {
      await expect(orgAddPage.getErrorMessage(`${orgErrorMsg}`)).toBeVisible();
      await expect(orgAddPage.getFieldError('type')).toContainText(`${orgErrorMsg}`);
    });
  });

  test('Not selecting an organisation type will not be permitted', async () => {
    await test.step('When I do not select an organisation type', async () => {
      await orgAddPage.inputTextInField('name','Royal');
      await orgAddPage.selectFromDropdown('type','')
      await orgAddPage.clickNext();
    });
    await test.step(`Then an error message stating that ${orgErrorMsg} is displayed on the screen`, async () => {
      await expect(orgAddPage.getErrorMessage(`${orgErrorMsg}`)).toBeVisible();
      await expect(orgAddPage.getFieldError('type')).toContainText(`${orgErrorMsg}`);
    });
  });
});


  test.describe('As a user I want to be able to add organisation data from the search results screen', {
    tag: '@orgAdd',
  }, async () => {
    test.beforeEach(async ({ page }) => {
      await test.step('Navigate to organisation add page', async () => {
        await page.goto('/');
        orgPage = new OrgPage(page);
        orgSearchPage = new OrgSearchPage(page);
        orgAddPage = new OrgAddPage(page);
        await orgPage.clickGoToSearch();
        await orgSearchPage.inputSearchText('Royal');
        await orgSearchPage.clickSearch();
        await orgSearchPage.clickNewItemLink();
      });
    });
    // TODO: test will need expanding once the functionality has been created
    test('I can add successfully add an organisation', async () => {
      await test.step('When I add an organisation name of NHS Trust', async () => {
        await orgAddPage.inputTextInField('name','NHS Trust');
      });
      await test.step('And select an organisation type of Mock NHS Trust', async () => {
        await orgAddPage.selectFromDropdown('type','Mock NHS Trust')
        await orgAddPage.clickNext();
      });
    });
  });
