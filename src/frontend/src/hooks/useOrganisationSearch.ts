import { useState } from 'react';
import { getApi } from '../services/api/controller'
import { Organisation } from '../services/api/interface'

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
