import { useState } from 'react';
import { getApi, Location } from '../services/api/api'

const useLocationSearch = (): [
    isLoading: boolean,
    results: Location[],
    search: (name: string, postcode: string, organisation: string) => void ] => {
        const [resultsRetrived, setResultsRetrieved] = useState(false);
        const [results, setResults] = useState<Location[]>([]);

        const search = async (name: string, postcode: string, organisation: string) => {
            setResultsRetrieved(true);
            const results = await getApi().getLocations(name, postcode, organisation);
            setResults(results);
            setResultsRetrieved(false);
        };

        return [resultsRetrived, results, search];
    };

export default useLocationSearch;
