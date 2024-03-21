import * as yup from 'yup';
import { isNameValid } from '../services/validation';

const organisationNameErrorMessage = 'Enter a minimum of 3 characters';
const organisationNameInvalidErrorMessage = 'Organisation name is invalid';
const organisationTypeErrorMessage = 'Please select an Organisation type';

const AddOrganisationSchema = yup.object({
    organisationName: yup.string()
        .min(3, organisationNameErrorMessage)
        .test('isNameValid', organisationNameInvalidErrorMessage, isNameValid)
        .required(organisationNameErrorMessage),
    organisationType: yup.string()
        .required(organisationTypeErrorMessage)
});

export default AddOrganisationSchema;
