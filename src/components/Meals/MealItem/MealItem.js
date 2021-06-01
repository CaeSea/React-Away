import { useContext } from 'react';

import CartContext from '../../../store/cart-context';

import MealItemForm from './MealItemForm';
import styles from './MealItem.module.css';

const MealItem = ({ mealName, mealDescription, mealPrice, mealId }) => {

    const cartCtx = useContext(CartContext);

    const price = `£${mealPrice.toFixed(2)}`;

    const addToCartHandler = amount => {
        cartCtx.addItem({
            id: mealId,
            name: mealName,
            amount: amount,
            price: mealPrice
        });
    };

    return (
        <li className={styles.meal}>
            <div>
                <h3>{mealName}</h3>
                <div className={styles.description}>{mealDescription}</div>
                <div className={styles.price}>{price}</div>
            </div>
            <div>
                <MealItemForm id={mealId} onAddToCart={addToCartHandler} />
            </div>
        </li>
    );
};

export default MealItem;