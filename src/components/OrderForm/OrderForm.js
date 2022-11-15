import { Fragment, useEffect } from 'react';
import useInput from '../../hooks/use-input';

import classes from './OrderForm.module.css';

const OrderForm = function (props) {
  const nameValidationHandler = value => {
    return value.match(/[^a-zа-я]/gi) !== null ? true : false;
  };

  const phoneValidationHandler = value => {
    return value.match(/[^0-9+]/gi) !== null ? true : false;
  };

  const nameInputObj = useInput(nameValidationHandler);
  const surnameInputObj = useInput(nameValidationHandler);
  const phoneInputObj = useInput(phoneValidationHandler);

  const isFormValid =
    nameInputObj.isInputValidHandler() &&
    surnameInputObj.isInputValidHandler() &&
    phoneInputObj.isInputValidHandler();

  useEffect(() => {
    if (isFormValid) {
      props.onOrderConfirm([
        nameInputObj.inputValue,
        surnameInputObj.inputValue,
        phoneInputObj.inputValue,
      ]);
    }

    if (!isFormValid) {
      props.onOrderConfirm([]);
    }
  }, [isFormValid]);

  return (
    <Fragment>
      <form className={classes.order_form}>
        <label htmlFor="first_name">Name</label>
        <input
          className={nameInputObj.inputValueError ? classes.invalid : ''}
          onChange={nameInputObj.onInputChangeHandler}
          type="text"
          name="first_name"
          placeholder=" a-z letters only"
          id=""
        />
        <label htmlFor="last_name">Surname</label>
        <input
          className={surnameInputObj.inputValueError ? classes.invalid : ''}
          onChange={surnameInputObj.onInputChangeHandler}
          type="text"
          placeholder=" a-z letters only"
          name="last_name"
          id=""
        />
        <label htmlFor="phone">Phone</label>
        <input
          className={phoneInputObj.inputValueError ? classes.invalid : ''}
          onChange={phoneInputObj.onInputChangeHandler}
          type="tel"
          name="phone"
          placeholder=" 0-9 digits only"
          id=""
        />
      </form>
    </Fragment>
  );
};

export default OrderForm;
