import getLocationsMock from "../getLocations";
import defaultLocationData from "../../../mockdata/getlocations/default.json";
import { Location } from "../../api/interface";

describe('getLocationsMock', () => {
  it('should return an empty array when name is "0"', () => {
    const name = "0";
    const postcode = "";
    const organisation = "";

    return getLocationsMock(name, postcode, organisation).then((result: Location[]) => {
      expect(result).toEqual([]);
    });
  });

  it('should return an empty array when post code is NG11 1AA', () => {
    const name = "";
    const postcode = "NG11 1AA";
    const organisation = "";

    return getLocationsMock(name, postcode, organisation).then((result: Location[]) => {
      expect(result).toEqual([]);
    });
  });

  it('should return defaultLocationData when name, organisation and postcode are not "0"', () => {
    const name = "test";
    const postcode = "test";
    const organisation = "test";

    return getLocationsMock(name, postcode, organisation).then((result: Location[]) => {
      expect(result).toEqual(defaultLocationData);
    });
  });

  it('should return an array of Location objects with length equal to 400 when name is "400"', () => {
    const name = "400";
    const postcode = "test";
    const organisation = "test";

    return getLocationsMock(name, postcode, organisation).then((result: Location[]) => {
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
});
