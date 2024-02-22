import LocalMockApi from './localmockapi';
import RemoteMockApi from './remotemockapi';
import RealApi from './realapi';

export interface Organisation {
    id : string;
    name : string;
}

export interface Location {
    id : string;
    name : string;
}

export interface ApiInterface {
    getOrganisations(name: string, postcode: string, organisation: string): Promise<Organisation[]>;
    getLocations(name: string, postcode: string, organisation: string): Promise<Location[]>;
}

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

    if (process.env.REACT_APP_API_MODE === "REMOTEMOCK") {
        return RemoteMockApi;
    }

    if (process.env.REACT_APP_API_MODE === "LOCALMOCK") {
        return LocalMockApi;
    }

    return LocalMockApi;
};
