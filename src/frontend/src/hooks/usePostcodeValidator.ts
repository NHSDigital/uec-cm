import { useState } from 'react';
import { isPostcodeValid } from '../services/validation';

const usePostcodeValidator = (): [boolean, (postcoode: string) => void ] => {
  const [isValidPostcode, setIsPostcodeValid] = useState(true);

  const validatePostcode = (postcode: string): void => {
    setIsPostcodeValid(isPostcodeValid(postcode));
  };

  return [isValidPostcode, validatePostcode];
};

export default usePostcodeValidator;

