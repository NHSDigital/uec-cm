import { Given , When , Then } from "@cucumber/cucumber";
import { pageFixture } from "../../src/hooks/pageFixture";
import SearchPage from "../../src/pages/searchPage";
import { getCloudFrontUrl } from "../../src/utilities/cloudFront";


let searchPage: SearchPage;
searchPage = new SearchPage(pageFixture.page);

Given('I navigate to the cloudfront endpoint', async function () {
  let workspace = process.env.WORKSPACE as string;
  let env = process.env.ENV as string;
  let region = process.env.REGION as string;
  var distribution = getCloudFrontUrl(region,env, workspace);
  var url = JSON.parse(distribution)
  await pageFixture.page.goto("https://"+url.DomainName)
  })

  Given('I navigate to the organisations page', async function () {
    let workspace = process.env.WORKSPACE as string;
    let env = process.env.ENV as string;
    let region = process.env.REGION as string;
    var distribution = getCloudFrontUrl(region,env, workspace);
    var url = JSON.parse(distribution)
    await pageFixture.page.goto("https://"+url.DomainName)
    })


Then('{string} is displayed on the page', async function (searchResultsText) {
  await searchPage.textIsReturned(searchResultsText)
});

Then('{string} link is displayed on the page', async function (searchResultsLink) {
  await searchPage.linkIsReturned(searchResultsLink)
});


Then('the accessibility checks are passing', async function(){
  await searchPage.runAxeCheck();
})
