import React from 'react';
import { render, screen } from '@testing-library/react';
import AddOrganisationPage from '../add';

describe('Add page', () => {

  it('should render the component without crashing', () => {
    render(<AddOrganisationPage />);
  });

  it('renders the page component', () => {
    render(<AddOrganisationPage  />);

    const label = screen.getByText('Data management');
    expect(label).toBeInTheDocument();

    const testid = screen.getByTestId('add-organisation-page');
    expect(testid).toBeInTheDocument();
  });
});
