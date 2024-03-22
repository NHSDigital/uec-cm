import React, { useEffect } from 'react';
import { Label, Table } from 'nhsuk-react-components';
import { LocationOrganisation } from '../../../services/api/interface';
import usePagination from '../../../hooks/usePagination';
import RightChevronIcon from '../../images/rightchevron';
import Pagination from '../../pagination';
import './styles.css';

export interface SearchResultsProps {
    results: LocationOrganisation[];
    handleRowSelected: (id: string, entityType: string | undefined) => void;
    addOrganisationUrl: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, handleRowSelected, addOrganisationUrl }) => {
    const showPagination = results.length > 10;
    const itemsPerPage = 10;
    const {
        firstItemShown,
        lastItemShown,
        filteredResults,
        setFilteredResults,
        isFirstPage,
        isLastPage,
        handlePreviousPage,
        handleNextPage,
    } = usePagination(results, itemsPerPage);

    const handleKeyDown = (event: React.KeyboardEvent, row: LocationOrganisation) => {
        if (event.key === 'Enter' || event.key === ' ') {
            handleRowSelected(row.id, row.entityType);
        }
    };

    useEffect(() => {
        setFilteredResults(results.slice(firstItemShown - 1, lastItemShown));
    }, [results, firstItemShown, lastItemShown, setFilteredResults]);

    const EntityTypeBox: React.FC<{ entityType: string | undefined, index: number }> = ({ entityType, index }) => (
        <Table.Cell data-testid={`search-row-${index}-${entityType}`} className='first-column'>
            {entityType === 'organisation' && (
                <div className='organisation-box' data-testid={`search-row-${index}-organisation-box`}>
                    ORGANISATION
                </div>
            )}
            {entityType === 'location' && (
                <div className='location-box' data-testid={`search-row-${index}-location-box`}>
                    LOCATION
                </div>
            )}
        </Table.Cell>
    );

    const TableRow = ({ row, index }: { row: LocationOrganisation; index: number }) => (
        <Table.Row key={index} data-testid={`search-row-${index}`} aria-label={`View details for ${row.name}`}>
            <EntityTypeBox entityType={row.entityType} index={index} />
            <Table.Cell data-testid={`search-row-${index}-name`} className='second-column'>
                <div
                    className="details nhsuk-u-padding-left-4"
                    onClick={() => handleRowSelected(row.id, row.entityType)}
                    onKeyDown={(event) => handleKeyDown(event, row)}
                    tabIndex={0}
                    role="button"
                    aria-label={`Select ${row.name} for details`}
                    data-testid={`search-row-${index}-link`}
                >
                    <span>
                        {row.entityType === 'organisation' && (
                            row.name
                        )}

                        {row.entityType === 'location' && (
                            `${row.name} - ${row.Address[0].city} ${row.Address[0].postalCode}`
                        )}
                    </span>
                    <span className='nhsuk-u-margin-top-2 nhsuk-u-margin-right-4'>
                        <RightChevronIcon />
                    </span>
                </div>
            </Table.Cell>
        </Table.Row>
    );

    return (
        <div data-testid='search-results'>
            <Label isPageHeading={true} size='l'>Search Results</Label>
            <div className='nhsuk-caption-m nhsuk-u-margin-bottom-4' data-testid='search-results-list'>
                The following Organisations or Locations match your search.
            </div>

            <Table responsive>
                <Table.Body data-testid='search-results-table-body'>
                {filteredResults.map((row, index) => (
                    <TableRow key={index} row={row} index={index} />
                ))}
                </Table.Body>
            </Table>

            {showPagination && (
                <div className='nhsuk-u-padding-top-4'>
                    <Pagination
                        isFirstPage={isFirstPage}
                        isLastPage={isLastPage}
                        handlePreviousPage={handlePreviousPage}
                        handleNextPage={handleNextPage}
                        firstItemShown={firstItemShown}
                        lastItemShown={lastItemShown}
                        totalResults={results.length}
                    />
                </div>
            )}

            <div className='nhsuk-u-padding-bottom-8'>
                <div className='nhsuk-caption-m nhsuk-u-margin-top-2 nhsuk-u-padding-3 white-on-blue add-item-details'>
                    <span className='nhsuk-u-padding-right-2'>If the organisation or location you are searching for is not shown, you can</span>
                    <a href={addOrganisationUrl} data-testid='add-new-item-link' className='nhsuk-caption-m white-on-blue underlined'>add a new item</a>
                </div>
            </div>
        </div>
    );
};

export default SearchResults;
