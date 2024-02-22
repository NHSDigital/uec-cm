import { ApiInterface, Location, Organisation } from './api';

const baseUrl = "https://raw.githubusercontent.com/NHSDigital/uec-cm/";
const mockDataFolder = "/src/frontend/src/mockdata/";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getApiData = async (url: string, fileName: string): Promise<any> => {
    const response = await fetch(url + fileName + ".json");
    if (!response.ok) {
        const defaultResponse = await fetch(url + "default.json");
        if (!defaultResponse.ok) {
            throw new Error('Network response was not ok');
        }

        return defaultResponse.json();
    }

    return response.json();
}

const getBranch = () : string => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const branch = params.get('branch');

    if (branch) {
        return branch;
    }

    return "main";
}

const getTestFolder = (folder: string) : string => {
    return baseUrl + getBranch() + mockDataFolder + folder + "/";
}

const RemoteMockApi: ApiInterface = {
    getOrganisations: async (name: string, postcode: string, organisation: string): Promise<Organisation[]> => {
        const fileName = [name, postcode, organisation].filter(Boolean).join("+");
        return getApiData(getTestFolder("getorganisations"), fileName);
    },
    getLocations: async (name: string, postcode: string, organisation: string): Promise<Location[]> => {
        const fileName = [name, postcode, organisation].filter(Boolean).join("+");
        return getApiData(getTestFolder("getlocations"), fileName);
    }
};

export default RemoteMockApi;
