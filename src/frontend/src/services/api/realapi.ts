import { ApiInterface, Location, Organisation, Type } from './interface'

const RealApi: ApiInterface = {
    getOrganisations(name: string, postcode: string, organisation: string): Promise<Organisation[]> {
        throw new Error('Function not implemented.');
    },
    getLocations: function (name: string, postcode: string, organisation: string): Promise<Location[]> {
        throw new Error('Function not implemented.');
    },
    getOrganisationTypes: function (): Promise<Type[]> {
        throw new Error('Function not implemented.');
    }
};

export default RealApi;
