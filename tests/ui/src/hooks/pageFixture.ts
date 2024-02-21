import { Page } from "@playwright/test";

export let pageFixture;

if (!pageFixture) {
  pageFixture = {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    page: undefined as Page,
  };
}
