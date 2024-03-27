import React from 'react';
import { useLocation } from 'react-router-dom';
import { Label } from 'nhsuk-react-components';
import OrganisationSummary from '../../components/organisations/view/summary';
import { Organisation } from '../../services/api/interface';

const ViewOrganisationPage: React.FC = () => {
  const location = useLocation();
  const organisation = location.state.organisation as Organisation;

  return (
    <div data-testid='view-organisation-page' className="nhsuk-width-container nhsuk-u-margin-top-4">
        <Label isPageHeading={true} size='l'>Summary</Label>
        <Label size='m'>Organisation</Label>
        <OrganisationSummary organisation={organisation} />
    </div>
  );
};

export default ViewOrganisationPage;
