import { useState } from 'react';
import { getApi, Location } from '../services/api/api'

const useLocationSearch = (): [
    isLoading: boolean,
    results: Location[],
    search: (name: string, postcode: string, organisation: string) => void ] => {
        const [isLoading, setIsLoading] = useState(false);
        const [results, setResults] = useState<Location[]>([]);

        const search = async (name: string, postcode: string, organisation: string) => {
            setIsLoading(true);
            const results = await getApi().getLocations(name, postcode, organisation);
            setIsLoading(false);
            setResults(results);
        };

        return [isLoading, results, search];
    };

export default useLocationSearch;
