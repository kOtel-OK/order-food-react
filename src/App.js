import React, { useState } from 'react';
import Header from './components/UI/Header/Header';
import Card from './components/UI/Card/Card';
import Modal from './components/UI/Modal/Modal';
import MealItemForm from './components/Meals/MealItemForm';
import CartContext from './store/cart-context';
import ErrorBoundary from './components/ErrorBoundary';

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
    setIsCartOpen(false);
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
      <ErrorBoundary>
        <main>
          <Card>
            <MealItemForm />
          </Card>
        </main>
      </ErrorBoundary>
    </CartContext.Provider>
  );
};

export default App;
