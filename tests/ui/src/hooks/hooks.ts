import  { BeforeAll, Before, AfterAll, After, Status, AfterStep} from "@cucumber/cucumber";
import {chromium, Browser, Page, BrowserContext} from "@playwright/test"
import { pageFixture } from "./pageFixture";

let browser: Browser;
let context: BrowserContext

BeforeAll(async  function() {
    browser = await chromium.launch({ headless: false});

});

Before(async  function() {
    context = await browser.newContext();
    const page = await context.newPage();
    pageFixture.page = page;
});

AfterStep(async function ({pickle, result}) {
  //screenshot for end of every step
  const img = await pageFixture.page.screenshot({path: `reports/screenshots/${pickle.name}.png`, type: "png"})
  await this.attach(img, "image/png")
})

After(async function ({pickle, result}) {
    console.log(result?.status);
    //screenshot for end of every scenario
    const img = await pageFixture.page.screenshot({path: `reports/screenshots/${pickle.name}.png`, type: "png"})
    if(result?.status == Status.FAILED) {
    const img = await pageFixture.page.screenshot({path: `reports/screenshots/${pickle.name}.png`, type: "png"})
    await this.attach(img, "image/png")}

    await pageFixture.page.close();
    await context.close();
})

AfterAll(async function () {
    await browser.close();
})
