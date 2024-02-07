import { Given , When , Then } from "@cucumber/cucumber";
import {pageFixture} from "../../src/hooks/pageFixture";
import SearchPage from "../../src/pages/searchPage";
import {getCloudFrontUrl} from "../../src/utilities/cloudfront";


let searchPage: SearchPage;

Given('I navigate to the cloudfront endpoint', async function () {
  console.log("This is also my workspace: " + process.env.WORKSPACE);
  console.log("This is my env: " + process.env.ENV);
  let workspace = process.env.WORKSPACE as string;
  let env = process.env.ENV as string;
  console.log('This is the Origin Bucket: nhse-uec-cm-'+env+'-front-end'+workspace+'.s3.amazonaws.com')
  var distribution = getCloudFrontUrl(env, workspace);
  var url = JSON.parse(distribution)
  console.log("This is the domain name:" +url.DomainName)
  await pageFixture.page.goto("https://"+url.DomainName)
  searchPage = new SearchPage(pageFixture.page);
})

Then('the accessibility checks are passing', async function(){
  await searchPage.runAxeCheck();
})

Then('{string} is displayed on the page', async function (searchResultsText: string) {
  await searchPage.textIsReturned(searchResultsText)
});

Then('{string} link is displayed on the page', async function (searchResultsLink: string) {
  await searchPage.linkIsReturned(searchResultsLink)
});
