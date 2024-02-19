import React, { useState } from 'react';
import { Button, ErrorSummary, Input, Label } from 'nhsuk-react-components';
import usePostcodeValidator from '../../../hooks/usePostcodeValidator';
import useNameValidator from '../../../hooks/useNameValidator';

export interface OrganisationsSearchProps {
    onSearch: (name: string, postCode: string, organisation: string) => void;
}

const OrganisationsSearch: React.FC<OrganisationsSearchProps> = ({ onSearch }) => {

    const [name, setName] = useState('');
    const [postCode, setPostCode] = useState('');
    const [organisation, setOrganisation] = useState('');
    const [isValidName, validateName] = useNameValidator();
    const [isValidPostcode, validatePostcode ] = usePostcodeValidator();
    const [isValidOrganisation, validateOrganisation] = useNameValidator();
    const [showErrorSummary, setShowErrorSummary ] = useState(false);

    const handleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.blur();

        setShowErrorSummary(false);

        const isNameValid = validateName(name, true);
        const isPostcodeValid = validatePostcode(postCode, true);
        const isOrganisationValid = validateOrganisation(organisation, true);

        if (name.length === 0 && postCode.length === 0 && organisation.length === 0) {
            setShowErrorSummary(true);
        }

        else if ((name && (postCode || organisation)) ||
            (postCode && (name || organisation)) ||
            (organisation && (name || postCode))) {
            setShowErrorSummary(true);
        }

        else if (isNameValid && isPostcodeValid && isOrganisationValid) {
            onSearch(name, postCode, organisation);
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        switch(event.target.name){
            case 'name':
                setName(event.target.value);
                break;

            case 'postcode':
                setPostCode(event.target.value);
                break;

            case 'organisation':
                setOrganisation(event.target.value);
                break;
        }
    };

    return (
        <div data-testid='organisation-search'>
            <Label isPageHeading={true} size='l'>Organisation search</Label>

            {showErrorSummary && (
                    <ErrorSummary data-testid='error-summary' aria-labelledby="error-summary-title" role="alert" tabIndex={-1}>
                        <ErrorSummary.Title data-testid='error-summary-title' id="error-summary-title">There is a problem</ErrorSummary.Title>
                        <ErrorSummary.Body>
                            <p className='nhsuk-error-summary__list' data-testid='error-summary-message'>
                                Search by <strong>either</strong>
                            </p>

                            <ErrorSummary.List>
                                <ErrorSummary.Item href="#name" data-testid='error-summary-name-link'>
                                    name
                                </ErrorSummary.Item>
                                <ErrorSummary.Item href="#postcode" data-testid='error-summary-postcode-link'>
                                    postcode
                                </ErrorSummary.Item>
                                <ErrorSummary.Item href="#organisation" data-testid='error-summary-organisation-link'>
                                    managing organisation
                                </ErrorSummary.Item>
                            </ErrorSummary.List>
                        </ErrorSummary.Body>
                    </ErrorSummary>
                )
            }

            <div className='nhsuk-u-margin-bottom-3' data-testid='search-by'>Search by <strong>either</strong> name, postcode or managing organisation.</div>

            <Input
                label="Name"
                name='name'
                id='name'
                value={name}
                onChange={handleInputChange}
                error={isValidName ? "" : "Enter a valid name"}
                errorProps={{ id : 'name-error-message' }}
                aria-label="Name"
                data-testid="name-input"
                width={20}
            />

            <div className='nhsuk-u-margin-bottom-2'>Or</div>

            <Input
                label="Postcode"
                name='postcode'
                id='postcode'
                value={postCode}
                onChange={handleInputChange}
                error={isValidPostcode ? "" : "Enter a valid postcode"}
                errorProps={{ id : 'postcode-error-message' }}
                aria-label="Postcode"
                data-testid="postcode-input"
                width={10}
            />

            <div className='nhsuk-u-margin-bottom-2'>Or</div>

            <Input
                label="Managing organisation"
                name='organisation'
                id='organisation'
                value={organisation}
                onChange={handleInputChange}
                error={isValidOrganisation ? "" : "Enter a valid managing organisation"}
                errorProps={{ id : 'organisation-error-message' }}
                aria-label="Managing organisation"
                data-testid="managing-organisation-input"
                width={20}
            />

            <Button onClick={handleSearch} data-testid="search-button">Search</Button>
        </div>
    );
};

export default OrganisationsSearch;
