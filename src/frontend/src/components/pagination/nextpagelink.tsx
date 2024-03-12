import React from 'react';
import { ChevronRightIcon } from "nhsuk-react-components";
import './styles.css';

const NextPageLink: React.FC<{
    onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void,
    isLastPage: boolean,
    label: string
  }> = ({ onClick, isLastPage, label }) => (

    !isLastPage ? (
        <span className="centered-container">
            <a href="/"
                role="button"
                onClick={onClick}
                data-testid='next-link'
                className='nhsuk-caption-m'
                aria-label={`Go to ${label}`}>
                {label}
            </a>
            <ChevronRightIcon />
        </span>
    ) : (
        <span className='centered-container disabled' data-testid='next-link' aria-hidden="true">
            {label}
            <ChevronRightIcon className='nhsuk-icon__emdash' />
        </span>
    )
);

export default NextPageLink;
