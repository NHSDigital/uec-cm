import { getMockApiData, getTestFolder } from '../utilities';
import { ApiInterface, Location, Organisation } from './interface';

const RemoteMockApi: ApiInterface = {
    getOrganisations: async (name: string, postcode: string, organisation: string): Promise<Organisation[]> => {
        const fileName = [name, postcode, organisation].filter(Boolean).join("+");
        return getMockApiData(getTestFolder("getorganisations"), fileName);
    },
    getLocations: async (name: string, postcode: string, organisation: string): Promise<Location[]> => {
        const fileName = [name, postcode, organisation].filter(Boolean).join("+");
        return getMockApiData(getTestFolder("getlocations"), fileName);
    }
};

export default RemoteMockApi;
