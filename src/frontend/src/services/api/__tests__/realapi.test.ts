import  RealApi  from '../realapi';

describe('RealApi', () => {
  it('getOrganisations throws an error', () => {
    expect(() => RealApi.getOrganisations('name', 'postcode', 'organisation')).toThrow('Function not implemented.');
  });

  it('getLocations throws an error', () => {
    expect(() => RealApi.getLocations('name', 'postcode', 'organisation')).toThrow('Function not implemented.');
  });

  it('getOrganisationTypes throws an error', () => {
    expect(() => RealApi.getOrganisationTypes()).toThrow('Function not implemented.');
  });
});
