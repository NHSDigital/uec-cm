import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import App from './App';

describe('getStringNumericValue', () => {

  it('should render the header and footer when App is rendered', () => {
    render(
      <Router>
        <App />
      </Router>
    );

    const headerElement = screen.getByRole('banner');
    const footerElement = screen.getByTestId('footer');

    expect(headerElement).toBeInTheDocument();
    expect(footerElement).toBeInTheDocument();
  });

  it('should render the SearchOrganisationPage when navigating to "/organisations/search"', () => {
    render(
      <Router initialEntries={["/organisations/search"]}>
        <App />
      </Router>
    );

    const searchPageElement = screen.getByTestId('organisation-search-page');

    expect(searchPageElement).toBeInTheDocument();
  });
});

