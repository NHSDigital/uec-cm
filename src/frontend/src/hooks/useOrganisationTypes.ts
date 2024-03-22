import { useEffect, useState } from 'react';
import { getApi } from '../services/api/controller'
import { Type } from '../services/api/interface';

const useOrganisationTypes = () => {
    const [data, setData] = useState<Type[]>([]);

    useEffect(() => {
        const fetchOrganisationTypes = async () => {
            const results = await getApi().getOrganisationTypes();
            setData(results);
        };

        fetchOrganisationTypes();
    }, []);

    return data;
};

export default useOrganisationTypes;
