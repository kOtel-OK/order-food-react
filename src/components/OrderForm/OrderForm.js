import { Component, Fragment } from 'react';
import classes from './OrderForm.module.css';

class OrderForm extends Component {
  render() {
    return (
      <Fragment>
        <form className={classes.order_form}>
          <label htmlFor="first_name">Name</label>
          <input type="text" name="first_name" id="" />
          <label htmlFor="last_name">Surname</label>
          <input type="text" name="last_name" id="" />
          <label htmlFor="phone">Phone</label>
          <input type="tel" name="phone" id="" />
        </form>
      </Fragment>
    );
  }
}

export default OrderForm;
