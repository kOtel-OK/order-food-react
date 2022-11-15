import React, { useState } from 'react';
import Header from './components/UI/Header/Header';
import Card from './components/UI/Card/Card';
import Modal from './components/UI/Modal/Modal';
import MealItemForm from './components/Meals/MealItemForm';
import CartContext from './store/cart-context';

const App = function () {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [cart, setCart] = useState([]);

  const cartButtonHandler = () => {
    if (amount <= 0) {
      setIsCartOpen(false);
      // return;
    } else {
      isCartOpen ? setIsCartOpen(false) : setIsCartOpen(true);
    }
  };

  const cartAmountHandler = () => {
    const amount = cart.reduce((acc, el) => {
      return (acc += el.amount);
    }, 0);
    setAmount(amount);
  };

  const cleanCartHandler = () => {
    setCart([]);
    setAmount(0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        updateAmount: cartAmountHandler,
        cleanCart: cleanCartHandler,
      }}
    >
      {isCartOpen && <Modal onBtnCloseClick={cartButtonHandler} />}
      <Header amount={amount} onCartOpenClick={cartButtonHandler} />
      <main>
        <Card>
          {/* <MealItemForm meals={this.fetchMeals} /> */}
          <MealItemForm />
        </Card>
      </main>
    </CartContext.Provider>
  );
};

// class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       isCartOpen: false,
//       amount: 0,
//       cart: [],
//     };
//   }

//   cartButtonHandler() {
//     if (this.state.amount <= 0) {
//       this.setState({ isCartOpen: false });
//       // return;
//     } else {
//       this.state.isCartOpen
//         ? this.setState({ isCartOpen: false })
//         : this.setState({ isCartOpen: true });
//     }
//   }

//   cartAmountHandler() {
//     const amount = this.state.cart.reduce((acc, el) => {
//       return (acc += el.amount);
//     }, 0);
//     this.setState({ amount: amount });
//   }

//   cleanCartHandler() {
//     this.setState({ cart: [] });
//     this.setState({ amount: 0 });
//     // this.setState({ isCartOpen: false });
//   }

//   render() {
//     return (
//       <CartContext.Provider
//         value={{
//           cart: this.state.cart,
//           updateAmount: this.cartAmountHandler.bind(this),
//           cleanCart: this.cleanCartHandler.bind(this),
//         }}
//       >
//         {this.state.isCartOpen && (
//           <Modal onBtnCloseClick={this.cartButtonHandler.bind(this)} />
//         )}
//         <Header
//           amount={this.state.amount}
//           onCartOpenClick={this.cartButtonHandler.bind(this)}
//         />
//         <main>
//           <Card>
//             {/* <MealItemForm meals={this.fetchMeals} /> */}
//             <MealItemForm />
//           </Card>
//         </main>
//       </CartContext.Provider>
//     );
//   }
// }

export default App;
