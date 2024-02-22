import { ApiInterface, Location, Organisation } from './api';

const baseUrl = "https://raw.githubusercontent.com/asudbury/test-data/";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getApiData = async (baseUrl: string, fileName: string): Promise<any> => {
    const response = await fetch(baseUrl + fileName + ".json");
    if (!response.ok) {
        const defaultResponse = await fetch(baseUrl + "default.json");
        if (!defaultResponse.ok) {
            throw new Error('Network response was not ok');
        }

        return defaultResponse.json();
    }

    return response.json();
 };


const getBranch = () : string => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const branch = params.get('branch');

    if (branch) {
        return branch;
    }

    return "main";
}

const RemoteMockApi: ApiInterface = {
    getOrganisations: async (name: string, postcode: string, organisation: string): Promise<Organisation[]> => {
        const fileName = [name, postcode, organisation].filter(Boolean).join("+");
        return getApiData(baseUrl +  getBranch() + "/organisations/", fileName);
    },
    getLocations: async (name: string, postcode: string, organisation: string): Promise<Location[]> => {
        const fileName = [name, postcode, organisation].filter(Boolean).join("+");
        return getApiData(baseUrl +  getBranch() + "/locations/", fileName);
    }
};

export default RemoteMockApi;
