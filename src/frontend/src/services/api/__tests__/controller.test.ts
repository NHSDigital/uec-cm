import { getApi } from "../controller";
import LocalMockApi from "../localmockapi";
import RealApi from "../realapi";
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

  it('should return LocalMockApi when VITE_APP_API_MODE is "LOCALMOCK"', () => {
    const result = getApi();
    expect(result).toEqual(LocalMockApi);
  });

  it('should return RemoteMockApi when VITE_APP_API_MODE is "REMOTEMOCK"', () => {
    jest.resetModules();
    jest.mock('../../../config/config', () => ({
      config: {
        VITE_APP_API_MODE: 'REMOTEMOCK',
      },
    }));

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { getApi } = require('../controller');
    const result = getApi();
    expect(JSON.stringify(result)).toBe(JSON.stringify(RemoteMockApi));
  });

  it('should return RealApi when URL parameter is "real"', () => {
    window.location.href = 'http://localhost:3000?api=real';
    const api = getApi();
    expect(api).toBe(RealApi);
  });
});
