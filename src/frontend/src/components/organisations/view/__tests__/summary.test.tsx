import React from 'react';
import { render, screen } from "@testing-library/react";
import { Organisation } from "../../../../services/api/interface";
import OrganisationSummary from "../summary";

describe('view organisation page', () => {
  it('should render OrganisationSummary component with organisation prop', () => {
      const organisation: Organisation = {
          id: '123',
          resourceType: 'organization',
          type: 'Test',
          name: 'Test Organisation',
          active: '',
          Address: [],
          createdBy: '',
          createdDateTime: '',
          modifiedBy: '',
          modifiedDateTime: '',
          identifier: {
              type: '',
              use: '',
              value: ''
          }
      };

      render(<OrganisationSummary organisation={organisation} />);
      expect(screen.getByTestId('organisation-summary')).toBeInTheDocument();
      expect(screen.getByTestId('organisation-name')).toHaveTextContent('Test Organisation');
  });
});
