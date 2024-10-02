import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import ViewQuestionnaire from '../../src/pages/view-questionnaire.ts';
import CheckAnswersPage from '../../src/pages/questionnaire-check-your-answers.ts'
import BasePage from "../../src/pages/base-page";
let viewQuest: ViewQuestionnaire;
let basePage: BasePage;
let pageTitle: string = "UEC Capacity Management";
let checkAnswersPage: CheckAnswersPage;
test.describe('Questionnaire Tests', () => {

  test.beforeEach(async ({ page }, testInfo) => {
    allure.parentSuite(testInfo.project.name);
    allure.suite("Questionnaire Tests");
    allure.subSuite("Landing Page Tests");
    viewQuest = new ViewQuestionnaire(page);
    basePage = new BasePage(page);
    checkAnswersPage = new CheckAnswersPage(page);
    await page.goto('/prototype');
    await basePage.login();
    await test.step("Verify Title of the page", async () => {
      await expect(page).toHaveTitle(pageTitle);
      await test.step("Navigate to questionnaire page", async () => {
        await expect.soft(viewQuest.getQuestionnaireLink).toBeVisible();
        await viewQuest.getQuestionnaireLink.click();
      });
    });
  });

  test('Questionnaire link navigates to the correct page', { tag: '@prototype' }, async () => {
    await test.step('The questionnaire is displayed', async () => {
      await expect.soft(viewQuest.getQuestHeading).toBeVisible();
      await test.step('The questionnaire heading is displayed', async () => {
        await expect(viewQuest.getQuestHeading).toHaveText('Update questionnaire');
        await expect.soft(viewQuest.getQuestHeading).toBeVisible();
      });
    });
  });

  test('Make changes and navigate through the form', { tag: '@prototype' }, async ({ page }) => {
    await test.step('The User can fill in the field', async () => {
      await expect(viewQuest.getBedsideStaff).toBeVisible();
      await viewQuest.getBedsideStaff.fill('18');
    });
    await test.step('The user can save changes', async () => {
      await expect(viewQuest.getContinueButton).toBeVisible();
      await viewQuest.getContinueButton.click();
      await page.getByRole('button', { name: 'Save and confirm' }).click();
    });
  });

  test('Make changes to all the fields in the questionnaire', { tag: '@prototype' }, async ({ page }) => {
    await test.step('All the questionnaire fields can be filled in', async () => {
      await expect(viewQuest.getBedsideStaff).toBeVisible();
      await viewQuest.getBedsideStaff.fill('18');
      await viewQuest.getMeetingRequired.fill('1');
      await viewQuest.getBedsAvailable.fill('3');
      await viewQuest.getTotalPatients.fill('4');
      await viewQuest.getPatientsSupported.fill('12');
      await viewQuest.getInvasivelyVentilated.fill('6');
      await viewQuest.getNonInvasivelyVentilated.fill('5');
      await viewQuest.getBedsOccupiedUnderOne.fill('2');
      await viewQuest.getBedsOccupiedTwelve.fill('3');
      await viewQuest.getBedsOccupiedEighteen.fill('4');
      await viewQuest.getDischarge.fill('7');
      await viewQuest.getElective.fill('8');
      await viewQuest.getRefusedUnplanned.fill('1');
      await viewQuest.getPatientsNotDiagnosed.fill('0');
      await viewQuest.getPatientsDiagnosed.fill('9');
      await test.step('The continue button is clicked', async () => {
        await expect(viewQuest.getContinueButton).toBeVisible();
        await viewQuest.getContinueButton.click();
      });
    });
  });

  test('As a user I want to ensure i get an error message if I type incorrect data', { tag: '@prototype' }, async ({ page }) => {
    await test.step('The user enters invalid data to the field', async () => {
      await expect(viewQuest.getBedsideStaff).toBeVisible();
      await viewQuest.getBedsideStaff.fill(';');
      await expect(viewQuest.getContinueButton).toBeVisible();
      await viewQuest.getContinueButton.click();
    });
    await test.step('The error message is displayed ', async () => {
      await expect(viewQuest.getErrorHeading).toBeVisible();
      await expect(viewQuest.getErrorMessage).toHaveText('Enter a valid numerical number');
      await expect(viewQuest.getErrorMessage).toBeVisible();
    });
  });

  test('Cancel changes', { tag: '@prototype' }, async ({ page }) => {
    await test.step('The user enters data into a field', async () => {
      await expect(viewQuest.getBedsideStaff).toBeVisible();
      await viewQuest.getBedsideStaff.fill('19');
    });
    await test.step('The cancel button is clicked and returns user to Location page', async () => {
      await expect(viewQuest.getCancelButton).toBeVisible();
      await viewQuest.getCancelButton.click();
      await expect(viewQuest.getMyLocationsLabel).toBeVisible();
    });
  });

  test('Heading is displayed on check answers page', { tag: '@prototype' }, async ({ page }) => {
    await test.step('The check answers heading is displayed', async () => {
      await viewQuest.getContinueButton.click();
      await expect(checkAnswersPage.getCheckAnswersHeading).toBeVisible();
    });
  });

  test('Go back link works on summary page', { tag: '@prototype' }, async ({ page }) => {
    await test.step('The go back link works', async () => {
      await viewQuest.getContinueButton.click();
      await checkAnswersPage.getGoBackLink.click();
    });
  });
});
