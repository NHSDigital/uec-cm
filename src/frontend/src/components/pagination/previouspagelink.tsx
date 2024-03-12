import React from 'react';
import { ChevronLeftIcon } from "nhsuk-react-components";
import './styles.css';

const PreviousPageLink: React.FC<{
    onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void,
    isFirstPage: boolean,
    label: string
  }> = ({ onClick, isFirstPage, label }) => (

    !isFirstPage ? (
        <span className="centered-container">
            <ChevronLeftIcon />
            <a href="/"
                role="button"
                onClick={onClick}
                data-testid='previous-link'
                className='nhsuk-caption-m'
                aria-label={`Go to ${label}`}>
                {label}
            </a>
        </span>
    ) : (
        <span className='centered-container disabled' data-testid='previous-link' aria-hidden="true">
            <ChevronLeftIcon className='nhsuk-icon__emdash' />
            {label}
        </span>
    )
);

export default PreviousPageLink;
