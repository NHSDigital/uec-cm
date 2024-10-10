import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import ViewQuestionnairePage from '../../src/pages/view-edit-questionnaire-page.ts';
import CheckAnswersPage from '../../src/pages/questionnaire-check-your-answers-page.ts'
import BasePage from "../../src/pages/base-page";
import ViewLocationsPage from '../../src/pages/view-locations-page.ts';

let viewQuestionnaire: ViewQuestionnairePage;
let basePage: BasePage;
let pageTitle: string = "UEC Capacity Management";
let checkAnswersPage: CheckAnswersPage;
let viewLocationPage: ViewLocationsPage;
test.describe('Questionnaire Tests', () => {

  test.beforeEach(async ({ page }, testInfo) => {
    allure.parentSuite(testInfo.project.name);
    allure.suite("Questionnaire Tests");
    allure.subSuite("Landing Page Tests");
    viewQuestionnaire = new ViewQuestionnairePage(page);
    basePage = new BasePage(page);
    checkAnswersPage = new CheckAnswersPage(page);
    viewLocationPage = new ViewLocationsPage(page);
    await page.goto('/prototype');
    await basePage.login();
    await test.step("Verify Title of the page", async () => {
      await expect(page).toHaveTitle(pageTitle);
      await test.step("Navigate to questionnaire page", async () => {
        await expect.soft(viewQuestionnaire.getQuestionnaireLink).toBeVisible();
        await viewQuestionnaire.getQuestionnaireLink.click();
      });
    });
  });

  test('Questionnaire link navigates to the correct page', { tag: '@prototype' }, async () => {
    await test.step('The questionnaire is displayed', async () => {
      await expect.soft(viewQuestionnaire.getQuestHeading).toBeVisible();
      await test.step('The questionnaire heading is displayed', async () => {
        await expect(viewQuestionnaire.getQuestHeading).toHaveText('Update questionnaire');
        await expect.soft(viewQuestionnaire.getQuestHeading).toBeVisible();
      });
    });
  });

  test('Make changes and navigate through the form', { tag: '@prototype' }, async ({ page }) => {
    await test.step('The User can fill in the field', async () => {
      await expect(viewQuestionnaire.getBedsideStaff).toBeVisible();
      await viewQuestionnaire.getBedsideStaff.fill('18');
    });
    await test.step('The user can save changes', async () => {
      await expect(viewQuestionnaire.getContinueButton).toBeVisible();
      await viewQuestionnaire.getContinueButton.click();
      await page.getByRole('button', { name: 'Save and confirm' }).click();
    });
  });

  test('Make changes to all the fields in the questionnaire', { tag: '@prototype' }, async ({ page }) => {
    await test.step('All the questionnaire fields can be filled in', async () => {
      await expect(viewQuestionnaire.getBedsideStaff).toBeVisible();
      await viewQuestionnaire.getBedsideStaff.fill('18');
      await viewQuestionnaire.getMeetingRequired.fill('1');
      await viewQuestionnaire.getBedsAvailable.fill('3');
      await viewQuestionnaire.getTotalPatients.fill('4');
      await viewQuestionnaire.getPatientsSupported.fill('12');
      await viewQuestionnaire.getInvasivelyVentilated.fill('6');
      await viewQuestionnaire.getNonInvasivelyVentilated.fill('5');
      await viewQuestionnaire.getBedsOccupiedUnderOne.fill('2');
      await viewQuestionnaire.getBedsOccupiedTwelve.fill('3');
      await viewQuestionnaire.getBedsOccupiedEighteen.fill('4');
      await viewQuestionnaire.getDischarge.fill('7');
      await viewQuestionnaire.getElective.fill('8');
      await viewQuestionnaire.getRefusedUnplanned.fill('1');
      await viewQuestionnaire.getPatientsNotDiagnosed.fill('0');
      await viewQuestionnaire.getPatientsDiagnosed.fill('9');
      await test.step('The continue button is clicked', async () => {
        await expect(viewQuestionnaire.getContinueButton).toBeVisible();
        await viewQuestionnaire.getContinueButton.click();
      });
    });
  });

  test('As a user I want to ensure i get an error message if I type incorrect data', { tag: '@prototype' }, async ({ page }) => {
    await test.step('The user enters invalid data to the field', async () => {
      await expect(viewQuestionnaire.getBedsideStaff).toBeVisible();
      await viewQuestionnaire.getBedsideStaff.fill(';');
      await expect(viewQuestionnaire.getContinueButton).toBeVisible();
      await viewQuestionnaire.getContinueButton.click();
    });
    await test.step('The error message is displayed ', async () => {
      await expect(viewQuestionnaire.getErrorHeading).toBeVisible();
      await expect(viewQuestionnaire.getErrorMessage).toHaveText('Enter a valid numerical number');
      await expect(viewQuestionnaire.getErrorMessage).toBeVisible();
    });
  });

  test('Cancel changes', { tag: '@prototype' }, async ({ page }) => {
    await test.step('The user enters data into a field', async () => {
      await expect(viewQuestionnaire.getBedsideStaff).toBeVisible();
      await viewQuestionnaire.getBedsideStaff.fill('19');
    });
    await test.step('The cancel button is clicked and returns user to Location page', async () => {
      await expect(viewQuestionnaire.getCancelButton).toBeVisible();
      await viewQuestionnaire.getCancelButton.click();
      await expect(viewLocationPage.getMyLocationsLabel()).toBeVisible();
    });
  });

  test('Heading is displayed on check answers page', { tag: '@prototype' }, async ({ page }) => {
    await test.step('The check answers heading is displayed', async () => {
      await viewQuestionnaire.getContinueButton.click();
      await expect(checkAnswersPage.getCheckAnswersHeading).toBeVisible();
    });
  });

  test('Go back link works on summary page', { tag: '@prototype' }, async ({ page }) => {
    await test.step('The go back link works', async () => {
      await viewQuestionnaire.getContinueButton.click();
      await checkAnswersPage.getGoBackLink.click();
    });
  });
});
