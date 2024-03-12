import getOrganisationsMock from "../getOrganisations";
import defaultOrganisationData from "../../../mockdata/getorganisations/default.json";
import royalOrganisationData from "../../../mockdata/getorganisations/royal.json";
import { Organisation } from "../../api/interface";

describe('getOrganisationsMock', () => {
  it('should return an empty array when name is "0"', () => {
    const name = "0";
    const postcode = "";
    const organisation = "";

    return getOrganisationsMock(name, postcode, organisation).then((result: Organisation[]) => {
      expect(result).toEqual([]);
    });
  });

  it('should return an empty array when post code is NG11 1AA', () => {
    const name = "";
    const postcode = "NG11 1AA";
    const organisation = "";

    return getOrganisationsMock(name, postcode, organisation).then((result: Organisation[]) => {
      expect(result).toEqual([]);
    });
  });

  it('should return defaultOrganisationData when name, organisation and postcode are not "0"', () => {
    const name = "test";
    const postcode = "test";
    const organisation = "test";

    return getOrganisationsMock(name, postcode, organisation).then((result: Organisation[]) => {
      expect(result).toEqual(defaultOrganisationData);
    });
  });

  it('should return an array of Organisation objects with length equal to 400 when name is "400"', () => {
    const name = "400";
    const postcode = "test";
    const organisation = "test";

    return getOrganisationsMock(name, postcode, organisation).then((result: Organisation[]) => {
      expect(result.length).toBe(400);
    });
  });

  it('should return an array of Organisation objects with length equal to 500 when organisation is "500"', () => {
    const name = "test";
    const postcode = "test";
    const organisation = "500";

    return getOrganisationsMock(name, postcode, organisation).then((result: Organisation[]) => {
      expect(result.length).toBe(500);
    });
  });

  it('should return royalOrganisationData when name is "royal"', () => {
    const name = "royal";
    const postcode = "test";
    const organisation = "test";

    return getOrganisationsMock(name, postcode, organisation).then((result: Organisation[]) => {
      expect(result).toEqual(royalOrganisationData);
    });
  });
});
