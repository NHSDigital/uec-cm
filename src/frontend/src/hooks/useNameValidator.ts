import { useState } from 'react';
import { isNameValid } from '../services/validation';

const useNameValidator = (): [boolean, (name: string, allowBlank: boolean) => void ] => {
  const [isValidName, setIsNameValid] = useState(true);

  const validateName = (name: string, allowBlank: boolean): void => {

    if (name.length === 0 && allowBlank) {
      setIsNameValid(true);
    }
    else {
      setIsNameValid(isNameValid(name));
    }
  };

  return [isValidName, validateName];
};

export default useNameValidator;

