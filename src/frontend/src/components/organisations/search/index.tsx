import React, { useState } from 'react';
import { Button, Input, Label } from 'nhsuk-react-components';

const OrganisationsSearch: React.FC = () => {

    const [name, setName] = useState('');
    const [postCode, setPostCode] = useState('');
    const [organisation, setOrganisation] = useState('');

    const handleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.blur();
    }

    return (
        <div data-testid='organisation-search'>
            <Label isPageHeading={true} size='l'>Organisation search</Label>
            <div className='nhsuk-u-margin-bottom-3' data-testid='search-by'>Search by <strong>either</strong> name, postcode or managing organisation.</div>

            <Input
                label="Name"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                aria-label="Name"
                data-testid="name-input"
                width={20}
            />

            <div className='nhsuk-u-margin-bottom-2'>Or</div>

            <Input
                label="Postcode"
                value={postCode}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPostCode(e.target.value)}
                aria-label="Postcode"
                data-testid="postcode-input"
                width={10}
            />

            <div className='nhsuk-u-margin-bottom-2'>Or</div>

            <Input
                label="Managing organisation"
                value={organisation}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOrganisation(e.target.value)}
                aria-label="Managing organisation"
                data-testid="managing-organisation-input"
                width={20}
            />

            <Button onClick={handleSearch} data-testid="search-button">Search</Button>
        </div>
    );
};

export default OrganisationsSearch;
