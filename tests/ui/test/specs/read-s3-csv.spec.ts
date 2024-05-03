import { test, expect } from '@playwright/test';
import path from 'path';
import { allure } from "allure-playwright";
import { getS3BucketObject } from '../../src/utilities/getS3bucketObject';
import { getRowCount, getColumnHeaders, getCellValue, isFileExists, getColumnCount } from '../../src/utilities/csvHelper';

let filePath: string;

test.describe('As a user I want to be able to read downloaded csv files from s3 bucket', {
  tag: '@orgSearchDownload',
}, async () => {

  test.beforeAll(async () => {
    getS3BucketObject('s3data.csv');
    filePath = path.join(__dirname, `../../downloads/s3data.csv`);
  });

  test.beforeEach(async ({ page }, testInfo) => {
    await allure.parentSuite(testInfo.project.name);
    await allure.suite("Tests downloaded files");
    await allure.subSuite("Tests csv files");
    await test.step('Navigate to landing page', async () => {
      await page.goto('/');
    });
  });

  test('The s3data.csv file exists', async () => {
    expect(isFileExists(filePath)).toBeTruthy;
  });

  test('The s3data.csv file has correct headers', async () => {
      expect(getColumnHeaders(filePath)).toEqual([
        "test_case_id",
        "some_value_input",
        "some_other_value_input"
      ]);
  });

  test('The s3data.csv file has correct row count', async () => {
    expect(getRowCount(filePath)).toEqual(4);
  });

  test(`The s3data.csv file has correct value in row 2 of 'some_value_input' column`, async () => {
    expect(getCellValue(filePath, 'some_value_input', 2)).toEqual('value 20');
  });

  test('The s3data.csv file has correct column count', async () => {
    expect(getColumnCount(filePath)).toEqual(3);
  });
});
