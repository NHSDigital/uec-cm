import { ApiInterface, Location, Organisation } from './api';
import getOrganisationsMock from '../mocks/getOrganisations';
import getLocationsMock from '../mocks/getLocations';

const LocalMockApi: ApiInterface = {
    getOrganisations(name: string, postcode: string, organisation: string): Promise<Organisation[]> {
        return getOrganisationsMock(name, postcode, organisation);
    },
    getLocations(name: string, postcode: string, organisation: string): Promise<Location[]> {
        return getLocationsMock(name, postcode, organisation);
    }
};

export default LocalMockApi;
