import { useState } from 'react';
import { getApi, Organisation } from '../services/api/api'

const useOrganisationSearch = (): [
    isLoading: boolean,
    results: Organisation[],
    search: (name: string, postcode: string, organisation: string) => void ] => {
        const [resultsRetrived, setResultsRetrieved] = useState(false);
        const [results, setResults] = useState<Organisation[]>([]);

        const search = async (name: string, postcode: string, organisation: string) => {
            setResultsRetrieved(false);
            const results = await getApi().getOrganisations(name, postcode, organisation);
            setResults(results);
            setResultsRetrieved(false);
        };

        return [resultsRetrived, results, search];
    };

export default useOrganisationSearch;
