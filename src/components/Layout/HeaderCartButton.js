import { useContext, useEffect, useState } from 'react';

import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import styles from './HeaderCartButton.module.css';

const HeaderCartButton = ({ onClick }) => {

    const [buttonIsAnimated, setButtonIsAnimated] = useState(false);

    const cartCtx = useContext(CartContext);
    const { items } = cartCtx;

    const numberItemsInCart = cartCtx.items.reduce((index, item) => {
        return index + item.amount;
    }, 0);

    const buttonClasses = `${styles.button} ${buttonIsAnimated ? styles.bump : ''}`;


    useEffect(() => {
        if (items.length === 0) return;
        setButtonIsAnimated(true);

        const timer = setTimeout(() => {
            setButtonIsAnimated(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [items]);

    return (
        <button className={buttonClasses} onClick={onClick}>
            <span className={styles.icon}><CartIcon /></span>
            <span>Your Cart</span>
            <span className={styles.badge}>{numberItemsInCart}</span>
        </button>
    );
}

export default HeaderCartButton;