import { Locator, Page } from "@playwright/test";

export default class CheckAnswersPage {
    constructor(readonly page: Page) {
        this.page = page;
    }
    get getGoBackLink(): Locator {
        return this.page.getByRole('button', { name: 'Go back' });
    }

    get getCheckAnswersHeading(): Locator {
        return this.page.getByRole('heading', { name: 'Check your answers' });
    }

    get getBedsideNumberField(): Locator {
        return this.page.locator("//*[contains(@class, 'nhsuk-table__value')]").first();
    }

    get getBedsideField(): Locator {
        return this.page.locator("//*[contains(@class, 'nhsuk-table__value')]").nth(0);
    }

    get getBedsAvailableField(): Locator {
        return this.page.locator("//*[contains(@class, 'nhsuk-table__value')]").nth(1);
    }

    get getRequiredStaffField(): Locator {
        return this.page.locator("//*[contains(@class, 'nhsuk-table__value')]").nth(2);
    }

    get getPlannedAdmissionField(): Locator {
        return this.page.locator("//*[contains(@class, 'nhsuk-table__value')]").nth(3);
    }

    get getEcmoField(): Locator {
        return this.page.locator("//*[contains(@class, 'nhsuk-table__value')]").nth(4);
    }

    get getInvasivelyVentilatedField(): Locator {
        return this.page.locator("//*[contains(@class, 'nhsuk-table__value')]").nth(5);
    }
    get getNonInvasivelyVentilatedField(): Locator {
        return this.page.locator("//*[contains(@class, 'nhsuk-table__value')]").nth(6);
    }
    get getBedsOccupiedUnderOneField(): Locator {
        return this.page.locator("//*[contains(@class, 'nhsuk-table__value')]").nth(7);
    }
    get getBedsOccupiedTwelveField(): Locator {
        return this.page.locator("//*[contains(@class, 'nhsuk-table__value')]").nth(8);
    }
    get getBedsOccupiedEighteenField(): Locator {
        return this.page.locator("//*[contains(@class, 'nhsuk-table__value')]").nth(9);
    }

    get getDischargeField(): Locator {
        return this.page.locator("//*[contains(@class, 'nhsuk-table__value')]").nth(10);
    }

    get getElectiveField(): Locator {
        return this.page.locator("//*[contains(@class, 'nhsuk-table__value')]").nth(11);
    }
    get getRefusedUnplannedField(): Locator {
        return this.page.locator("//*[contains(@class, 'nhsuk-table__value')]").nth(12);
    }
    get getPatientsNotDiagnosedField(): Locator {
        return this.page.locator("//*[contains(@class, 'nhsuk-table__value')]").nth(13);
    }
    get getPatientsDiagnosedField(): Locator {
        return this.page.locator("//*[contains(@class, 'nhsuk-table__value')]").nth(14);
    }
    get getSaveConfirmButton(): Locator {
        return this.page.getByRole('button', { name: "Save and confirm" });
    }

    get getExitButton(): Locator {
        return this.page.getByRole('button', { name: "Exit without saving" });
    }

    get getEditButton(): Locator {
        return this.page.locator("(//a[contains(text(),'Edit')])[1]");
    }
}
