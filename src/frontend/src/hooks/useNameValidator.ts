import { useState } from 'react';
import { isNameValid } from '../services/validation';

const useNameValidator = (): [boolean, (name: string, allowBlank: boolean) => boolean ] => {
  const [isValidName, setIsNameValid] = useState(true);

  const validateName = (name: string, allowBlank: boolean): boolean => {

    let isValid = false;

    if (name.length === 0 && allowBlank) {
      isValid = true;
    }
    else {
      isValid = isNameValid(name);
    }

    setIsNameValid(isValid);
    return isValid;
  };

  return [isValidName, validateName];
};

export default useNameValidator;

