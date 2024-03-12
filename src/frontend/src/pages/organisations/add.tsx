import React from 'react';
import OrganisationsSearch from '../../components/organisations/search';
import NoResultsFound from '../../components/organisations/search/noresultsfound';
import SearchResults from '../../components/organisations/search/searchresults';
import useOrganisationLocationSearch, { Step } from '../../hooks/useOrganisationLocationSearch';
import { useNavigate } from 'react-router-dom';

const AddOrganisationPage: React.FC = () => {
  const { step, searchResults, handleSearch } = useOrganisationLocationSearch();

  const navigate = useNavigate();

  const handleRowSelected = (id: string, entityType: string | undefined) => {
    navigate(`/${entityType}/${id}`);
  };

  return (
    <div data-testid='add-organisation-page' className="nhsuk-width-container nhsuk-u-margin-top-4" >
      {step === Step.OrganisationsSearch && <OrganisationsSearch onSearch={handleSearch} />}
      {step === Step.NoResultsFound && <NoResultsFound />}
      {step === Step.SearchResults && <SearchResults results={searchResults} handleRowSelected={handleRowSelected} />}
    </div>
  );
};

export default AddOrganisationPage;
