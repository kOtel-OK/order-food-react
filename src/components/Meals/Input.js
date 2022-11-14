import React, { useState, useContext, Component } from 'react';
import CartContext from '../../store/cart-context';
import classes from './Input.module.css';

class Input extends Component {
  constructor() {
    super();

    this.state = {
      itemAmount: 1,
    };
  }

  static contextType = CartContext;

  changeItemAmount(event) {
    this.setState({ itemAmount: Number(event.target.value) });
  }

  addToCartHandler(event) {
    event.preventDefault();

    const isSameInCart = this.context.cart.findIndex(
      el => el.id === this.props.meal.id
    );

    if (isSameInCart !== -1) {
      this.context.cart[isSameInCart].amount += this.state.itemAmount;
    } else {
      this.context.cart.push({
        ...this.props.meal,
        amount: this.state.itemAmount,
      });
    }

    this.context.updateAmount();

    this.setState({ itemAmount: 1 });
  }

  render() {
    return (
      <form
        onSubmit={this.addToCartHandler.bind(this)}
        className={classes.input}
      >
        <div className={classes.input_container}>
          <label htmlFor={this.props.meal.id}>Amount</label>
          <input
            max={10}
            onChange={this.changeItemAmount.bind(this)}
            type="number"
            id={this.props.meal.id}
            value={this.state.itemAmount}
          ></input>
        </div>
        <button type="submit">+Add</button>
      </form>
    );
  }
}

// const Input = function (props) {
//   const [itemAmount, setItemAmount] = useState(1);
//   const cartCtx = useContext(CartContext);

//   const changeItemAmount = event => {
//     setItemAmount(Number(event.target.value));
//   };

//   const addToCartHandler = event => {
//     event.preventDefault();

//     const isSameInCart = cartCtx.cart.findIndex(el => el.id === props.meal.id);

//     if (isSameInCart !== -1) {
//       cartCtx.cart[isSameInCart].amount += itemAmount;
//     } else {
//       cartCtx.cart.push({ ...props.meal, amount: itemAmount });
//     }

//     cartCtx.updateAmount();

//     setItemAmount(1);
//   };

//   return (
//     <form onSubmit={addToCartHandler} className={classes.input}>
//       <div className={classes.input_container}>
//         <label htmlFor={props.meal.id}>Amount</label>
//         <input
//           max={10}
//           onChange={changeItemAmount}
//           type="number"
//           id={props.meal.id}
//           value={itemAmount}
//         ></input>
//       </div>
//       <button type="submit">+Add</button>
//     </form>
//   );
// };

export default Input;
