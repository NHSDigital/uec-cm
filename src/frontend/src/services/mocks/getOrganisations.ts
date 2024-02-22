import { Organisation } from "../api/api";
import { getStringNumericValue } from "../utilities";
import defaultOrgData from '../../mockdata/organisations/getorganisations/default.json';
import singleOrgData from '../../mockdata/organisations/getorganisations/single.json';

const getOrganisationsMock = (name: string, postcode: string, organisation: string): Promise<Organisation[]> => {
    let results: Organisation[] = [];

    const notZeroRows = name !== "0" && organisation !== "0" && postcode.toUpperCase() !== "NG11 1AA";

    if (notZeroRows) {
        const nameNumber = getStringNumericValue(name);
        const orgNumber = getStringNumericValue(organisation);

        let counter = 1;
        const generateOrgData = (length: number) => Array.from({ length }, () =>
            ({ ...singleOrgData, name: `Nhs Org ${counter++}` })
        );

        if (nameNumber && nameNumber < 1000) {
            results = generateOrgData(nameNumber);
        } else if (orgNumber && orgNumber < 1000) {
            results = generateOrgData(orgNumber);
        } else {
            results = defaultOrgData;
        }
    }

    return Promise.resolve(results);
}

export default getOrganisationsMock;
