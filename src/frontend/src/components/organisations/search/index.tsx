import React, { useState } from 'react';
import { Button, Input, Label } from 'nhsuk-react-components';
import usePostcodeValidator from '../../../hooks/usePostcodeValidator';

const OrganisationsSearch: React.FC = () => {

    const [name, setName] = useState('');
    const [postCode, setPostCode] = useState('');
    const [organisation, setOrganisation] = useState('');
    const [isValidPostcode, validatePostcode ] = usePostcodeValidator();

    const handleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.blur();

        validatePostcode(postCode, true);
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
            <div className='nhsuk-u-margin-bottom-3' data-testid='search-by'>Search by <strong>either</strong> name, postcode or managing organisation.</div>

            <Input
                label="Name"
                name='name'
                value={name}
                onChange={handleInputChange}
                aria-label="Name"
                data-testid="name-input"
                width={20}
            />

            <div className='nhsuk-u-margin-bottom-2'>Or</div>

            <Input
                label="Postcode"
                name='postcode'
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
                value={organisation}
                onChange={handleInputChange}
                aria-label="Managing organisation"
                data-testid="managing-organisation-input"
                width={20}
            />

            <Button onClick={handleSearch} data-testid="search-button">Search</Button>
        </div>
    );
};

export default OrganisationsSearch;
