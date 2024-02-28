import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddOrganisationPage from '../add';

beforeEach(() => {
  render(<AddOrganisationPage />);
});

describe('AddOrganisationPage', () => {
    it('should render the page component', () => {
    const label = screen.getByText('Data management');
    expect(label).toBeInTheDocument();
    const testid = screen.getByTestId('xxadd-organisation-page');
    expect(testid).toBeInTheDocument();
  });

  it('should render the OrganisationsSearch component', () => {
    const testid = screen.getByTestId('organisation-search');
    expect(testid).toBeInTheDocument();
  });

  it('should render the NoResults component', async() => {

    act(() => {
      const nameInput = screen.getByTestId('name-input');
      fireEvent.change(nameInput, { target: { value: '0' } });
      const searchButton = screen.getByTestId('search-button');
      userEvent.click(searchButton);
    });

    await waitFor(() => {
      const searchResults = screen.getByTestId('no-results-found');
      expect(searchResults).toBeInTheDocument();
    });
  });

  it('should render the Results component', async() => {
    act(() => {
      const nameInput = screen.getByTestId('name-input');
      fireEvent.change(nameInput, { target: { value: 'adrian' } });
      const searchButton = screen.getByTestId('search-button');
      userEvent.click(searchButton);
    });

    await waitFor(() => {
      const searchResults = screen.getByTestId('search-results');
      expect(searchResults).toBeInTheDocument();
    });
  });
});
