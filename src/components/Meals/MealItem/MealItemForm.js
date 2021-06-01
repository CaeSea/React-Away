import { useRef, useState } from 'react';

import Input from '../../UI/Input';
import styles from './MealItemForm.module.css';

const MealItemForm = ({ id, onAddToCart }) => {

    const [amountIsValid, setAmountIsValid] = useState(true);

    const amountInputRef = useRef();

    const submitFormHandler = e => {
        e.preventDefault();
        
        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;

        if(enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
            setAmountIsValid(false);
            return;
        }

        onAddToCart(enteredAmountNumber);
    }

    return (
        <form onSubmit={submitFormHandler} className={styles.form}>
            <Input ref={amountInputRef} 
                label="Amount"
                input={{
                    id: `amount-${id}`,
                    type: "number",  
                    min: "1",
                    max: "5",
                    step: "1",
                    defaultValue: "1"
                }} 
            />
            <button>+ Add</button>
            {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
        </form>
    );
}

export default MealItemForm;