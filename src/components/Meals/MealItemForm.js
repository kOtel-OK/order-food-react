import React, { useEffect } from 'react';
import useHttp from '../../hooks/use-http';
import classes from './MealItemForm.module.css';
import MealItem from './MealItem';

const MealItemForm = function () {
  const httpRequestHandler = data => {
    // console.log(data);
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

  if (httpObj.response.length === 0 && !httpObj.error) {
    return <p>Loading...</p>;
  } else if (httpObj.error) {
    return <p className={classes.error}>Something went wrong :((</p>;
  } else {
    return httpObj.response.map(el => (
      <div key={el.id} className={classes.form}>
        <MealItem mealItem={el} />
      </div>
    ));
  }
};

export default MealItemForm;
