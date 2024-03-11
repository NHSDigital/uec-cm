import React from 'react';
import { Label } from 'nhsuk-react-components';
import { LocationOrganisation } from '../../../services/api/interface';

export interface SearchResultsProps {
    results: LocationOrganisation[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
    return (
        <div data-testid='search-results'>
            <Label isPageHeading={true} size='l'>Search Results</Label>
            <div className='nhsuk-caption-m nhsuk-u-margin-bottom-8' data-testid='search-results-list'>
                The following organisations or locations match your search.
                {results.map((result, index) => (
                    <div key={index}>{result.name}</div>
                ))}
            </div>
        </div>
    );
};

export default SearchResults;
