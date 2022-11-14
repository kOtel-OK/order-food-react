import React, { Fragment } from 'react';
import classes from './MealItem.module.css';
import Input from './Input';

const MealItem = function (props) {
  return (
    <Fragment>
      <div className={classes.meal}>
        <h3>{props.mealItem.name}</h3>
        <div className={classes.description}>{props.mealItem.description}</div>
        <div className={classes.price}>${props.mealItem.price}</div>
      </div>
      <Input meal={props.mealItem} />
    </Fragment>
  );
};

export default MealItem;
