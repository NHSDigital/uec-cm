import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Label } from 'nhsuk-react-components';
import OrganisationSearchSchema from '../../../schemas/organisationsearch';
import ForwardRefInput from '../../forwardrefinput';
import './styles.css';

interface IFormInput {
    searchField: string;
}

export interface OrganisationsSearchProps {
    onSearch: (searchField: string) => void;
}

const OrganisationsSearch: React.FC<OrganisationsSearchProps> = ({ onSearch }) => {
    const { control, handleSubmit, formState: { errors } } = useForm<IFormInput>({
        resolver: yupResolver(OrganisationSearchSchema),
    });

    const onSubmit: SubmitHandler<IFormInput> = data => {
        onSearch(data.searchField);
    };

    return (
        <div data-testid='organisation-search'>
            <Label isPageHeading={true} size='l'>Organisation search</Label>

            <div className='nhsuk-caption-m nhsuk-u-margin-bottom-8' data-testid='search-by'>
                <div>Search by <strong className='nhsuk-u-margin-left-1 nhsuk-u-margin-right-1'>either</strong>
                    organisation (e.g. Trust name)
                </div>
                <div>
                    or location (e.g. Hospital name) or postcode
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="searchField"
                    control={control}
                    render={({ field }) => (
                        <ForwardRefInput
                            {...field}
                            label="Organisation or Location or Postcode"
                            name='search-field'
                            id='search-field'
                            error={errors.searchField?.message}
                            errorProps={{ id : 'search-field-error-message' }}
                            aria-label="Search Field"
                            data-testid="search-field-input"
                            width={30}
                        />
                    )}
                />

                <Button className="no-focus-button" data-testid="search-button" type='submit'>
                    Search
                </Button>
            </form>
        </div>
    );
};

export default OrganisationsSearch;
