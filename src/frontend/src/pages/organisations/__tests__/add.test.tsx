import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
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

  it('renders the OrganisationsSearch component', () => {
    render(<AddOrganisationPage  />);

    const testid = screen.getByTestId('organisation-search');
    expect(testid).toBeInTheDocument();
  });

  it('renders the NoResults component', () => {
    render(<AddOrganisationPage  />);

    const nameInput = screen.getByTestId('name-input');

    fireEvent.change(nameInput, { target: { value: 'adrian' } });

    const searchButton = screen.getByTestId('search-button');
    fireEvent.click(searchButton);

    const testid = screen.getByTestId('no-results-found');
    expect(testid).toBeInTheDocument();
  });
});
