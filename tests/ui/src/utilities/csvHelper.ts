import fs from 'fs';
import { parse } from 'csv-parse/sync';

const getAllRecords = (filePath: string): string[] => {
  return parse(fs.readFileSync(filePath), {
    columns: true,
    skip_empty_lines: true
  });
}

const getColumnHeaders = (filePath: string): string[] => {
  return Object.keys(getAllRecords(filePath)[0]);
}

const getRowCount = (filePath: string): number => {
  return getAllRecords(filePath).length;
}

const getColumnCount = (filePath: string): number => {
  return Object.keys(getAllRecords(filePath)[0]).length;
}

const getCellValue = (filePath: string, columnName: string, rowNumber: number): string[] => {
  return getAllRecords(filePath)[rowNumber - 1][columnName];
}

const isFileExists = (filePath: string): boolean => {
  return fs.existsSync(filePath);
}

export {
  getAllRecords,
  getRowCount,
  getColumnHeaders,
  getCellValue,
  isFileExists,
  getColumnCount
}
