import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import OrganisationsSearch from "..";
import { MemoryRouter } from 'react-router-dom';

const getInputByDataTestId = (id: string): HTMLInputElement => {
  return screen.getByTestId(id) as HTMLInputElement;
};

describe('OrganisationsSearch', () => {

  const mockOnSearch = jest.fn();

  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <OrganisationsSearch onSearch={mockOnSearch} />
      </MemoryRouter>
    );
  });

  it('should display a page heading with the text "Organisation search"', () => {
    const pageHeading = screen.getByText('Organisation search');
    expect(pageHeading).toBeInTheDocument();
  });

  it('should display a label with the text "Search by either organisation location or postcode"', () => {
    const searchBy = getInputByDataTestId('search-by') ;
    expect(searchBy).toBeInTheDocument();
    expect(searchBy.textContent).toContain('Search by');
    expect(searchBy.textContent).toContain('organisation');
    expect(searchBy.textContent).toContain('location');
    expect(searchBy.textContent).toContain('postcode');
  });

  it('should accept and display characters in input field', async () => {
    const input = getInputByDataTestId('search-field-input');

    await userEvent.type(input, 'royal');

    expect(input.value).toBe('royal');
  });

  it('search button should be present', () => {
    const searchButton = getInputByDataTestId('search-button');
    expect(searchButton).toBeInTheDocument();
  });
});
