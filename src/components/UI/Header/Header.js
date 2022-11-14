import React, { Fragment, Component } from 'react';
import classes from './Header.module.css';
import headerImg from '../../../assets/meals.jpeg';
import MealsSummary from '../../Meals/MealsSummary';
import HeaderCartButton from './HeaderCartButton';

class Header extends Component {
  render() {
    return (
      <Fragment>
        <header className={classes.header}>
          <h1 className={classes.logo}>ReactMeals</h1>
          <HeaderCartButton
            onClick={this.props.onCartOpenClick}
            amount={this.props.amount}
          />
        </header>

        <div className={classes['main-image']}>
          <img src={headerImg} alt="meal"></img>
        </div>

        <MealsSummary />
      </Fragment>
    );
  }
}

// const Header = function (props) {
//   return (
//     <Fragment>
//       <header className={classes.header}>
//         <h1 className={classes.logo}>ReactMeals</h1>
//         <HeaderCartButton
//           onClick={props.onCartOpenClick}
//           amount={props.amount}
//         />
//       </header>

//       <div className={classes['main-image']}>
//         <img src={headerImg} alt="meal"></img>
//       </div>

//       <MealsSummary />
//     </Fragment>
//   );
// };

export default Header;
