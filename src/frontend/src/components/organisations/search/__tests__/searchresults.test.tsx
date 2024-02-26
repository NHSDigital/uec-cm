import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchResults from "../searchresults";

describe('SearchResults', () => {

    it('should render a Label with the text "Search Results"', () => {
      render(<SearchResults results={[]} />);

      const searchResults = screen.getByTestId('search-results');
      expect(searchResults).toBeInTheDocument();

      const labelElement = screen.getByText('Search Results');
      expect(labelElement).toBeInTheDocument();
    });

    it('should render a message orgs and locations matching your search', () => {
      render(<SearchResults results={[]} />);

      const labelElement = screen.getByText('The following organisations or locations match your search.');
      expect(labelElement).toBeInTheDocument();
    });

    it('should handle cases where there is a search list', () => {
        const mockResults = [
          { id: '1', name: 'Organisation 1' },
          { id: '2', name: 'Organisation 2' },
          { id: '3', name: 'Organisation 3' },
        ];

        render(<SearchResults results={mockResults} />);

        const searchResultsList = screen.getByTestId('search-results-list');
        expect(searchResultsList).toBeInTheDocument();
        expect(searchResultsList.children.length).toBe(mockResults.length);
    });
});
