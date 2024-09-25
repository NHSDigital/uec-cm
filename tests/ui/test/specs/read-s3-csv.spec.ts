import { test, expect } from '@playwright/test';
import path from 'path';
import { allure } from 'allure-playwright';
import { addObject, getObject, deleteObject } from '../../src/utilities/s3Helper';
import { getRowCount, getColumnHeaders, getCellValue, isFileExists, getColumnCount } from '../../src/utilities/csvHelper';

let filePath: string;
const fileName: string = 's3data.csv';

test.describe('As a user I want to be able to read csv files downloaded from s3 bucket', {
  tag: '@orgSearchDownload',
}, async () => {

  test.beforeAll('Add, then get object from s3 bucket', async () => {
    filePath = path.join(__dirname, `../../downloads/${fileName}`);
    addObject(filePath, fileName);
    getObject(fileName);
  });

  test.beforeEach(async ({ page }, testInfo) => {
    allure.parentSuite(testInfo.project.name);
    allure.suite('Tests downloaded files');
    allure.subSuite('Tests csv files');
    await test.step('Navigate to landing page', async () => {
    });
  });

  test('The s3data.csv file exists',  () => {
    expect(isFileExists(filePath)).toBeTruthy;
  });

  test('The s3data.csv file has correct headers',  () => {
      expect(getColumnHeaders(filePath)).toEqual([
        'test_case_id',
        'some_value_input',
        'some_other_value_input'
      ]);
  });

  test('The s3data.csv file has correct row count',  () => {
    expect(getRowCount(filePath)).toEqual(4);
  });

  test(`The s3data.csv file has correct value in row 2 of 'some_value_input' column`,  () => {
    expect(getCellValue(filePath, 'some_value_input', 2)).toEqual('value 20');
  });

  test('The s3data.csv file has correct column count',  () => {
    expect(getColumnCount(filePath)).toEqual(3);
  });

  test.afterAll('Delete object from s3 bucket',  () => {
    deleteObject(fileName);
  });
});

