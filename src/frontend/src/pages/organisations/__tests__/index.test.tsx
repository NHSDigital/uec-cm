import React from 'react';
import { render, screen } from '@testing-library/react';
import OrganisationsPage from '..';
import { addUrl } from '../cards';

describe('Organisations page', () => {

  it('should render the component without crashing', () => {
    render(<OrganisationsPage />);
  });

  it('renders the banner', () => {
    render(<OrganisationsPage />);

    expect(screen.getByText('Organisations')).toBeInTheDocument();
    expect(screen.getByText('Data management')).toBeInTheDocument();
    expect(screen.getByText('What would you like to do?')).toBeInTheDocument();
  });

  it('renders the cards', () => {
    render(<OrganisationsPage />);

    const cardGroup = screen.getByTestId('card-group');
    expect(cardGroup).toBeInTheDocument();
  });

  it('renders the addUrl function', () => {
    render(<OrganisationsPage />);

    const addCardLink = screen.getByTestId('add-card-link');
    expect(addCardLink).toHaveAttribute('href', addUrl);
  });
});
