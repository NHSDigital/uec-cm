import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Select } from 'nhsuk-react-components';
import AddOrganisationSchema from '../../../schemas/addorganisation';
import ForwardRefInput from '../../forwardrefinput';
import ForwardRefSelect from '../../forwardrefselect';
import useOrganisationTypes from '../../../hooks/useOrganisationTypes';
import './styles.css';

interface IFormInput {
    organisationName: string;
    organisationType: string;
}

export interface AddOrganisationProps {
    onCreateOrganisation: (organisationName: string, organisationType: string) => void;
}

const AddOrganisation: React.FC<AddOrganisationProps> = ({ onCreateOrganisation }) => {

    const organisationTypes = useOrganisationTypes();

    const { control, handleSubmit, formState: { errors } } = useForm<IFormInput>({
        resolver: yupResolver(AddOrganisationSchema),
    });

    const onSubmit: SubmitHandler<IFormInput> = data => {
        onCreateOrganisation(data.organisationName, data.organisationType);
    };

    return (
        <div data-testid='organisation-search'>
            <div className='nhsuk-caption-m nhsuk-u-margin-bottom-4' data-testid='search-by'>
                    Please add the following mandatory information.
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="organisationName"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <ForwardRefInput
                            {...field}
                            label="Organisation name"
                            name='organisation-name'
                            id='organisation-name'
                            error={errors.organisationName?.message}
                            errorProps={{ id : 'organisation-name-error-message' }}
                            aria-label="Organisation name"
                            data-testid="organisation-name-input"
                            width={30}
                        />
                    )}
                />

                <Controller
                    name="organisationType"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <ForwardRefSelect
                            {...field}
                            label="Organisation type"
                            name='organisation-type'
                            id='organisation-type'
                            error={errors.organisationType?.message}
                            errorProps={{ id : 'organisation-type-error-message' }}
                            aria-label="Organisation type"
                            data-testid="organisation-type-input"
                            className="fixed-width"
                        >
                            {organisationTypes.map((item, index) => (
                                <Select.Option key={index} value={item.value}>
                                    {item.text}
                                </Select.Option>
                            ))}
                        </ForwardRefSelect>
                    )}
                />

                <Button className="no-focus-button" data-testid="next-button" type='submit'>
                    Next
                </Button>
            </form>
        </div>
    );
};

export default AddOrganisation;
