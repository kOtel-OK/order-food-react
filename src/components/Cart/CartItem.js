import React from 'react';
import classes from './CartItem.module.css';

const CartItem = function (props) {
  const onBtnRemove = () => {
    props.onBtnRemove(props.id);
  };
  const onBtnAdd = () => {
    props.onBtnAdd(props.id);
  };

  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{props.name}</h2>
        <div id={props.id} className={classes.summary}>
          <span className={classes.price}>${props.price}</span>
          <span className={classes.amount}>x{props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={onBtnRemove}>
          -
        </button>
        <button type="button" onClick={onBtnAdd}>
          +
        </button>
      </div>
    </li>
  );
};

export default CartItem;
