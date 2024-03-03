
import { expect, Locator, Page } from "@playwright/test";
// import { pageFixture } from "../../src/hooks/pageFixture";

export default class OrgAddPage {
    readonly page: Page;
    readonly addOrgLink: Locator;
    readonly searchInstructions: Locator;
    readonly orgAddSearchBtn: Locator;
    readonly orgAddNewOption: Locator;
    readonly fieldError = (field: string)=>`#${field}-error-message` ;
    readonly orgErrorSummaryLink = (type: string) => `error-summary-${type}-link`
    readonly orgErrorSummary = (type: string) => `error-summary-${type}`
    readonly inputField = (field: string) => `${field}-input`


  constructor(page: Page) {
    this.page = page;
    this.addOrgLink  = page.getByTestId('add-card-link')
    this.searchInstructions = page.getByTestId('search-by');
    this.orgAddSearchBtn = page.getByTestId('search-button');
    this.orgAddNewOption = page.getByTestId('yes-radio');
  }



  // Getters

  async getOrgErrorSummaryLink(type: string): Promise<Locator> {
    return this.page.getByTestId(this.orgErrorSummaryLink(type));
  }

  async getOrgErrorSummary(type: string): Promise<Locator> {
    return this.page.getByTestId(this.orgErrorSummary(type));
  }

  async getOrgInputField(type: string){
    return this.page.getByTestId(this.inputField(type));
  }

  async getFieldErrorMessage(field: string): Promise<Locator> {
    return this.page.getByTestId(this.fieldError(field));
  }

  async getFieldError(field: string): Promise<Locator> {
    return this.page.locator(this.fieldError(field));
  }

  async errorMessage(text: string): Promise<Locator> {
    return this.page.getByText(text);
  }


  // Methods
  async clickAddOrg() {
    await this.addOrgLink.click();
  }

  async clickSearchBtn() {
    await this.orgAddSearchBtn.click();
  }

  async clickOrgInputField(type: string) {
    (await this.getOrgInputField(type)).click();
  }

  async inputTextInField(field: string, text: string) {
    (await this.getOrgInputField(field)).fill(text);
  }

  //Assertions

  async addOrgOptionIsSelected(){
    await expect (this.orgAddNewOption).toBeChecked;
  }

  async searchInstructionsToContainText(text){
    await expect ( this.page.getByText(text, { exact: true })).toContainText(text);
    }

  async searchInstructionsToBeVisible(){
    await expect (this.searchInstructions).toBeVisible();
    }

  async textToExist(text){
    await expect (this.page.getByText(text, { exact: true })).toContainText(text);
    }

  async fieldErrorIsVisible(field){
    await expect (await this.getFieldError(field)).toBeVisible();
    }

  async fieldErrorMessageIsVisible(text){
      await expect (await this.errorMessage(text)).toBeVisible();
      }


}
