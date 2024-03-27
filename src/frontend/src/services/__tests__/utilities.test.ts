import fetchMock from 'jest-fetch-mock';
import {
  getBranchFromUrlParam,
  getMockApiData,
  getStringNumericValue,
  getTestFolder,
  getUrlWithApiParams}
  from "../utilities";

describe('getStringNumericValue', () => {
  it('should return a number when given a valid string', () => {
    const str = "123";
    const result = getStringNumericValue(str);
    expect(result).toEqual(123);
  });

  it('should return null when given an empty string', () => {
    const str = "";
    const result = getStringNumericValue(str);
    expect(result).toBe(null);
  });

  it('should return null when given an invalid string', () => {
    const str = "abc";
    const result = getStringNumericValue(str);
    expect(result).toBe(null);
  });
});

describe('getBranchFromUrlParam', () => {
  it('should return the branch parameter value from the URL if it exists', () => {
    Object.defineProperty(window, 'location', {
      value: {
        href: 'https://example.com?branch=test',
      },
      writable: true,
    });

    const result = getBranchFromUrlParam();
    expect(result).toEqual("test");
  });

  it('should return "main" if the branch parameter is not present in the URL', () => {

    Object.defineProperty(window, 'location', {
      value: {
        href: 'https://example.com',
      },
      writable: true,
    });

    const result = getBranchFromUrlParam();
    expect(result).toEqual("main");
  });
});

describe('getTestFolder', () => {
  it('should return a URL string with the correct branch and folder values', () => {
    const folder = "testFolder";
    const expectedUrl = "https://raw.githubusercontent.com/NHSDigital/uec-cm/main/src/frontend/src/mockdata/testFolder/";
    const result = getTestFolder(folder);
    expect(result).toEqual(expectedUrl);
  });
});

describe('getMockApiData', () => {

  beforeEach(() => {
    jest.resetAllMocks()
    fetchMock.resetMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    fetchMock.resetMocks();
  });

  it('should fetch data from the API and returns the response', async () => {
    const mockResponse = { data: 'mock data' };
    const url = getTestFolder('getorganisations');
    const fileName = 'london';

    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    }) as Promise<Response>);

    const result = await getMockApiData(url, fileName);

    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${url}${fileName}.json`);
  });

  it('should fetch default data if the specific file is not found', async () => {
    const mockDefaultResponse = { data: 'default data' };
    const url = getTestFolder('getorganisations');
    const fileName = 'nonExistentFile';

    let callCount = 0;

    jest.spyOn(global, 'fetch').mockImplementation(() => {
      callCount += 1;

      if (callCount === 1) {
        return Promise.resolve({
          ok: false,
        }) as Promise<Response>;
      }

      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockDefaultResponse),
      }) as Promise<Response>;
    });

    const result = await getMockApiData(url, fileName);

    expect(result).toEqual(mockDefaultResponse);
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith(`${url}nonExistentFile.json`);
    expect(fetch).toHaveBeenCalledWith(`${url}default.json`);
  });

  it('should throw an error if both the specific file and default file fetches fail', async () => {
    fetchMock.mockReject(new Error('Network response was not ok'));

    const url = 'https://example.com/';
    const fileName = 'nonExistentFile';

    await expect(getMockApiData(url, fileName)).rejects.toThrow('Network response was not ok');
  });

  it('should return the same path when no "api" parameter is present in the URL', () => {
    const path = "/example/path";
    const result = getUrlWithApiParams(path);
    expect(result).toBe(path);
  });

  it('should append the "api" parameter to the path when it is present in the URL', () => {
    const path = "/example/path";
    window.location.search = "?api=123";
    const result = getUrlWithApiParams(path);
    expect(result).toBe(`${path}?api=123`);
  });

  it('should append the "api" and "branch" parameters to the path when it is present in the URL', () => {
    const path = "/example/path";
    window.location.search = "?api=123&branch=test";
    const result = getUrlWithApiParams(path);
    expect(result).toBe(`${path}?api=123&branch=test`);
  });
});
