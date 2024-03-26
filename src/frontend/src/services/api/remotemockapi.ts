import { getMockApiData, getTestFolder } from '../utilities';
import { ApiInterface, Location, Organisation, Type } from './interface';

const RemoteMockApi: ApiInterface = {
    getOrganisations: async (name: string, postcode: string, organisation: string): Promise<Organisation[]> => {
        let fileName = [name, postcode, organisation].filter(Boolean).join("+");

        if (fileName.length === 0) {
            fileName = "all";
        }

        return getMockApiData(getTestFolder("getorganisations"), fileName);
    },
    getLocations: async (name: string, postcode: string, organisation: string): Promise<Location[]> => {
        const fileName = [name, postcode, organisation].filter(Boolean).join("+");
        return getMockApiData(getTestFolder("getlocations"), fileName);
    },
    getOrganisationTypes: function (): Promise<Type[]> {
        return getMockApiData(getTestFolder("getorganisationtypes"), "default");
    }
};

export default RemoteMockApi;
