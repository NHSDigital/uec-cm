import { useState } from 'react';
import { getApi, Organisation } from '../services/api/api'

const useOrganisationSearch = (): [
    results: Organisation[],
    search: (name: string, postcode: string, organisation: string) => void ] => {
        const [results, setResults] = useState<Organisation[]>([]);

        const search = async (name: string, postcode: string, organisation: string) => {
            const results = await getApi().getOrganisations(name, postcode, organisation);
            setResults(results);
        };

        return [results, search];
    };

export default useOrganisationSearch;
