import React from 'react';
import { useNavigate } from 'react-router-dom';
import OrganisationsSearch from '../../components/organisations/search';
import NoResultsFound from '../../components/organisations/search/noresultsfound';
import SearchResults from '../../components/organisations/search/searchresults';
import useOrganisationLocationSearch, { Step } from '../../hooks/useOrganisationLocationSearch';
import { LocationOrganisation } from '../../services/api/interface';
import { getUrlWithApiParams } from '../../services/utilities';

const SearchOrganisationPage: React.FC = () => {
  const viewOrganisationUrl = '/organisations/view';
  const addOrganisationUrl = getUrlWithApiParams('/organisations/add');

  const { step, searchResults, handleSearch, getOrganisation } = useOrganisationLocationSearch();

  const navigate = useNavigate();

  const handleRowSelected = (row: LocationOrganisation) => {
    const organisation = getOrganisation(row.organisationId);

    if (organisation) {
      navigate(getUrlWithApiParams(`${viewOrganisationUrl}/${organisation.id}`), { state: { organisation } });
    }
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
