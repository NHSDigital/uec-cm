import { Location, Organisation } from "../interface";
import LocalMockApi from "../localmockapi";
import getLocationsMock from  '../../mocks/getLocations';
import getOrganisationsMock from '../../mocks/getOrganisations';
import defaultOrgData from '../../../mockdata/getorganisations/default.json';
import defaultLocationData from '../../../mockdata/getlocations/default.json';

describe('getOrganisations', () => {
  it('should return an array of Organisation objects when valid name, postcode and organisation are provided', async () => {
      const name = 'xxxxxxx';
      jest.spyOn({getOrganisationsMock}, 'getOrganisationsMock').mockResolvedValue(defaultOrgData);
      const result = await LocalMockApi.getOrganisations(name, '', '');
      expect(result).toEqual(defaultOrgData);
  });

  it('should return an empty array when name of "000" is provided', async () => {
    const name = '000';
    const expectedOrganisations: Organisation[] = [];

    jest.spyOn({getOrganisationsMock}, 'getOrganisationsMock').mockResolvedValue(expectedOrganisations);
    const result = await LocalMockApi.getOrganisations(name, '', '');
    expect(result).toEqual(expectedOrganisations);
  });
});

describe('getLocations', () => {
  it('should return an array of Location objects when valid name, postcode and organisation are provided', async () => {
    const name = 'xxxxxxxx';

    jest.spyOn({getLocationsMock}, 'getLocationsMock').mockResolvedValue(defaultLocationData);
    const result = await LocalMockApi.getLocations(name, '', '');
    expect(result).toEqual(defaultLocationData);
  });

  it('should return an empty array when  name of "000" is provided', async () => {
    const name = '000';
    const expectedLocations: Location[] = [];

    jest.spyOn({getLocationsMock}, 'getLocationsMock').mockResolvedValue(expectedLocations);
    const result = await LocalMockApi.getLocations(name, '', '');
    expect(result).toEqual(expectedLocations);
  });
});
