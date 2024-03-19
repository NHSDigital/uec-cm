import getLocationsMock from "../getLocations";
import defaultLocationData from "../../../mockdata/getlocations/default.json";
import royalLocationData from "../../../mockdata/getlocations/royal.json";
import { Location } from "../../api/interface";

describe('getLocationsMock', () => {
  it('should return an empty array when name is "000"', () => {
    const name = "000";

    return getLocationsMock(name, '', '').then((result: Location[]) => {
      expect(result).toEqual([]);
    });
  });

  it('should return an empty array when post code is NG11 1AA', () => {
    const name = "NG11 1AA";

    return getLocationsMock(name, '', '').then((result: Location[]) => {
      expect(result).toEqual([]);
    });
  });

  it('should return defaultLocationData when name, organisation and postcode are not "000"', () => {
    const name = "test";

    return getLocationsMock(name, '', '').then((result: Location[]) => {
      expect(result).toEqual(defaultLocationData);
    });
  });

  it('should return an array of Location objects with length equal to 400 when name is "400"', () => {
    const name = "400";

    return getLocationsMock(name, '', '').then((result: Location[]) => {
      expect(result.length).toBe(400);
    });
  });

  it('should return an array of Location objects with length equal to 500 when organisation is "500"', () => {
    const name = "test";
    const postcode = "test";
    const organisation = "500";

    return getLocationsMock(name, postcode, organisation).then((result: Location[]) => {
      expect(result.length).toBe(500);
    });
  });

  it('should return royalLocationData when name is "royal"', () => {
    const name = "royal";
    const postcode = "test";
    const organisation = "test";

    return getLocationsMock(name, postcode, organisation).then((result: Location[]) => {
      expect(result).toEqual(royalLocationData);
    });
  });
});
