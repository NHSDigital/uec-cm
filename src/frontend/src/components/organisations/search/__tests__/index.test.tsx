import React from 'react';
import { fireEvent, render, screen } from "@testing-library/react";
import OrganisationsSearch from "..";

describe('OrganisationsSearch', () => {

  it('should render the component without crashing', () => {
    render(<OrganisationsSearch />);
  });

  it('should display a page heading with the text "Organisation search"', () => {
    render(<OrganisationsSearch />);
    const pageHeading = screen.getByText('Organisation search');
    expect(pageHeading).toBeInTheDocument();
  });

  it('should display a label with the text "Search by either name, postcode or managing organisation"', () => {
    render(<OrganisationsSearch />);
    const searchBy = screen.getByTestId('search-by') ;
    expect(searchBy).toBeInTheDocument();
    expect(searchBy.textContent).toContain('Search by either name, postcode or managing organisation');
  });

  it('should accept and display characters in inputs', () => {
    render(<OrganisationsSearch />);
    const nameInput = screen.getByTestId('name-input') as HTMLInputElement;
    const postcodeInput = screen.getByTestId('postcode-input') as HTMLInputElement;
    const managingOrganisationInput = screen.getByTestId('managing-organisation-input') as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: 'adrian' } });
    fireEvent.change(postcodeInput, { target: { value: 'NG5 1AA' } });
    fireEvent.change(managingOrganisationInput, { target: { value: 'QMC' } });

    expect(nameInput.value).toBe('adrian');
    expect(postcodeInput.value).toBe('NG5 1AA');
    expect(managingOrganisationInput.value).toBe('QMC');
  });

  it('search button should be present', () => {
    render(<OrganisationsSearch />);

    const searchButton = screen.getByTestId('search-button');

    fireEvent.click(searchButton);

    expect(searchButton).toBeInTheDocument();
  });

  it('invalid postcode validation message', () => {
    render(<OrganisationsSearch />);

    const postcodeInput = screen.getByTestId('postcode-input') as HTMLInputElement;

    fireEvent.change(postcodeInput, { target: { value: 'zzzzz' } });

    const searchButton = screen.getByTestId('search-button');
    fireEvent.click(searchButton);

    expect(postcodeInput?.parentElement?.textContent?.includes('Enter a valid postcode')).toBeTruthy();
  });

  it('no postcode validation message with valid post code', () => {
    render(<OrganisationsSearch />);

    const postcodeInput = screen.getByTestId('postcode-input') as HTMLInputElement;

    fireEvent.change(postcodeInput, { target: { value: 'NG1 1AA' } });

    const searchButton = screen.getByTestId('search-button');
    fireEvent.click(searchButton);

    expect(postcodeInput?.parentElement?.textContent?.includes('Enter a valid postcode')).toBeFalsy();
  });

  it('no postcode validation message when nothing entered', () => {
    render(<OrganisationsSearch />);

    const postcodeInput = screen.getByTestId('postcode-input') as HTMLInputElement;

    const searchButton = screen.getByTestId('search-button');
    fireEvent.click(searchButton);

    expect(postcodeInput?.parentElement?.textContent?.includes('Enter a valid postcode')).toBeFalsy();
  });
});
