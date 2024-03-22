import React from 'react';
import OrganisationsSearch from '../../components/organisations/search';
import NoResultsFound from '../../components/organisations/search/noresultsfound';
import SearchResults from '../../components/organisations/search/searchresults';
import useOrganisationLocationSearch, { Step } from '../../hooks/useOrganisationLocationSearch';
import { useNavigate } from 'react-router-dom';

const SearchOrganisationPage: React.FC = () => {
  const addOrganisationUrl = '/organisations/add';

  const { step, searchResults, handleSearch } = useOrganisationLocationSearch();

  const navigate = useNavigate();

  const handleRowSelected = (id: string, entityType: string | undefined) => {
    navigate(`/${entityType}/${id}`);
  };

  const handleAddOrganisation = () => {
    navigate(addOrganisationUrl);
  };

  return (
    <div data-testid='organisation-search-page' className="nhsuk-width-container nhsuk-u-margin-top-4" >
      {step === Step.OrganisationsSearch && <OrganisationsSearch onSearch={handleSearch} />}
      {step === Step.NoResultsFound && <NoResultsFound onAddOrganisation={handleAddOrganisation} />}
      {step === Step.SearchResults && <SearchResults
                                        results={searchResults}
                                        handleRowSelected={handleRowSelected}
                                        addOrganisationUrl={addOrganisationUrl}
                                      /> }
    </div>
  );
};

export default SearchOrganisationPage;
