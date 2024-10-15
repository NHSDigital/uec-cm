import  { BeforeAll, Before, AfterAll, After, Status, AfterStep} from "@cucumber/cucumber";
import { chromium, Browser, Page, BrowserContext } from "@playwright/test"
import { getEnv } from "../config/env";
import Accessibility from "../utilities/accessibility";

let browser: Browser;
let context: BrowserContext;
let acccessibility: Accessibility;
let page: Page;

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
    page = await context.newPage();
    acccessibility = new Accessibility(page);
});

AfterStep(async function ({pickle}) {
  //run Axe for end of every step
  const timestamp = new Date().toISOString().replace(/:/g, '-');
  await acccessibility.runAxeCheck(pickle.name+'-'+timestamp);
  //screenshot for end of every step because we can't correctly capture a failed scenario
  const img = await page.screenshot({path: `reports/screenshots/${pickle.name}.png`, type: "png"});
  await this.attach(img, "image/png");
})

After(async function ({pickle, result}) {
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    //screenshot for every failure
    if(result?.status == Status.FAILED) {
    const img = await page.screenshot({path: `reports/screenshots/${pickle.name+'-'+timestamp}.png`, type: "png"});
    await this.attach(img, "image/png")};
    //close page and context
    await page.close();
    await context.close();
})

AfterAll(async function () {
    await browser.close();
})
