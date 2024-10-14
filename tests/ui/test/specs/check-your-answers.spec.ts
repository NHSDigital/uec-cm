import { test, expect } from "@playwright/test";
import { allure } from "allure-playwright";
import ViewLocationsPage from "../../src/pages/view-locations-page";
import BasePage from "../../src/pages/base-page";
import ViewQuestionnairePage from "../../src/pages/view-edit-questionnaire-page";
import CheckAnswersPage from "../../src/pages/questionnaire-check-your-answers-page";

let viewLocPage: ViewLocationsPage;
let basePage: BasePage;
let viewQuestionnaire: ViewQuestionnairePage;
let checkYourAnswerPage: CheckAnswersPage;
const pageTitle = "UEC Capacity Management";
const bedsideStaff = '18';
const bedsAvailable = '11';

test.describe("As a user I want to be able to view the locations", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await allure.parentSuite(testInfo.project.name);
    await allure.suite("Tests for check your answers journeys");
    await allure.subSuite("Tests for check-your answers landing page");
    viewLocPage = new ViewLocationsPage(page);
    basePage = new BasePage(page);
    viewQuestionnaire = new ViewQuestionnairePage(page);
    checkYourAnswerPage = new CheckAnswersPage(page);
    await test.step("Navigate to landing page", async () => {
      await page.goto("/prototype");
    });
    await test.step("Enter user name and password", async () => {
      await basePage.login();
    });
    await test.step("Verify Title of the page", async () => {
      await expect(page).toHaveTitle(pageTitle);
    });
    await test.step("Navigate to questionnaire page", async () => {
      await viewQuestionnaire.getQuestionnaireLink().click();
    });
  });

  test('The user confirms data entered is on the questionnaire page', { tag: '@prototype' }, async () => {
    await test.step("Enter data into the field", async () => {
      await viewQuestionnaire.getBedsideStaff().fill(bedsideStaff);
    });
    await test.step('The user can save changes', async () => {
      await viewQuestionnaire.getContinueButton().click();
    });
    await test.step('The check answers heading is displayed', async () => {
      await expect(checkYourAnswerPage.getCheckAnswersHeading()).toBeVisible();
    });
    await test.step('The saved changes are displayed', async () => {
      await expect(checkYourAnswerPage.getBedsideNumberField()).toHaveText(bedsideStaff);
    });
    await test.step('The changes are saved', async () => {
      await checkYourAnswerPage.getSaveConfirmButton().click();
      await expect(viewLocPage.getCapacityHeading()).toBeVisible();
    });
    await test.step('You have successfully saved and confirmed your updates message is displayed', async () => {
      await expect(viewLocPage.getSuccessfulChanges()).toBeVisible();
    });
  });

  test('The user can cancel changes', { tag: '@prototype' }, async () => {
    await viewQuestionnaire.getBedsideStaff().fill(bedsideStaff);
    await checkYourAnswerPage.getExitButton().click();
    await test.step('The Capacity management heading is displayed', async () => {
      await expect(viewLocPage.getCapacityHeading()).toBeVisible();
    });
  })

  test('The user can use the edit button on check your answers page to edit ', { tag: '@prototype' }, async () => {
    await test.step('The user fills in questionnaire', async () => {
      await viewQuestionnaire.getBedsAvailable().fill(bedsAvailable);
      await viewQuestionnaire.getContinueButton().click();
    });
    await test.step('The user clicks the edit button', async () => {
      await checkYourAnswerPage.getEditButton().click();
    });
    await test.step('The correct field is highlighted', async () => {
      await expect(viewQuestionnaire.getBedsAvailable()).toBeFocused();
      await expect(viewQuestionnaire.getQuestHeading()).toBeVisible();
    });
    await test.step('The user edits the field', async () => {
      await viewQuestionnaire.getBedsideStaff().fill('12');
      await viewQuestionnaire.getContinueButton().click();
    });
    await test.step('The check your answers page matches the edited field', async () => {
      await expect(checkYourAnswerPage.getBedsAvailableField()).toHaveText(bedsAvailable);
    });
    await test.step('The continues button takes user to correct page after editing', async () => {
      await expect(checkYourAnswerPage.getCheckAnswersHeading()).toBeVisible();
    });
  });

  test('All questions are in check answers ', { tag: '@prototype' }, async () => {
    await test.step('The user fills in questionnaire', async () => {
      await viewQuestionnaire.getQuestHeading
      await viewQuestionnaire.getContinueButton().click();
    });
    await test.step('Check all questions are available on check answers page ', async () => {
      await expect(checkYourAnswerPage.getBedsideField()).toBeVisible();
      await expect(checkYourAnswerPage.getRequiredStaffField()).toBeVisible();
      await expect(checkYourAnswerPage.getBedsAvailableField()).toBeVisible();
      await expect(checkYourAnswerPage.getPlannedAdmissionField()).toBeVisible();
      await expect(checkYourAnswerPage.getEcmoField()).toBeVisible();
      await expect(checkYourAnswerPage.getInvasivelyVentilatedField()).toBeVisible();
      await expect(checkYourAnswerPage.getNonInvasivelyVentilatedField()).toBeVisible();
      await expect(checkYourAnswerPage.getBedsOccupiedUnderOneField()).toBeVisible();
      await expect(checkYourAnswerPage.getBedsOccupiedTwelveField()).toBeVisible();
      await expect(checkYourAnswerPage.getBedsOccupiedEighteenField()).toBeVisible();
      await expect(checkYourAnswerPage.getDischargeField()).toBeVisible();
      await expect(checkYourAnswerPage.getElectiveField()).toBeVisible();
      await expect(checkYourAnswerPage.getRefusedUnplannedField()).toBeVisible();
      await expect(checkYourAnswerPage.getPatientsNotDiagnosedField()).toBeVisible();
      await expect(checkYourAnswerPage.getPatientsDiagnosedField()).toBeVisible();
    });
  });
});
