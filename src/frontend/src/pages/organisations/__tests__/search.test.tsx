import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { JSX } from 'react/jsx-runtime';
import SearchOrganisationPage from '../search';

const renderWithRouter = (ui: JSX.Element, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, { wrapper: Router });
};

beforeEach(() => {
  renderWithRouter(<SearchOrganisationPage />);
});

describe('SearchOrganisationPage', () => {
    it('should render the search organisation page', () => {
    const testid = screen.getByTestId('organisation-search-page');
    expect(testid).toBeInTheDocument();
  });

  it('should render the OrganisationsSearch component', () => {
    const testid = screen.getByTestId('organisation-search');
    expect(testid).toBeInTheDocument();
  });

  it('should render the NoResults component', async() => {
    act(() => {
      const input = screen.getByTestId('search-field-input');
      userEvent.type(input, '000');
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
      const input = screen.getByTestId('search-field-input');
      userEvent.type(input, 'adrian');
      const searchButton = screen.getByTestId('search-button');
      userEvent.click(searchButton);
    });

    await waitFor(() => {
      const searchResults = screen.getByTestId('search-results');
      expect(searchResults).toBeInTheDocument();
    });
  });
});
