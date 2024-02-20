import { useState } from 'react';
import { isPostcodeValid } from '../services/validation';

const usePostcodeValidator = (): [boolean, (postcoode: string, allowBlank: boolean) => boolean ] => {
  const [isValidPostcode, setIsPostcodeValid] = useState(true);

  const validatePostcode = (postcode: string, allowBlank: boolean): boolean => {

    let isValid = false;

    if (postcode.length === 0 && allowBlank) {
      isValid = true;
    }
    else {
      isValid = isPostcodeValid(postcode);
    }

    setIsPostcodeValid(isValid);
    return isValid;
  };

  return [isValidPostcode, validatePostcode];
};

export default usePostcodeValidator;

