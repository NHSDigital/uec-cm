import { test, expect } from '@playwright/test';
import path from 'path';
import { allure } from "allure-playwright";
import { getRowCount, getColumnHeaders, getCellValue, isFileExists, getColumnCount } from '../../src/utilities/csvHelper';

let filePath: string;

test.describe('As a user I want to be able to read downloaded csv files', {
  tag: '@orgSearchDownload',
}, async () => {

  test.beforeEach(async ({ page }, testInfo) => {
    await allure.parentSuite(testInfo.project.name);
    await allure.suite("Tests downloaded files");
    await allure.subSuite("Tests csv files");
    await test.step('Navigate to landing page', async () => {
      await page.goto('/');
      filePath = path.join(__dirname, `../../downloads/data.csv`);
    });
  });

  test('The data.csv file exists', async () => {
    expect(isFileExists(filePath)).toBeTruthy;
  });

  test('The data.csv file has correct headers', async () => {
      expect(getColumnHeaders(filePath)).toEqual(["test_case", "some_value", "some_other_value"]);
  });

  test('The data.csv file has correct row count', async () => {
    expect(getRowCount(filePath)).toEqual(4);
  });

  test(`The data.csv file has correct value in row 2 of 'some_value' column`, async () => {
    expect(getCellValue(filePath, 'some_value', 2)).toEqual('value 22');
  });

  test('The data.csv file has correct column count', async () => {
    expect(getColumnCount(filePath)).toEqual(3);
  });
});
