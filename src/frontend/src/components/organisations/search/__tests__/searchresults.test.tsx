import React from 'react';
import { act, render, screen } from '@testing-library/react';
import SearchResults from "../searchresults";
import { LocationOrganisation } from '../../../../services/api/interface';
import userEvent from '@testing-library/user-event';

const handleRowSelected = jest.fn();

const mockResults: LocationOrganisation[] = [
  {
    "id": "3081762637274642",
    "active": "true",
    "Address": [
        {
        "city": "London",
        "country": "England",
        "line": [
        "C/O Nhs England",
        "1st Floor, My House",
        "The Hill"
        ],
        "postalCode": "XX1 1XX"
        }
    ],
    "createdBy": "Admin",
    "createdDateTime": "06-02-2024 11:24:35",
    "modifiedBy": "Admin",
    "modifiedDateTime": "06-02-2024 11:24:35",
    "name": "London Mock Location 1",
    "entityType": "location"
  },
  {
    "id": "3081762637274642",
    "active": "true",
    "Address": [
        {
        "city": "London",
        "country": "England",
        "line": [
        "C/O Nhs England",
        "1st Floor, My House",
        "The Hill"
        ],
        "postalCode": "XX1 1XX"
        }
    ],
    "createdBy": "Admin",
    "createdDateTime": "06-02-2024 11:24:35",
    "modifiedBy": "Admin",
    "modifiedDateTime": "06-02-2024 11:24:35",
    "name": "London Mock Organisation 1",
    "entityType": "organisation"
  },
  {
    "id": "3081762637274642",
    "active": "true",
    "Address": [
        {
        "city": "London",
        "country": "England",
        "line": [
        "C/O Nhs England",
        "1st Floor, My House",
        "The Hill"
        ],
        "postalCode": "XX1 1XX"
        }
    ],
    "createdBy": "Admin",
    "createdDateTime": "06-02-2024 11:24:35",
    "modifiedBy": "Admin",
    "modifiedDateTime": "06-02-2024 11:24:35",
    "name": "London Mock Location 1",
    "entityType": "location"
  },
];

describe('SearchResults', () => {

    it('should render a Label with the text "Search Results"', () => {
      render(<SearchResults results={[]} handleRowSelected={handleRowSelected} />);

      const searchResults = screen.getByTestId('search-results');
      expect(searchResults).toBeInTheDocument();

      const labelElement = screen.getByText('Search Results');
      expect(labelElement).toBeInTheDocument();
    });

    it('should render a message orgs and locations matching your search', () => {
      render(<SearchResults results={[]} handleRowSelected={handleRowSelected} />);

      const labelElement = screen.getByText('The following Organisations or Locations match your search.');
      expect(labelElement).toBeInTheDocument();
    });

    it('should handle cases where there is a search list', () => {
      render(<SearchResults results={mockResults} handleRowSelected={handleRowSelected} />);

      const searchResultsList = screen.getByTestId('search-results-list');
      expect(searchResultsList).toBeInTheDocument();

      const searchResultsTableBody = screen.getByTestId('search-results-table-body');
      expect(searchResultsTableBody).toBeInTheDocument();
      expect(searchResultsTableBody.children.length).toBe(mockResults.length);
    });

    it('should handle pagination not being there for less than 11 rows', () => {
      render(<SearchResults results={mockResults} handleRowSelected={handleRowSelected} />);
      const searchResultsList = screen.queryByTestId('pagination');
      expect(searchResultsList).not.toBeInTheDocument();
    });

    it('should handle pagination being there for more than 10 rows', () => {
      const newMockResults = Array(5).fill([...mockResults]).flat();

      render(<SearchResults results={newMockResults} handleRowSelected={handleRowSelected} />);

      const searchResultsList = screen.getByTestId('pagination');
      expect(searchResultsList).toBeInTheDocument();
    });

    it('should handle handleRowSelected being called', () => {
      render(<SearchResults results={mockResults} handleRowSelected={handleRowSelected} />);

      const link = screen.getByTestId('search-row-1-link');
      expect(link).toBeInTheDocument();

      act(() => {
        userEvent.click(link);
      });

      expect(handleRowSelected).toHaveBeenCalled();
    });

    it('should handle handleRowSelected by keypress', () => {
      render(<SearchResults results={mockResults} handleRowSelected={handleRowSelected} />);

      const link = screen.getByTestId('search-row-1-link');
      expect(link).toBeInTheDocument();

      act(() => {
        userEvent.type(link, '{Enter}');
      });

      expect(handleRowSelected).toHaveBeenCalled();
    });
});
