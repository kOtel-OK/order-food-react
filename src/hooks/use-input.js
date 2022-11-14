import { useState } from 'react';

const useInput = function (validationHandler) {
  const [inputValue, setInputValue] = useState('');
  const [inputValueError, setInputValueError] = useState(false);
  //   const [isInputValid, setIsInputValid] = useState(false);

  const onInputChangeHandler = event => {
    // console.log(event.target.value.length);
    // console.log(inputValueError);
    // console.log(isInputValid);
    setInputValueError(validationHandler(event.target.value));
    // setIsInputValid(inputValueError === false && event.target.value.length > 0);
    setInputValue(event.target.value);
  };

  const onInputFocusHandler = () => {};

  const onInputBlurHandler = () => {};

  const isInputValidHandler = () => {
    return inputValueError === false && inputValue.length > 0;
  };

  return {
    inputValue,
    inputValueError,
    // isInputValid,
    setInputValue,
    isInputValidHandler,
    onInputChangeHandler,
    onInputFocusHandler,
    onInputBlurHandler,
  };
};

export default useInput;
