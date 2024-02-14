import { useState } from 'react';
import { isPostcodeValid } from '../services/validation';

const usePostcodeValidator = (): [boolean, (postcoode: string, allowBlank: boolean) => void ] => {
  const [isValidPostcode, setIsPostcodeValid] = useState(true);

  const validatePostcode = (postcode: string, allowBlank: boolean): void => {

    if (postcode.length === 0 && allowBlank) {
      setIsPostcodeValid(true);
    }
    else {
      setIsPostcodeValid(isPostcodeValid(postcode));
    }
  };

  return [isValidPostcode, validatePostcode];
};

export default usePostcodeValidator;

