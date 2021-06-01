import React, { useContext, useState } from 'react';

import CartContext from '../../store/cart-context';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import Checkout from './Checkout';
import styles from './Cart.module.css';

const Cart = ({ onHideCart }) => {
    const [checkout, setCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasSubmit, setHasSubmit] = useState(false);

    const cartCtx = useContext(CartContext);

    const totalAmount = `£${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    }

    const cartItemAddHandler = item => {
        cartCtx.addItem({ ...item, amount: 1 });
    }

    const orderHandler = () => {
        setCheckout(true);
    }

    const submitOrderHandler = async userData => {
        setIsSubmitting(true);
        const response = await fetch('https://react-away-v2-default-rtdb.europe-west1.firebasedatabase.app/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                order: cartCtx.items
            })
        });
        setIsSubmitting(false);
        setHasSubmit(true);
        cartCtx.clearCart();
    }

    const cartItems = <ul className={styles['cart-items']}>{cartCtx.items.map(item => (
        <CartItem 
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
        />
    ))}</ul>;

    const modalActions = (
        <div className={styles.actions}>
            <button className={styles['button-alt']} onClick={onHideCart}>Close</button>
            {hasItems && <button className={styles.button} onClick={orderHandler}>Order</button>}
        </div>
    );

    const cartModalContent = (
        <React.Fragment>
            {cartItems}
            <div className={styles.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {checkout && <Checkout onCancel={onHideCart} onSubmit={submitOrderHandler} />}
            {!checkout && modalActions}
        </React.Fragment>
    );

    const isSubmittingModalContent = <p>Sending your order to the restaurant.</p>;

    const didSubmitModalContent = (
        <React.Fragment>
            <p>Your order has been recieved, thanks!</p>
            <div className={styles.actions}>
                <button className={styles['button-alt']} onClick={onHideCart}>Close</button>
            </div>
        </React.Fragment>
    );
    
    return (
        <Modal onHideCart={onHideCart}>
            {!isSubmitting && !hasSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && hasSubmit && didSubmitModalContent}
        </Modal>
    );
}

export default Cart;