import React from 'react';
import classes from './Modal.module.css';
import Cart from '../../Cart/Cart';

const Modal = function (props) {
  return (
    <div className={classes.backdrop}>
      <div className={classes.modal}>
        <Cart onBtnCloseClick={props.onBtnCloseClick} />
      </div>
    </div>
  );
};

export default Modal;
