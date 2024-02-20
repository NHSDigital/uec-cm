import React from 'react';
import { fireEvent, render, screen } from "@testing-library/react";
import OrganisationsSearch from "..";

const nameErrorMessage = 'Enter a valid name';
const postcodeErrorMessage = 'Enter a valid postcode';
const organisationErrorMessage = 'Enter a valid managing organisation';

const getInputByDataTestId = (id: string): HTMLInputElement => {
  return screen.getByTestId(id) as HTMLInputElement;
};

const performSearch = () => {
  const searchButton = screen.getByTestId('search-button');
  fireEvent.click(searchButton);
};

const expectParentElementToInclude = (htmlElement : HTMLInputElement, errorMessage: string) => {
  expect(htmlElement?.parentElement?.textContent?.includes(errorMessage)).toBeTruthy();
};

const expectParentElementToNotInclude = (htmlElement : HTMLInputElement, errorMessage: string) => {
  expect(htmlElement?.parentElement?.textContent?.includes(errorMessage)).toBeFalsy();
};

const mockOnSearch = jest.fn();

beforeEach(() => {
  render(<OrganisationsSearch onSearch={mockOnSearch} />);
});

describe('OrganisationsSearch', () => {
  it('should display a page heading with the text "Organisation search"', () => {
    const pageHeading = screen.getByText('Organisation search');
    expect(pageHeading).toBeInTheDocument();
  });

  it('should display a label with the text "Search by either name, postcode or managing organisation"', () => {
    const searchBy = getInputByDataTestId('search-by') ;
    expect(searchBy).toBeInTheDocument();
    expect(searchBy.textContent).toContain('Search by either name, postcode or managing organisation');
  });

  it('should accept and display characters in inputs', () => {
    const nameInput = getInputByDataTestId('name-input');
    const postcodeInput = getInputByDataTestId('postcode-input');
    const managingOrganisationInput = getInputByDataTestId('managing-organisation-input');

    fireEvent.change(nameInput, { target: { value: 'adrian' } });
    fireEvent.change(postcodeInput, { target: { value: 'NG5 1AA' } });
    fireEvent.change(managingOrganisationInput, { target: { value: 'QMC' } });

    expect(nameInput.value).toBe('adrian');
    expect(postcodeInput.value).toBe('NG5 1AA');
    expect(managingOrganisationInput.value).toBe('QMC');
  });

  it('search button should be present', () => {
    const searchButton = getInputByDataTestId('search-button');
    expect(searchButton).toBeInTheDocument();
  });

  it('invalid name validation message', () => {
    const nameInput = getInputByDataTestId('name-input');

    fireEvent.change(nameInput, { target: { value: '%' } });
    performSearch();

    expectParentElementToInclude(nameInput, nameErrorMessage);
  });

  it('no name validation message with valid name', () => {
    const nameInput = getInputByDataTestId('name-input');

    fireEvent.change(nameInput, { target: { value: 'adrian' } });
    performSearch();

    expectParentElementToNotInclude(nameInput, nameErrorMessage);
  });

  it('no name validation message when nothing entered', () => {
    const nameInput = getInputByDataTestId('name-input');
    performSearch();

    expectParentElementToNotInclude(nameInput, nameErrorMessage);
  });

  it('invalid postcode validation message', () => {
    const postcodeInput = getInputByDataTestId('postcode-input');

    fireEvent.change(postcodeInput, { target: { value: 'zzzzz' } });
    performSearch();

    expectParentElementToInclude(postcodeInput, postcodeErrorMessage);
  });

  it('no postcode validation message with valid post code', () => {
    const postcodeInput = getInputByDataTestId('postcode-input');

    fireEvent.change(postcodeInput, { target: { value: 'NG1 1AA' } });
    performSearch();

    expectParentElementToNotInclude(postcodeInput, postcodeErrorMessage);
  });

  it('no organisation validation message when nothing entered', () => {
    const organisationInput = getInputByDataTestId('managing-organisation-input');
    performSearch();

    expectParentElementToNotInclude(organisationInput, organisationErrorMessage);
  });

  it('invalid organisation validation message', () => {
    const organisationInput = getInputByDataTestId('managing-organisation-input');

    fireEvent.change(organisationInput, { target: { value: '%' } });
    performSearch();

    expectParentElementToInclude(organisationInput, organisationErrorMessage);
  });

  it('no organisation validation message with valid name', () => {
    const organisationInput = getInputByDataTestId('managing-organisation-input');

    fireEvent.change(organisationInput, { target: { value: 'john' } });
    performSearch();

    expectParentElementToNotInclude(organisationInput, organisationErrorMessage);
  });

  it('no organisation validation message when nothing entered', () => {
    const organisationInput = getInputByDataTestId('managing-organisation-input');
    performSearch();

    expectParentElementToNotInclude(organisationInput, organisationErrorMessage);
  });

  it('error summary shown when no search criteria entered', () => {
    performSearch();

    const errorSummary = getInputByDataTestId('error-summary');
    expect(errorSummary).toBeInTheDocument();
  });

  it('error summary not shown when search criteria entered', () => {
    const organisationInput = getInputByDataTestId('managing-organisation-input');

    fireEvent.change(organisationInput, { target: { value: 'adrian' } });

    performSearch();

    const errorSummary = screen.queryByTestId('error-summary');
    expect(errorSummary).not.toBeInTheDocument();
  });

  it('onSearch function has been called with nane', () => {
    const nameInput = getInputByDataTestId('name-input');

    fireEvent.change(nameInput, { target: { value: 'my name' } });

    performSearch();

    expect(mockOnSearch).toHaveBeenCalledWith('my name', '', '');
  });

  it('onSearch function has been called with postcode', () => {
    const postcodeInput = getInputByDataTestId('postcode-input');

    fireEvent.change(postcodeInput, { target: { value: 'NG1 1AA' } });

    performSearch();

    expect(mockOnSearch).toHaveBeenCalledWith('', 'NG1 1AA', '');
  });

  it('onSearch function has been called with organisation', () => {
    const organisationInput = getInputByDataTestId('managing-organisation-input');

    fireEvent.change(organisationInput, { target: { value: 'adrian' } });

    performSearch();

    expect(mockOnSearch).toHaveBeenCalledWith('', '', 'adrian');
  });
});
