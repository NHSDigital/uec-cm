import { Given , When , Then } from "@cucumber/cucumber";
import {pageFixture} from "../../src/hooks/pageFixture";
import SearchPage from "../../src/pages/searchPage";
import {getCloudFrontUrl} from "../../src/utilities/cloudfront";


let searchPage: SearchPage;
searchPage = new SearchPage(pageFixture.page);

Given('I navigate to the cloudfront endpoint for workspace {string}', async function (workspace) {
  var distribution = getCloudFrontUrl(workspace);
  var url = JSON.parse(distribution)
  console.log(url.DomainName)
  await pageFixture.page.goto("https://"+url.DomainName)

  })

Given('I navigate to the env cloudfront endpoint', async function () {
  console.log("This is also my workspace: " + process.env.WORKSPACE);
  let workspace = process.env.WORKSPACE as string;
  console.log(workspace)
  var distribution = getCloudFrontUrl(workspace);
  var url = JSON.parse(distribution)
  console.log(url.DomainName)
  await pageFixture.page.goto("https://"+url.DomainName)

  })

Then('{string} is returned', async function (searchResultsString) {
  await searchPage.headerIsReturned(searchResultsString)
});


