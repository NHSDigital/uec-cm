import  { BeforeAll, Before, AfterAll, After, Status, AfterStep} from "@cucumber/cucumber";
import { chromium, Browser, Page, BrowserContext } from "@playwright/test"
import { pageFixture } from "./pageFixture";
import { getEnv } from "../config/env";
import Accessibility from "../utilities/accessibility";

let browser: Browser;
let context: BrowserContext;
let acccessibility: Accessibility;

BeforeAll(async  function() {
  getEnv();
  if (process.env.WORKSPACE != "default")
    {process.env.WORKSPACE = "-" + process.env.WORKSPACE}
  else
    {process.env.WORKSPACE = ""};

  browser = await chromium.launch({ headless: true});
});

Before(async  function() {
    context = await browser.newContext();
    const page = await context.newPage();
    pageFixture.page = page;
    acccessibility = new Accessibility(pageFixture.page);
});

AfterStep(async function ({pickle, result}) {
  //run Axe for end of every step
  const timestamp = new Date().toISOString().replace(/:/g, '-');
  await acccessibility.runAxeCheck(pickle.name+'-'+timestamp);
  //screenshot for end of every step because we can't correctly capture a failed scenario
  const img = await pageFixture.page.screenshot({path: `reports/screenshots/${pickle.name}.png`, type: "png"});
  await this.attach(img, "image/png");
})

After(async function ({pickle, result}) {
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    //screenshot for every failure
    if(result?.status == Status.FAILED) {
    const img = await pageFixture.page.screenshot({path: `reports/screenshots/${pickle.name+'-'+timestamp}.png`, type: "png"});
    await this.attach(img, "image/png")};
    //close page and context
    await pageFixture.page.close();
    await context.close();
})

AfterAll(async function () {
    await browser.close();
})
