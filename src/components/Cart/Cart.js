import React, { Fragment, Component } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import OrderForm from '../OrderForm/OrderForm';
import classes from './Cart.module.css';

class Cart extends Component {
  constructor() {
    super();

    this.state = {
      update: false,
      sendOrder: false,
    };
  }

  static contextType = CartContext;

  getTotalPrice() {
    return this.context.cart.reduce((acc, el) => {
      return (acc += el.price * el.amount);
    }, 0);
  }

  removeFromCartHandler(id) {
    const item = this.context.cart.findIndex(el => el.id === id);

    if (this.context.cart[item].amount < 0) return;

    this.context.cart[item].amount--;

    if (this.context.cart[item].amount === 0) {
      this.context.cart.splice(item, 1);
    }

    this.setState({ update: this.context.cart[item]?.amount || 0 });

    this.context.updateAmount();
  }

  addToCartHandler(id) {
    const item = this.context.cart.findIndex(el => el.id === id);

    this.context.cart[item].amount++;

    this.setState({ update: this.context.cart[item].amount });

    this.context.updateAmount();
  }

  sendOrderHandler() {
    if (this.state.sendOrder) {
      console.log('Sending to server');
    } else {
      this.setState({ sendOrder: true });
    }
  }

  render() {
    return (
      <Fragment>
        <ul className={classes['cart-items']}>
          {this.context.cart.map(el => {
            return (
              <CartItem
                key={el.id}
                id={el.id}
                amount={el.amount}
                name={el.name}
                price={el.price.toFixed(2)}
                onBtnRemove={this.removeFromCartHandler.bind(this)}
                onBtnAdd={this.addToCartHandler.bind(this)}
              />
            );
          })}
        </ul>
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>${this.getTotalPrice().toFixed(2)}</span>
        </div>

        {this.state.sendOrder && (
          <div>
            <OrderForm />
          </div>
        )}

        <div className={classes.actions}>
          <button
            className={classes['button--alt']}
            type="button"
            onClick={this.props.onBtnCloseClick}
          >
            Close
          </button>
          {this.context.cart.length > 0 && (
            <button
              className={classes['button--alt']}
              type="button"
              onClick={this.sendOrderHandler.bind(this)}
            >
              {`${this.state.sendOrder ? 'Confirm' : 'Order'}`}
            </button>
          )}
        </div>
      </Fragment>
    );
  }
}

export default Cart;
