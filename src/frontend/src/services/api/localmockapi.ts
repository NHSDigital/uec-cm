import { ApiInterface, Location, Organisation, Type } from './interface';
import getOrganisationsMock from '../mocks/getOrganisations';
import getLocationsMock from '../mocks/getLocations';
import organisationsMockData from '../../mockdata/getorganisationtypes/default.json';

const LocalMockApi: ApiInterface = {
    getOrganisations(name: string, postcode: string, organisation: string): Promise<Organisation[]> {
        return getOrganisationsMock(name, postcode, organisation);
    },
    getLocations(name: string, postcode: string, organisation: string): Promise<Location[]> {
        return getLocationsMock(name, postcode, organisation);
    },
    getOrganisationTypes: function (): Promise<Type[]> {
        return Promise.resolve(organisationsMockData);
    }
};

export default LocalMockApi;
