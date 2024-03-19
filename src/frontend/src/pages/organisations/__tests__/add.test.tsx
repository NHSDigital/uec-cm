import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddOrganisationPage from '../add';
import { JSX } from 'react/jsx-runtime';


const renderWithRouter = (ui: JSX.Element, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, { wrapper: Router });
};

beforeEach(() => {
  renderWithRouter(<AddOrganisationPage />);
});


describe('AddOrganisationPage', () => {
    it('should render the page component', () => {
    const testid = screen.getByTestId('add-organisation-page');
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
