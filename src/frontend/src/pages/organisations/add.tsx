import React, { useState } from 'react';
import OrganisationsSearch from '../../components/organisations/search';
import NoResultsFound from '../../components/organisations/search/noresultsfound';

enum Step {
    OrganisationsSearch,
    NoResultsFound,
}

const AddOrganisationPage: React.FC = () => {

    const [step, setStep] = useState(Step.OrganisationsSearch);

    const handleSearch = (name: string, postCode: string, organization: string) => {
        setStep(Step.NoResultsFound);
    };

    return (
        <div data-testid='add-organisation-page' className="nhsuk-width-container nhsuk-u-margin-top-4" >
            <span className="nhsuk-caption-m">Data management</span>
            {step === Step.OrganisationsSearch && <OrganisationsSearch onSearch={handleSearch} />}
            {step === Step.NoResultsFound && <NoResultsFound />}
        </div>
    );
};

export default AddOrganisationPage;
