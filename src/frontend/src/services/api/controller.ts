import LocalMockApi from './localmockapi';
import RemoteMockApi from './remotemockapi';
import RealApi from './realapi';
import { ApiInterface } from './interface';
import { config } from '../../config/config';

export const getApi = (): ApiInterface => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const api = params.get('api');

    if (api) {
        if (api === "l") {
            return LocalMockApi;
        }
        if (api === "r") {
            return RemoteMockApi;
        }
        if (api === "real") {
            return RealApi;
        }
    }

    if (config.VITE_APP_API_MODE === "REMOTEMOCK") {
        return RemoteMockApi;
    }

    if (config.VITE_APP_API_MODE === "LOCALMOCK") {
        return LocalMockApi;
    }

    return LocalMockApi;
};
