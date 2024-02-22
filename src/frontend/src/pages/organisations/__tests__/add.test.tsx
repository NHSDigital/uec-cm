import React from 'react';
import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import AddOrganisationPage from '../add';

beforeEach(() => {
  render(<AddOrganisationPage />);
});

describe('Add page', () => {

  it('renders the page component', () => {
    const label = screen.getByText('Data management');
    expect(label).toBeInTheDocument();

    const testid = screen.getByTestId('add-organisation-page');
    expect(testid).toBeInTheDocument();
  });

  it('renders the OrganisationsSearch component', () => {
    const testid = screen.getByTestId('organisation-search');
    expect(testid).toBeInTheDocument();
  });

  it('renders the NoResults component', async() => {
    const nameInput = screen.getByTestId('name-input');

    fireEvent.change(nameInput, { target: { value: '0' } });

    const searchButton = screen.getByTestId('search-button');
    fireEvent.click(searchButton);

    const testid = screen.getByTestId('no-results-found');
    expect(testid).toBeInTheDocument();
  });

  it('renders the Results component', async() => {
    const nameInput = screen.getByTestId('name-input');

    fireEvent.change(nameInput, { target: { value: 'adrian' } });

    const searchButton = screen.getByTestId('search-button');
    fireEvent.click(searchButton);

    const testid = screen.getByTestId('search-results');
    expect(testid).toBeInTheDocument();
  });
});
