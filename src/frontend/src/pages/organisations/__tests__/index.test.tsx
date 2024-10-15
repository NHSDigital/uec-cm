import { render, screen } from '@testing-library/react';
import OrganisationsPage from '..';
import { searchUrl } from '../cards';

beforeEach(() => {
  render(<OrganisationsPage />);
});

describe('Organisations page', () => {

  it('should render the banner', () => {
    expect(screen.getByText('Organisations')).toBeInTheDocument();
    expect(screen.getByText('If you wish to add a new entry, first search to check it does not already exist')).toBeInTheDocument();
  });

  it('should render the cards', () => {
    const cardGroup = screen.getByTestId('card-group');
    expect(cardGroup).toBeInTheDocument();
  });

  it('should render the search card and searchUrl', () => {
    const searchCardLink = screen.getByTestId('search-card-link');
    expect(searchCardLink).toHaveAttribute('href', searchUrl);
  });
});
