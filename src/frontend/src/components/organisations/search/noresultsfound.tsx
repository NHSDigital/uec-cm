import React, { FormEvent, useState } from 'react';
import { Button, Label, Radios } from 'nhsuk-react-components';

const NoResultsFound: React.FC = () => {

    const [selectedOption, setSelectedOption] = useState('yes');

    const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.blur();
    }

    function handleOptionChange(e: FormEvent<HTMLInputElement>): void {
        setSelectedOption(e.currentTarget.value)
    }

    return (
        <div data-testid='no-results-found'>
            <Label isPageHeading={true} size='l'>No results found</Label>
            <div className='nhsuk-caption-m nhsuk-u-margin-bottom-8' data-testid='add-a-new-organisation'>Would you like to add a new organisation?</div>

            <Radios inline={true}>
                <Radios.Radio
                    data-testid='yes-radio'
                    aria-label="Yes"
                    value="yes"
                    checked={selectedOption === 'yes'}
                    onChange={handleOptionChange}>
                        Yes
                </Radios.Radio>
                <Radios.Radio
                    data-testid='no-radio'
                    aria-label="No"
                    value="no"
                    checked={selectedOption === 'no'}
                    onChange={handleOptionChange}>
                        No
                </Radios.Radio>
            </Radios>

            <Button onClick={handleNext} data-testid="next-button">Next</Button>
        </div>
    );
};

export default NoResultsFound;
