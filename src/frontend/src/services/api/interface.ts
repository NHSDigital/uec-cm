export interface Address {
    city: string
    country: string
    district?: string
    line: string[]
    postalCode: string
}

export interface Identifier {
    type: string
    use: string
    value: string
}

export interface Position {
    latitude: string
    longitude: string
}

export interface LocationOrganisation {
    id: string
    active: string
    Address: Address[]
    createdBy: string
    createdDateTime: string
    modifiedBy: string
    modifiedDateTime: string
    name: string
    entityType?: 'location' | 'organisation'
    organisationId?: string
}

export interface Organisation extends LocationOrganisation {
    identifier: Identifier
    resourceType: string
    type: string
}

export interface Location extends LocationOrganisation {
    lookup_field: string
    managingOrganization: string
    position: Position
}

export interface Type {
    value: string
    text: string
}

export interface ApiInterface {
    getOrganisations(name: string, postcode: string, organisation: string): Promise<Organisation[]>;
    getLocations(name: string, postcode: string, organisation: string): Promise<Location[]>;
    getOrganisationTypes(): Promise<Type[]>;
}
