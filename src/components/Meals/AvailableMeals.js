import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState();
  //last thing to load is useEffect..
  useEffect(() => {
    const fectched = async () => {
      const response = await fetch(
        "https://food-order-e003f-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();
      const fetchedMeals = [];
      for (const key in data) {
        fetchedMeals.push({
          id: key,
          ...data[key],
        });
      }
      setMeals(fetchedMeals);
      setIsLoading(false);
    };

    fectched().catch((error) => {
      setIsLoading(false);
      setFetchError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.loading}>
        <p>Loading ...</p>
      </section>
    );
  }

  if (fetchError) {
    return (
      <section className={classes.error}>
        <div>{fetchError}</div>
      </section>
    );
  }
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
