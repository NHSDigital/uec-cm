import * as yup from 'yup';

const errorMessage = 'Enter a minimum of 3 characters';

const OrganisationSearchSchema = yup.object({
    searchField: yup.string()
        .min(3, errorMessage)
        .required(errorMessage)
});

export default OrganisationSearchSchema;
