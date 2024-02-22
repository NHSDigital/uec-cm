import { useState, useEffect } from 'react';
import useOrganisationSearch from './useOrganisationSearch';
import useLocationSearch from './useLocationSearch';
import { Organisation } from '../services/api/api';

export enum Step {
    OrganisationsSearch,
    Searching,
    NoResultsFound,
    SearchResults
}

const useOrganisationLocationSearch = () => {
    const [step, setStep] = useState(Step.OrganisationsSearch);
    const [isOrganisationsLoading, organisationSearchResult, organisationSearch] = useOrganisationSearch();
    const [isLocationsLoading, locationSearchResults, locationSearch] = useLocationSearch();
    const [searchResults, setSearchResults] = useState<Organisation[]>([]);

    const handleSearch = (name : string, postcode : string, organisation : string) => {
      setStep(Step.Searching);
      organisationSearch(name, postcode, organisation);
      locationSearch(name, postcode, organisation);
    };

    useEffect(() => {
      if (step === Step.Searching || step === Step.SearchResults) {
        if (organisationSearchResult.length > 0 || locationSearchResults.length > 0) {
          const combinedResults = [...organisationSearchResult, ...locationSearchResults];
          const sortedResults = combinedResults.sort((a, b) => a.name.localeCompare(b.name));
          setSearchResults(sortedResults);
          setStep(Step.SearchResults);
        }
      }
    }, [step, organisationSearchResult, locationSearchResults]);

    return { step, searchResults, handleSearch };
  }

  export default useOrganisationLocationSearch;
