import getOrganisationsMock from "../getOrganisations";
import defaultOrganisationData from "../../../mockdata/getorganisations/default.json";
import royalOrganisationData from "../../../mockdata/getorganisations/royal.json";
import { Organisation } from "../../api/interface";

describe('getOrganisationsMock', () => {
  it('should return an empty array when name is "000"', () => {
    const name = "000";

    return getOrganisationsMock(name, '', '').then((result: Organisation[]) => {
      expect(result).toEqual([]);
    });
  });

  it('should return an empty array when post code is NG11 1AA', () => {
    const name = "NG11 1AA";

    return getOrganisationsMock(name, '', '').then((result: Organisation[]) => {
      expect(result).toEqual([]);
    });
  });

  it('should return defaultOrganisationData when name, organisation and postcode are not "0"', () => {
    const name = "test";

    return getOrganisationsMock(name, '', '').then((result: Organisation[]) => {
      expect(result).toEqual(defaultOrganisationData);
    });
  });

  it('should return an array of Organisation objects with length equal to 400 when name is "400"', () => {
    const name = "400";

    return getOrganisationsMock(name, '', '').then((result: Organisation[]) => {
      expect(result.length).toBe(400);
    });
  });

  it('should return an array of Organisation objects with length equal to 500 when organisation is "500"', () => {
    const name = "500";

    return getOrganisationsMock(name, '', '').then((result: Organisation[]) => {
      expect(result.length).toBe(500);
    });
  });

  it('should return royalOrganisationData when name is "royal"', () => {
    const name = "royal";

    return getOrganisationsMock(name, '', '').then((result: Organisation[]) => {
      expect(result).toEqual(royalOrganisationData);
    });
  });
});
