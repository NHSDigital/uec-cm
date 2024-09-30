import { Locator, Page } from "@playwright/test";
export default class ViewQuestionnaire {
    constructor(readonly page: Page) {
        this.page = page;
    }
    // login page
    static readonly userId_txt = 'User ID';
    static readonly password_txt = 'Password';
    static readonly continue_btn = 'Continue';
    // getters
    get getMyLocationsLabel(): Locator {
        return this.page.getByRole('heading', { name: 'My locations' });
    }

    get getQuestHeading(): Locator {
        return this.page.getByRole('heading', { name: 'Update questionnaire' });
    }

    get getQuestionnaireLink(): Locator {
        return this.page.getByRole('link', { name: 'Bethlem Royal Hospital -' });
    }

    get getGoBackLink(): Locator {
        return this.page.getByRole('button', { name: 'Go back' });
    }

    get getErrorHeading(): Locator {
        return this.page.getByRole('link', { name: 'Bed side staff is not valid' });
    }

    get getErrorMessage(): Locator {
        return this.page.getByText('Enter a valid numerical number');
    }

    get getBedsideStaff(): Locator {
        return this.page.locator('//input[@id="bedsideStaff"]');
    }

    get getMeetingRequired(): Locator {
        return this.page.locator('//input[@id="requiredStaffRatioMeeting"]');
    }

    get getBedsAvailable(): Locator {
        return this.page.locator("//input[@id='bedsUnplannedAdmissions']");
    }

    get getTotalPatients(): Locator {
        return this.page.locator("//input[@id='totalPatients']");
    }

    get getPatientsSupported(): Locator {
        return this.page.locator("//input[@id='ecmoPatients']");
    }

    get getInvasivelyVentilated(): Locator {
        return this.page.locator("//input[@id='invasivelyVentilatedPatients']");
    }

    get getNonInvasivelyVentilated(): Locator {
        return this.page.locator("//input[@id='nonInvasivelyVentilatedPatients']");
    }

    get getBedsOccupiedUnderOne(): Locator {
        return this.page.locator("//input[@id='bedsOccupiedUnder1Year']");
    }

    get getBedsOccupiedTwelve(): Locator {
        return this.page.locator("//input[@id='bedsOccupiedBy12To17']");
    }

    get getBedsOccupiedEighteen(): Locator {
        return this.page.locator("//input[@id='bedsOccupiedBy18Plus']");
    }

    get getDischarge(): Locator {
        return this.page.locator("//input[@id='dischargesOrDeathExpectedNumberIn12Hours']");
    }

    get getElective(): Locator {
        return this.page.locator("//input[@id='yesterdaySurgeryCancellations']");
    }

    get getRefusedUnplanned(): Locator {
        return this.page.locator("//input[@id='yesterdayRefusedUnplannedAdmissions']");
    }

    get getPatientsNotDiagnosed(): Locator {
        return this.page.locator("//input[@id='notDischargedPatientsForNonClenicalReasons']");
    }

    get getPatientsDiagnosed(): Locator {
        return this.page.locator("//input[@id='patientsOfPimsTs']");
    }


    get getSummaryHeading(): Locator {
        return this.page.getByRole('heading', { name: 'Check your answers' })
    }

    get getContinueButton(): Locator {
        return this.page.getByRole('button', { name: 'Continue' });
    }

    get getCancelButton(): Locator {
        return this.page.getByRole('button', { name: 'Exit without saving' });
    }


    get getSaveButton(): Locator {
        return this.page.getByRole('button', { name: 'Save and confirm' });
    }

    get getSuccessMessage(): Locator {
        return this.page.getByText('You have successfully saved');
    }

    // methods
    async login() {
        await this.page.getByLabel(ViewQuestionnaire.userId_txt).fill("username");
        await this.page.getByLabel(ViewQuestionnaire.password_txt).fill("password");
        await this.page.getByRole('button', { name: 'Continue' }).click();
    }
}
