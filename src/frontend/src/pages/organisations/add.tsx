import React from 'react';
import { Label } from 'nhsuk-react-components';

const AddOrganisationPage: React.FC = () => {

  return (
    <div data-testid='add-organisation-page' className="nhsuk-width-container nhsuk-u-margin-top-4" >
      <Label isPageHeading={true} size='l'>Add a new organisation (e.g. Trust)</Label>
    </div>
  );
};

export default AddOrganisationPage;
