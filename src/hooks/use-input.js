import { useState } from 'react';

const useInput = function (validationHandler) {
  const [inputValue, setInputValue] = useState('');
  const [inputValueError, setInputValueError] = useState(false);

  const onInputChangeHandler = event => {
    setInputValueError(validationHandler(event.target.value));
    setInputValue(event.target.value);
  };

  const onInputFocusHandler = () => {};

  const onInputBlurHandler = () => {
    if (inputValue.length === 0) {
      setInputValueError(true);
    }
  };

  const isInputValidHandler = () => {
    return inputValueError === false && inputValue.length > 0;
  };

  return {
    inputValue,
    inputValueError,
    setInputValue,
    isInputValidHandler,
    onInputChangeHandler,
    onInputFocusHandler,
    onInputBlurHandler,
  };
};

export default useInput;
