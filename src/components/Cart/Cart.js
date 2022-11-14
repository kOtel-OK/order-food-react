import React, { Fragment, useState, Component, useContext } from 'react';
import CartContext from '../../store/cart-context';
import useHttp from '../../hooks/use-http';
import CartItem from './CartItem';
import OrderForm from '../OrderForm/OrderForm';
import classes from './Cart.module.css';

const Cart = function (props) {
  const [update, setUpdate] = useState(false);
  const [sendOrder, setSendOrder] = useState(false);
  const [sendOrderBtn, setSendOrderBtn] = useState(false);
  // const [orderData, setOrderData] = useState({});

  const orderData = {};

  const context = useContext(CartContext);

  const httpHandler = data => {
    console.log(data);
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

    setUpdate(context.cart[item]?.amount || 0);

    context.updateAmount();
  };

  const addToCartHandler = id => {
    const item = context.cart.findIndex(el => el.id === id);

    context.cart[item].amount++;

    setUpdate(context.cart[item].amount);

    context.updateAmount();
  };

  const sendOrderHandler = () => {
    if (sendOrder) {
      console.log(orderData);
      httpObj.fetchData(
        'https://react-http-post-29079-default-rtdb.europe-west1.firebasedatabase.app/orders.json',
        {
          method: 'POST',
          body: JSON.stringify(orderData),
          headers: { 'Content-Type': 'application/json' },
        }
      );

      console.log('Sending to server');
      setSendOrder(false);
      context.cleanCart();
      // context.updateAmount();
    } else {
      setSendOrder(true);
    }
  };

  const orderConfirmHandler = formData => {
    const items = context.cart.map(el => {
      return {
        id: el.id,
        name: el.name,
        amount: el.amount,
      };
    });

    orderData.id = Math.random();
    orderData.date = new Date().toLocaleString('en-us');
    orderData.firs_name = formData[0];
    orderData.last_name = formData[1];
    orderData.phone = formData[2];
    orderData.items = items;
    orderData.total_price = getTotalPrice();
  };

  return (
    <Fragment>
      <ul className={classes['cart-items']}>
        {context.cart.map(el => {
          return (
            <CartItem
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

      {sendOrder && (
        <div>
          <OrderForm onOrderConfirm={orderConfirmHandler} />
        </div>
      )}

      <div className={classes.actions}>
        {context.cart.length > 0 && (
          <button onClick={context.cleanCart}>Cancel Order</button>
        )}
        <button
          className={classes['button--alt']}
          type="button"
          onClick={props.onBtnCloseClick}
        >
          Close
        </button>
        {context.cart.length > 0 && (
          <button
            // disabled={this.state.senOrderBtn ? true : false}
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

// class Cart extends Component {
//   constructor() {
//     super();

//     this.state = {
//       update: false,
//       sendOrder: false,
//       senOrderBtn: false,
//     };
//   }

//   static contextType = CartContext;

//   getTotalPrice() {
//     return this.context.cart.reduce((acc, el) => {
//       return (acc += el.price * el.amount);
//     }, 0);
//   }

//   removeFromCartHandler(id) {
//     const item = this.context.cart.findIndex(el => el.id === id);

//     if (this.context.cart[item].amount < 0) return;

//     this.context.cart[item].amount--;

//     if (this.context.cart[item].amount === 0) {
//       this.context.cart.splice(item, 1);
//     }

//     this.setState({ update: this.context.cart[item]?.amount || 0 });

//     this.context.updateAmount();
//   }

//   addToCartHandler(id) {
//     const item = this.context.cart.findIndex(el => el.id === id);

//     this.context.cart[item].amount++;

//     this.setState({ update: this.context.cart[item].amount });

//     this.context.updateAmount();
//   }

//   sendOrderHandler() {
//     if (this.state.sendOrder) {
//       console.log('Sending to server');
//     } else {
//       this.setState({ sendOrder: true });
//     }
//   }

//   orderConfirmHandler(formData) {
//     const items = this.context.cart.map(el => {
//       return {
//         id: el.id,
//         name: el.name,
//         amount: el.amount,
//       };
//     });
//     const orderData = {
//       id: Math.random(),
//       date: new Date().toLocaleString('en-us'),
//       firs_name: formData[0],
//       last_name: formData[1],
//       phone: formData[2],
//       items,
//       total_price: this.getTotalPrice(),
//     };

//     console.log(orderData);
//     // console.log(formData);
//     // console.log(this.state.senOrderBtn);
//     // this.setState({ senOrderBtn: true });
//   }

//   render() {
//     return (
//       <Fragment>
//         <ul className={classes['cart-items']}>
//           {this.context.cart.map(el => {
//             return (
//               <CartItem
//                 key={el.id}
//                 id={el.id}
//                 amount={el.amount}
//                 name={el.name}
//                 price={el.price.toFixed(2)}
//                 onBtnRemove={this.removeFromCartHandler.bind(this)}
//                 onBtnAdd={this.addToCartHandler.bind(this)}
//               />
//             );
//           })}
//         </ul>
//         <div className={classes.total}>
//           <span>Total Amount</span>
//           <span>${this.getTotalPrice().toFixed(2)}</span>
//         </div>

//         {this.state.sendOrder && (
//           <div>
//             <OrderForm onOrderConfirm={this.orderConfirmHandler.bind(this)} />
//           </div>
//         )}

//         <div className={classes.actions}>
//           <button
//             className={classes['button--alt']}
//             type="button"
//             onClick={this.props.onBtnCloseClick}
//           >
//             Close
//           </button>
//           {this.context.cart.length > 0 && (
//             <button
//               // disabled={this.state.senOrderBtn ? true : false}
//               className={classes['button--alt']}
//               type="button"
//               onClick={this.sendOrderHandler.bind(this)}
//             >
//               {`${this.state.sendOrder ? 'Confirm' : 'Order'}`}
//             </button>
//           )}
//         </div>
//       </Fragment>
//     );
//   }
// }

export default Cart;
