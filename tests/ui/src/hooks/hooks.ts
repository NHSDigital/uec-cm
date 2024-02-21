import {
  BeforeAll,
  Before,
  AfterAll,
  After,
  Status,
  AfterStep,
} from "@cucumber/cucumber";
import { chromium, Browser, Page, BrowserContext } from "@playwright/test";
import { pageFixture } from "./pageFixture";
import { getEnv } from "../config/env";
import Accessibility from "../utilities/acccessibility";

let browser: Browser;
let context: BrowserContext;
let accessibility: Accessibility;

BeforeAll(async function () {
  getEnv();
  if (process.env.WORKSPACE != "default") {
    process.env.WORKSPACE = "-" + process.env.WORKSPACE;
  } else {
    process.env.WORKSPACE = "";
  }

  browser = await chromium.launch({ headless: false });
});

Before(async function () {
  context = await browser.newContext();
  const page = await context.newPage();
  pageFixture.page = page;
  accessibility = new Accessibility(pageFixture.page);
});

AfterStep(async function ({ pickle, result }) {

  //screenshot for end of every step
  const img = await pageFixture.page.screenshot({
    path: `reports/screenshots/${pickle.name}.png`,
    type: "png",
  });
  await this.attach(img, "image/png");
});

After(async function ({ pickle, result }) {
  const testId = pickle.name;
  console.log(result?.status);
  await accessibility.runAxeCheck(testId);
  //screenshot for end of every scenario
  const img = await pageFixture.page.screenshot({
    path: `reports/screenshots/${pickle.name}.png`,
    type: "png",
  });
  //screenshot for every failure
  if (result?.status == Status.FAILED) {
    const img = await pageFixture.page.screenshot({
      path: `reports/screenshots/${pickle.name}.png`,
      type: "png",
    });
    await this.attach(img, "image/png");
  }
  //close page and context
  await pageFixture.page.close();
  await context.close();
});

AfterAll(async function () {
  await browser.close();
});
