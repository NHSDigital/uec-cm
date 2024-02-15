import { expect, Page } from "@playwright/test";
import { pageFixture } from "../../src/hooks/pageFixture";
import Accessibility from "../utilities/acccessibility";

export default class SearchPage extends Accessibility {
  constructor(page: Page) {
    super(page);
    pageFixture.page = page;
  }

async headerIsReturned(searchResultsHeader: string) {
  await expect(pageFixture.page.getByRole('heading', {name: searchResultsHeader })).toBeVisible();
}

async textIsReturned(searchResultsText: string) {
  await expect(pageFixture.page.getByText(searchResultsText, {exact: true} )).toBeVisible();
}

async linkIsReturned(searchResultsLink: string) {
  await expect(pageFixture.page.getByRole("link" , {name: searchResultsLink } )).toBeVisible();
}

}
