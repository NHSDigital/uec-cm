import { useState } from 'react';
import { getApi } from '../services/api/controller'
import { Location } from '../services/api/interface'

const useLocationSearch = (): [
    results: Location[],
    search: (name: string, postcode: string, organisation: string) => void ] => {
        const [results, setResults] = useState<Location[]>([]);

        const search = async (name: string, postcode: string, organisation: string) => {
            const results = await getApi().getLocations(name, postcode, organisation);
            setResults(results);
        };

        return [results, search];
    };

export default useLocationSearch;
