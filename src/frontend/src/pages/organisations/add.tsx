import React from 'react';
import { Label } from 'nhsuk-react-components';
import AddOrganisation from '../../components/organisations/add';

const AddOrganisationPage: React.FC = () => {

  const handleCreateOrganisation = (organisationName: string, organisationType: string) => {
    // handle create organisation logic
    console.log(organisationName, organisationType);
  };

  return (
    <div data-testid='add-organisation-page' className="nhsuk-width-container nhsuk-u-margin-top-4" >
      <Label isPageHeading={true} size='l'>Add a new organisation (e.g. Trust)</Label>
      <AddOrganisation onCreateOrganisation={handleCreateOrganisation} />
    </div>
  );
};

export default AddOrganisationPage;
