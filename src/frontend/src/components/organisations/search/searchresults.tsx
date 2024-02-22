import React from 'react';
import { Label } from 'nhsuk-react-components';
import { Organisation } from '../../../services/api/api';

export interface SearchResultsProps {
    results: Organisation[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
    return (
        <div data-testid='search-results'>
            <Label isPageHeading={true} size='l'>Search Results</Label>
            <div className='nhsuk-caption-m nhsuk-u-margin-bottom-8' data-testid='add-a-new-organisation'>
                The following organisations or locations match your search.
                {results.map((result, index) => (
                    <div key={index}>{result.name}</div>
                ))}
            </div>
        </div>
    );
};

export default SearchResults;
