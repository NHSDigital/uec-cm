import { Locator, Page } from "@playwright/test";

export default class CheckAnswersPage {
    constructor(readonly page: Page) {
        this.page = page;
    }
    getGoBackLink(): Locator {
        return this.page.getByRole('button', { name: 'Go back' });
    }

    getCheckAnswersHeading(): Locator {
        return this.page.getByRole('heading', { name: 'Check your answers' });
    }

    getBedsideNumberField(): Locator {
        return this.page.locator("//*[contains(@class, 'nhsuk-table__value')]").first();
    }

    getBedsideField(): Locator {
        return this.page.locator("//*[contains(@class, 'nhsuk-table__value')]").nth(0);
    }

    getBedsAvailableField(): Locator {
        return this.page.locator("//*[contains(@class, 'nhsuk-table__value')]").nth(1);
    }

    getRequiredStaffField(): Locator {
        return this.page.locator("//*[contains(@class, 'nhsuk-table__value')]").nth(2);
    }

    getPlannedAdmissionField(): Locator {
        return this.page.locator("//*[contains(@class, 'nhsuk-table__value')]").nth(3);
    }

    getEcmoField(): Locator {
        return this.page.locator("//*[contains(@class, 'nhsuk-table__value')]").nth(4);
    }

    getInvasivelyVentilatedField(): Locator {
        return this.page.locator("//*[contains(@class, 'nhsuk-table__value')]").nth(5);
    }
    getNonInvasivelyVentilatedField(): Locator {
        return this.page.locator("//*[contains(@class, 'nhsuk-table__value')]").nth(6);
    }
    getBedsOccupiedUnderOneField(): Locator {
        return this.page.locator("//*[contains(@class, 'nhsuk-table__value')]").nth(7);
    }
    getBedsOccupiedTwelveField(): Locator {
        return this.page.locator("//*[contains(@class, 'nhsuk-table__value')]").nth(8);
    }
    getBedsOccupiedEighteenField(): Locator {
        return this.page.locator("//*[contains(@class, 'nhsuk-table__value')]").nth(9);
    }

    getDischargeField(): Locator {
        return this.page.locator("//*[contains(@class, 'nhsuk-table__value')]").nth(10);
    }

    getElectiveField(): Locator {
        return this.page.locator("//*[contains(@class, 'nhsuk-table__value')]").nth(11);
    }
    getRefusedUnplannedField(): Locator {
        return this.page.locator("//*[contains(@class, 'nhsuk-table__value')]").nth(12);
    }
    getPatientsNotDiagnosedField(): Locator {
        return this.page.locator("//*[contains(@class, 'nhsuk-table__value')]").nth(13);
    }
    getPatientsDiagnosedField(): Locator {
        return this.page.locator("//*[contains(@class, 'nhsuk-table__value')]").nth(14);
    }
    getSaveConfirmButton(): Locator {
        return this.page.getByRole('button', { name: "Save and confirm" });
    }

    getExitButton(): Locator {
        return this.page.getByRole('button', { name: "Exit without saving" });
    }

    getEditButton(): Locator {
        return this.page.locator("(//a[contains(text(),'Edit')])[1]");
    }
}
