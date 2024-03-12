import React from 'react';
import PreviousPageLink from './previouspagelink';
import NextPageLink from './nextpagelink';
import ResultsInfo from './resultsinfo';

export interface PaginationProps {
    isFirstPage: boolean;
    isLastPage: boolean;
    firstItemShown: number;
    lastItemShown: number;
    totalResults: number;
    handlePreviousPage: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    handleNextPage: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    previousPageLabel?: string;
    nextPageLabel?: string;
}

const Pagination: React.FC<PaginationProps> = (
{
    isFirstPage,
    isLastPage,
    firstItemShown,
    lastItemShown,
    totalResults,
    handlePreviousPage,
    handleNextPage,
    previousPageLabel = 'Previous',
    nextPageLabel = 'Next',
}) => {
    return (
        <nav role="navigation" aria-label="Pagination" data-testid='pagination'>
            <ul className='pagination'>
                <li className="pagination-item--previous">
                    <PreviousPageLink
                        onClick={handlePreviousPage}
                        isFirstPage={isFirstPage}
                        label={previousPageLabel}
                    />
                </li>
                <li className="pagination-results">
                    <ResultsInfo
                        firstItemShown={firstItemShown}
                        lastItemShown={lastItemShown}
                        totalResults={totalResults}
                    />
                </li>
                <li className="pagination-item--next">
                    <NextPageLink
                        onClick={handleNextPage}
                        isLastPage={isLastPage}
                        label={nextPageLabel}
                    />
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
