import React from 'react';
import OrganisationsSearch from '../../components/organisations/search';

const AddOrganisationPage: React.FC = () => {

    return (
        <div data-testid='add-organisation-page' className="nhsuk-width-container nhsuk-u-margin-top-4" >
            <span className="nhsuk-caption-m">Data management</span>
            <OrganisationsSearch />
        </div>
    );
};

export default AddOrganisationPage;
