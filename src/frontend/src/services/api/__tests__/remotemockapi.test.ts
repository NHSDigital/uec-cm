import { Location, Organisation } from "../interface";
import RemoteMockApi from "../remotemockapi";
import * as utilities from '../..//utilities';

describe('getOrganisations', () => {
  it('should return an array of Organisation objects when valid name, postcode and organisation are provided', async () => {
    const name = 'John';
    const postcode = '12345';
    const organisation = 'ABC';
    const expectedOrganisations = [
      { id: '1', name: 'Org1' },
      { id: '2', name: 'Org2' },
    ];

    jest.spyOn(utilities, 'getMockApiData').mockResolvedValue(expectedOrganisations);
    const result = await RemoteMockApi.getOrganisations(name, postcode, organisation);
    expect(result).toEqual(expectedOrganisations);
  });

  it('should return an empty array when invalid name is provided', async () => {
    const name = 'xxxxx';
    const postcode = '';
    const organisation = '';
    const expectedOrganisations: Organisation[] = [];

    jest.spyOn(utilities, 'getMockApiData').mockResolvedValue(expectedOrganisations);
    const result = await RemoteMockApi.getOrganisations(name, postcode, organisation);
    expect(result).toEqual(expectedOrganisations);
  });
});

describe('getLocations', () => {
  it('should return an array of Location objects when valid name, postcode and organisation are provided', async () => {
    // Arrange
    const name = 'John';
    const postcode = '12345';
    const organisation = 'ABC';
    const expectedLocations = [
      { id: '1', name: 'Org1' },
      { id: '2', name: 'Org2' },
    ];

    jest.spyOn(utilities, 'getMockApiData').mockResolvedValue(expectedLocations);
    const result = await RemoteMockApi.getLocations(name, postcode, organisation);
    expect(result).toEqual(expectedLocations);
  });

  it('should return an empty array when invalid name is provided', async () => {
    const name = 'xxxxx';
    const postcode = '';
    const organisation = '';
    const expectedLocations: Location[] = [];

    jest.spyOn(utilities, 'getMockApiData').mockResolvedValue(expectedLocations);
    const result = await RemoteMockApi.getLocations(name, postcode, organisation);
    expect(result).toEqual(expectedLocations);
  });
});

