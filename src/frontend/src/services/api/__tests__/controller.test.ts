import { getApi } from "../controller";
import LocalMockApi from "../localmockapi";
import RemoteMockApi from "../remotemockapi";

describe('getApi', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      value: {
        href: 'https://test.com/',
      },
      writable: true,
    });
  });

  it('should return LocalMockApi by default', () => {
    const api = getApi();
    expect(api).toBe(LocalMockApi);
  });

  it('should return LocalMockApi when URL parameter is "l"', () => {
    window.location.href = 'http://localhost:3000?api=l';
    const api = getApi();
    expect(api).toBe(LocalMockApi);
  });

  it('should return RemoteMockApi when URL parameter is "r"', () => {
    window.location.href = 'http://localhost:3000?api=r';
    const api = getApi();
    expect(api).toBe(RemoteMockApi);
  });

  it('should return LocalMockApi when REACT_APP_API_MODE is "LOCALMOCK"', () => {
    process.env.REACT_APP_API_MODE = 'LOCALMOCK';
    const result = getApi();
    expect(result).toEqual(LocalMockApi);
  });

  it('should return RemoteMockApi when REACT_APP_API_MODE is "REMOTEMOCK"', () => {
    process.env.REACT_APP_API_MODE = 'REMOTEMOCK';
    const result = getApi();
    expect(result).toEqual(RemoteMockApi);
  });
});
