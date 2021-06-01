import { useEffect, useState } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import styles from './AvailableMeals.module.css';

const AvailableMeals = () => {

    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    useEffect(() => {
        const fetchMeals = async () => {

            const response = await fetch('https://react-away-v2-default-rtdb.europe-west1.firebasedatabase.app/meals.json');

            if (!response.ok) {
                throw new Error('Oops, something is not quite right.');
            }

            const responseData = await response.json();

            const loadedMeals = [];

            for (const key in responseData) {
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price
                });
            };
            setMeals(loadedMeals);
            setIsLoading(false);
        };

        fetchMeals().catch(error => {
            setIsLoading(false);
            setHttpError(error.message);
            console.error(error);
        });

    }, []);

    if (isLoading) {
        return <section className={styles['meals-loading']}><p>Loading...</p></section>;
    }

    if (httpError) {
        return <section className={styles['meals-error']}>
            <p>{httpError}</p>
        </section>;
    }


    const mealsList = meals.map(meal => (
        <MealItem
            key={meal.id}
            mealName={meal.name}
            mealDescription={meal.description}
            mealPrice={meal.price}
            mealId={meal.id}
        />
    ));

    return (
        <section className={styles.meals}>
            <Card>
                <ul>
                   {mealsList}
                </ul>
            </Card>
        </section>
    );
}

export default AvailableMeals;