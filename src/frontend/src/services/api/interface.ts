
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
