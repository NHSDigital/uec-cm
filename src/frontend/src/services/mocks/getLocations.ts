import { Location } from "../api/interface";
import { getStringNumericValue } from "../utilities";
import defaultLocationData from '../../mockdata/getlocations/default.json'
import singleLocationData from '../../mockdata/getlocations/single.json'

const getLocationsMock = (name: string, postcode: string, organisation: string): Promise<Location[]> => {
    let results: Location[] = [];

    const notZeroRows = name !== "0" && organisation !== "0" && postcode.toUpperCase() !== "NG11 1AA";

    if (notZeroRows) {
        const nameNumber = getStringNumericValue(name);
        const orgNumber = getStringNumericValue(organisation);

        let counter = 1;
        const generateLocationData = (length: number) => Array.from({ length }, () =>
            ({ ...singleLocationData, name: `Nhs Location ${counter++}` })
        );

        if (nameNumber && nameNumber < 1000) {
            results = generateLocationData(nameNumber);
        } else if (orgNumber && orgNumber < 1000) {
            results = generateLocationData(orgNumber);
        } else {
            results = defaultLocationData;
        }
    }

    return Promise.resolve(results);
}

export default getLocationsMock;
