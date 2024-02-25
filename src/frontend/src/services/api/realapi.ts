import { ApiInterface, Location, Organisation } from './interface'

const RealApi: ApiInterface = {
    getOrganisations(name: string, postcode: string, organisation: string): Promise<Organisation[]> {
        throw new Error('Function not implemented.');
    },
    getLocations: function (name: string, postcode: string, organisation: string): Promise<Location[]> {
        throw new Error('Function not implemented.');
    }
};

export default RealApi;
