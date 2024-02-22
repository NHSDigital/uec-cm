import { useState } from 'react';
import { getApi, Organisation } from '../services/api/api'

const useOrganisationSearch = (): [
    isLoading: boolean,
    results: Organisation[],
    search: (name: string, postcode: string, organisation: string) => void ] => {
        const [isLoading, setIsLoading] = useState(false);
        const [results, setResults] = useState<Organisation[]>([]);

        const search = async (name: string, postcode: string, organisation: string) => {
            setIsLoading(true);
            const results = await getApi().getOrganisations(name, postcode, organisation);
            setIsLoading(false);
            setResults(results);
        };

        return [isLoading, results, search];
    };

export default useOrganisationSearch;
