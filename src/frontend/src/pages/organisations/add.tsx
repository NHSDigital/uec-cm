import React from 'react';
import OrganisationsSearch from '../../components/organisations/search';
import NoResultsFound from '../../components/organisations/search/noresultsfound';
import SearchResults from '../../components/organisations/search/searchresults';
import useOrganisationLocationSearch, { Step } from '../../hooks/useOrganisationLocationSearch';

const AddOrganisationPage: React.FC = () => {
  const { step, searchResults, handleSearch } = useOrganisationLocationSearch();

  return (
    <div data-testid='add-organisation-page' className="nhsuk-width-container nhsuk-u-margin-top-4" >
      <span className="nhsuk-caption-m">Data management</span>
      {step === Step.OrganisationsSearch && <OrganisationsSearch onSearch={handleSearch} />}
      {step === Step.NoResultsFound && <NoResultsFound />}
      {step === Step.SearchResults && <SearchResults results={searchResults} />}
    </div>
  );
};

export default AddOrganisationPage;
