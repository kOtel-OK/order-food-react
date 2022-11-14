import React, { Fragment, useEffect } from 'react';
import useHttp from '../../hooks/use-http';
import classes from './MealItemForm.module.css';
import MealItem from './MealItem';

const MealItemForm = function () {
  const httpRequestHandler = data => {
    const fetchedMeals = [];

    for (let key in data) {
      data[key].id = key;
      fetchedMeals.push(data[key]);
    }

    return fetchedMeals;
  };

  const httpObj = useHttp(httpRequestHandler);

  useEffect(() => {
    httpObj.fetchData(
      'https://react-http-post-29079-default-rtdb.europe-west1.firebasedatabase.app/meals.json'
    );
  }, []);

  return (
    <Fragment>
      {httpObj.response.length === 0 ? (
        <p>Loading...</p>
      ) : (
        httpObj.response.map(el => (
          <div key={el.id} className={classes.form}>
            <MealItem mealItem={el} />
          </div>
        ))
      )}
    </Fragment>
  );
};

export default MealItemForm;
