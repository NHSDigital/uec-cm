import { Locator, Page } from "@playwright/test";
export default class BasePage {
  constructor(readonly page: Page) {
    this.page = page;
  }

  static readonly userId_txt = "User ID";
  static readonly password_txt = "password";
  static readonly continue_btn = "Continue";

  //methods
  async login() {
    await this.page.getByLabel(BasePage.userId_txt).fill("username");
    await this.page.getByLabel(BasePage.password_txt).fill("password");
    await this.page.getByRole("button", { name: "Continue" }).click();
  }
}
