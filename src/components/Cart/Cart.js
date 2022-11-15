import React, { Fragment, useState, useContext } from 'react';
import CartContext from '../../store/cart-context';
import useHttp from '../../hooks/use-http';
import CartItem from './CartItem';
import OrderForm from '../OrderForm/OrderForm';
import classes from './Cart.module.css';

const Cart = function (props) {
  const [sendOrder, setSendOrder] = useState(false);
  const [sendOrderBtn, setSendOrderBtn] = useState(true);

  const orderData = {};

  const context = useContext(CartContext);

  const httpHandler = data => {
    console.log(data);
    // context.cleanCart();
  };

  const httpObj = useHttp(httpHandler);

  const getTotalPrice = () => {
    return context.cart.reduce((acc, el) => {
      return (acc += el.price * el.amount);
    }, 0);
  };

  const removeFromCartHandler = id => {
    const item = context.cart.findIndex(el => el.id === id);

    if (context.cart[item].amount < 0) return;

    context.cart[item].amount--;

    if (context.cart[item].amount === 0) {
      context.cart.splice(item, 1);
    }

    context.updateAmount();
  };

  const addToCartHandler = id => {
    const item = context.cart.findIndex(el => el.id === id);

    context.cart[item].amount++;

    context.updateAmount();
  };

  const sendOrderHandler = () => {
    if (sendOrder) {
      httpObj.fetchData(
        'https://react-http-post-29079-default-rtdb.europe-west1.firebasedatabase.app/orders.json',
        {
          method: 'POST',
          body: JSON.stringify(orderData),
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (httpObj) return;

      console.log('Sending to server');
      setSendOrder(false);
      context.cleanCart();
    } else {
      setSendOrder(true);
    }
  };

  const orderConfirmHandler = formData => {
    if (formData.length === 0) {
      setSendOrderBtn(true);
    } else {
      const items = context.cart.map(el => {
        return {
          id: el.id,
          name: el.name,
          amount: el.amount,
        };
      });

      orderData.id = Date.now();
      orderData.date = new Date().toLocaleString('en-us');
      orderData.firs_name = formData[0];
      orderData.last_name = formData[1];
      orderData.phone = formData[2];
      orderData.items = items;
      orderData.total_price = getTotalPrice();

      setSendOrderBtn(false);
    }
  };

  return (
    <Fragment>
      {httpObj.error && (
        <p className={classes.error}>Something went wrong...</p>
      )}

      {httpObj.isSuccess && (
        <p className={classes.success}>
          Congrats! Your order has successfully sent
        </p>
      )}

      <ul className={classes['cart-items']}>
        {context.cart.map(el => {
          return (
            <CartItem
              isOrderSuccess={httpObj.isSuccess}
              key={el.id}
              id={el.id}
              amount={el.amount}
              name={el.name}
              price={el.price.toFixed(2)}
              onBtnRemove={removeFromCartHandler}
              onBtnAdd={addToCartHandler}
            />
          );
        })}
      </ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${getTotalPrice().toFixed(2)}</span>
      </div>

      {sendOrder && context.cart.length > 0 && !httpObj.isSuccess && (
        <div>
          <OrderForm onOrderConfirm={orderConfirmHandler} />
        </div>
      )}

      <div className={classes.actions}>
        {context.cart.length > 0 && (
          <button
            className={classes['button--alt']}
            onClick={context.cleanCart}
          >
            Empty cart
          </button>
        )}
        <button
          className={classes['button--alt']}
          type="button"
          onClick={props.onBtnCloseClick}
        >
          Close
        </button>
        {context.cart.length > 0 && !httpObj.isSuccess && (
          <button
            disabled={sendOrder && sendOrderBtn ? true : false}
            className={classes['button--alt']}
            type="button"
            onClick={sendOrderHandler}
          >
            {`${sendOrder ? 'Confirm' : 'Order'}`}
          </button>
        )}
      </div>
    </Fragment>
  );
};

export default Cart;
