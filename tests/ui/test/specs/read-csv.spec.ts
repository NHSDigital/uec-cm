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

  [
    { row: 4, column: 'test_case', expected: '4'  },
  ].forEach(({ row, column, expected }) => {
  test(`The data.csv file has correct value of ${expected} in row ${row} of 'test_case' ${column}`,{tag:'@Test'}, async () => {
    expect(getCellValue(filePath, (column), (row))).toEqual((expected));
  });
})});

  [
    { row: 2, column: 'some_value', expected: 'value 22'  },
  ].forEach(({ row, column, expected }) => {
  test(`The data.csv file has correct value of ${expected} in row ${row} of 'some_value' ${column}`,{tag:'@Test'}, async () => {
    expect(getCellValue(filePath, (column), (row))).toEqual((expected));
  });

[
  { row: 3, column: 'test_case', expected: '3' }
].forEach(({ row, column, expected }) => {
test(`The data.csv file has correct column of 3  ${expected} in row ${row} of 'test_case' ${column}`,{tag:'@Test'}, async () => {
  expect(getCellValue(filePath, (column), (row))).toEqual((expected));
});
})});
