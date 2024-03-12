import React from 'react';

interface ResultsInfoProps {
  firstItemShown: number;
  lastItemShown: number;
  totalResults: number;
}

const ResultsInfo: React.FC<ResultsInfoProps> = ({ firstItemShown, lastItemShown, totalResults }) => {
  return (
    <p data-testid='results-info'>
      Showing <strong data-testid='first-item-shown'>{firstItemShown}</strong> to <strong data-testid='last-item-shown'>{lastItemShown}</strong> of <span data-testid='total-results'>{totalResults}</span> results
    </p>
  );
};

export default ResultsInfo;
