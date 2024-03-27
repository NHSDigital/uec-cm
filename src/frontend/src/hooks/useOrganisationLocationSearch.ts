import { useState, useEffect } from 'react';
import useOrganisationSearch from './useOrganisationSearch';
import useLocationSearch from './useLocationSearch';
import { LocationOrganisation, Location, Organisation } from '../services/api/interface';

export enum Step {
    OrganisationsSearch,
    Searching,
    NoResultsFound,
    SearchResults
}

const useOrganisationLocationSearch = () => {
    const [step, setStep] = useState(Step.OrganisationsSearch);
    const [organisationSearchResult, organisationSearch] = useOrganisationSearch();
    const [locationSearchResults, locationSearch] = useLocationSearch();
    const [searchResults, setSearchResults] = useState<LocationOrganisation[]>([]);
    const [allOrganisationSearchResult, allOrganisationSearch] = useOrganisationSearch();

    const handleSearch = (searchField : string) => {
      Promise.all([organisationSearch(searchField, '', ''), locationSearch(searchField, '', '')])
        .then(() => {
          setStep(Step.Searching);
        })

        allOrganisationSearch('', '', '');
    };

    const getOrganisation = (organisationId?: string) : Organisation | undefined => {
      const organisation = organisationSearchResult.find(org => org.id === organisationId);

      if (organisation) {
        return organisation;
      }

      return allOrganisationSearchResult.find(org => org.id === organisationId);
    };

    const addLocationEntityType = (results: Location[]) => results.map(result => ({
      ...result,
      entityType : "location" as const,
      organisationId: result.managingOrganization
    }));

    const addOrganisationEntityType = (results: Organisation[]) => results.map(result => ({
      ...result,
      entityType : "organisation" as const,
      organisationId: result.id
    }));

    const combineAndSortResults = (organisationResults: Organisation[], locationResults: Location[]) => {
      const combinedResults = [...organisationResults, ...locationResults];
      return combinedResults.sort((a, b) => a.name.localeCompare(b.name));
    };

    useEffect(() => {
      if (organisationSearchResult.length > 0 || locationSearchResults.length > 0) {
        const organisationResultsWithEntityType = addOrganisationEntityType(organisationSearchResult);
        const locationResultsWithEntityType = addLocationEntityType(locationSearchResults);

        const sortedResults = combineAndSortResults(organisationResultsWithEntityType, locationResultsWithEntityType);
        setSearchResults(sortedResults);
        setStep(Step.SearchResults);
      } else if (step === Step.Searching){
        setStep(Step.NoResultsFound);
      }
    }, [step, organisationSearchResult, locationSearchResults]);

    return { step, searchResults, organisationSearchResult, handleSearch, getOrganisation };
}

export default useOrganisationLocationSearch;
