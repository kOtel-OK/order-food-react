import React, { Component } from 'react';
import Header from './components/UI/Header/Header';
import Card from './components/UI/Card/Card';
import Modal from './components/UI/Modal/Modal';
import MealItemForm from './components/Meals/MealItemForm';
import CartContext from './store/cart-context';

// const fetchMeals = async function () {
//   const response = await fetch(
//     'https://react-http-post-29079-default-rtdb.europe-west1.firebasedatabase.app/meals.json'
//   );

//   const data = await response.json();
//   console.log(data);
//   return data;
// };
// const MEALS = fetch(
//   'https://react-http-post-29079-default-rtdb.europe-west1.firebasedatabase.app/meals.json'
// )
//   .then(response => response.json())
//   .then(data => {
//     return data;
//   });

// console.log(fetchMeals());

// const MEALS = fetchMeals();
// console.log('updated');
// const MEALS = [
//   {
//     id: 'm1',
//     name: 'Sushi',
//     description: 'Finest fish and veggies',
//     price: 22.99,
//   },
//   {
//     id: 'm2',
//     name: 'Schnitzel',
//     description: 'A german specialty!',
//     price: 16.5,
//   },
//   {
//     id: 'm3',
//     name: 'Barbecue Burger',
//     description: 'American, raw, meaty',
//     price: 12.99,
//   },
//   {
//     id: 'm4',
//     name: 'Green Bowl',
//     description: 'Healthy...and green...',
//     price: 18.99,
//   },
// ];

class App extends Component {
  // MEALS = [];

  constructor() {
    super();

    this.state = {
      isCartOpen: false,
      amount: 0,
      cart: [],
    };
  }

  cartButtonHandler() {
    console.log(this.state.amount);
    if (this.state.amount <= 0) {
      this.setState({ isCartOpen: false });
      // return;
    } else {
      this.state.isCartOpen
        ? this.setState({ isCartOpen: false })
        : this.setState({ isCartOpen: true });
    }
  }

  cartAmountHandler() {
    const amount = this.state.cart.reduce((acc, el) => {
      return (acc += el.amount);
    }, 0);
    this.setState({ amount: amount });
  }

  // componentDidMount() {
  //   const meals = [];
  //   // if (this.MEALS.length > 0) return;
  //   // console.log(this.MEALS.length);
  //   // console.log('didMount');
  //   fetch(
  //     'https://react-http-post-29079-default-rtdb.europe-west1.firebasedatabase.app/meals.json'
  //   )
  //     .then(response => response.json())
  //     .then(data => {
  //       // this.setState({ MEALS: data });
  //       // console.log(data);
  //       for (let key in data) {
  //         // if (data.hasOwnProperty(key)) {
  //         data[key].id = key;
  //         meals.push(data[key]);
  //         // }
  //       }
  //       // console.log(data);
  //       console.log(meals);
  //       this.setState({ MEALS: meals });
  //     });
  // }

  render() {
    return (
      <CartContext.Provider
        value={{
          cart: this.state.cart,
          updateAmount: this.cartAmountHandler.bind(this),
        }}
      >
        {this.state.isCartOpen && (
          <Modal onBtnCloseClick={this.cartButtonHandler.bind(this)} />
        )}
        <Header
          amount={this.state.amount}
          onCartOpenClick={this.cartButtonHandler.bind(this)}
        />
        <main>
          <Card>
            {/* <MealItemForm meals={this.fetchMeals} /> */}
            <MealItemForm />
          </Card>
        </main>
      </CartContext.Provider>
    );
  }
}

// function App() {
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [amount, setAmount] = useState(0);

//   const cart = useState([]);

//   const cartButtonHandler = () => {
//     isCartOpen ? setIsCartOpen(false) : setIsCartOpen(true);
//   };

//   const cartAmountHandler = () => {
//     const amount = cart[0].reduce((acc, el) => {
//       return (acc += el.amount);
//     }, 0);
//     setAmount(amount);
//   };

//   const MEALS = [
//     {
//       id: 'm1',
//       name: 'Sushi',
//       description: 'Finest fish and veggies',
//       price: 22.99,
//     },
//     {
//       id: 'm2',
//       name: 'Schnitzel',
//       description: 'A german specialty!',
//       price: 16.5,
//     },
//     {
//       id: 'm3',
//       name: 'Barbecue Burger',
//       description: 'American, raw, meaty',
//       price: 12.99,
//     },
//     {
//       id: 'm4',
//       name: 'Green Bowl',
//       description: 'Healthy...and green...',
//       price: 18.99,
//     },
//   ];

//   return (
//     <CartContext.Provider
//       value={{ cart: cart[0], updateAmount: cartAmountHandler }}
//     >
//       {isCartOpen && <Modal onBtnCloseClick={cartButtonHandler} />}
//       <Header amount={amount} onCartOpenClick={cartButtonHandler} />
//       <main>
//         <Card>
//           <MealItemForm meals={MEALS} />
//         </Card>
//       </main>
//     </CartContext.Provider>
//   );
// }

export default App;
