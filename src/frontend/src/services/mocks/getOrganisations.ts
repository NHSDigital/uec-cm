import { Organisation } from "../api/interface";
import { getStringNumericValue } from "../utilities";
import defaultOrgData from '../../mockdata/getorganisations/default.json';
import singleOrgData from '../../mockdata/getorganisations/single.json';
import royalOrgData from '../../mockdata/getorganisations/royal.json'
import allOrgData from '../../mockdata/getorganisations/all.json'

const getOrganisationsMock = (name: string, postcode: string, organisation: string): Promise<Organisation[]> => {
    let results: Organisation[] = [];

    const notZeroRows = name !== "000" && name.toUpperCase() !== "NG11 1AA";

    if (notZeroRows) {
        const nameNumber = getStringNumericValue(name);

        let counter = 1;
        const generateOrgData = (length: number) => Array.from({ length }, () =>
            ({ ...singleOrgData, name: `Mock Organisation ${counter++}` })
        );

        if (nameNumber && nameNumber < 1000) {
            results = generateOrgData(nameNumber);
        } else if (name === "royal" || organisation === "royal" || postcode.toUpperCase() === "NG11 2BB") {
            results = royalOrgData;
        } else if (name === "") {
            results = allOrgData;
        } else {
            results = defaultOrgData;
        }
    }

    return Promise.resolve(results);
}

export default getOrganisationsMock;
