import React, { Component } from 'react';

import CartIcon from '../../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

class HeaderCartButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      btnClasses: `${classes.button}`,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.amount !== this.props.amount) {
      this.setState({ btnClasses: `${classes.button} ${classes.bump}` });

      setTimeout(() => {
        this.setState({ btnClasses: `${classes.button}` });
      }, 300);
    }
  }

  render() {
    return (
      <button
        type="button"
        onClick={this.props.onClick}
        className={this.state.btnClasses}
      >
        <CartIcon className={classes.icon} />
        <span>Cart</span>
        <span className={classes.badge}>{this.props.amount}</span>
      </button>
    );
  }
}

// const HeaderCartButton = function (props) {
//   const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

//   const btnClasses = `${classes.button} ${
//     btnIsHighlighted ? classes.bump : ''
//   }`;

//   useEffect(() => {
//     setBtnIsHighlighted(true);

//     const timer = setTimeout(() => {
//       setBtnIsHighlighted(false);
//     }, 300);

//     return () => {
//       clearTimeout(timer);
//     };
//   }, [props.amount]);

//   return (
//     <button type="button" onClick={props.onClick} className={btnClasses}>
//       <CartIcon className={classes.icon} />
//       <span>Cart</span>
//       <span className={classes.badge}>{props.amount}</span>
//     </button>
//   );
// };

export default HeaderCartButton;
