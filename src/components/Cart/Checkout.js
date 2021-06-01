import { useRef, useState } from 'react';

import styles from './Checkout.module.css';

const isEmpty = val => val.trim() === "";

const Checkout = (props) => {
    const [formInputsValid, setFormInputsValid] = useState({
        name: true,
        houseName: true,
        city: true,
        postcode: true
    });

    const nameInputRef = useRef();
    const houseNameInputRef = useRef();
    const cityInputRef = useRef();
    const postcodeInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredHouseName = houseNameInputRef.current.value;
        const enteredCity = cityInputRef.current.value;
        const enteredPostcode = postcodeInputRef.current.value;

        const enteredNameValid = !isEmpty(enteredName);
        const enteredHouseNameValid = !isEmpty(enteredHouseName);
        const enteredCityValid = !isEmpty(enteredCity);
        const enteredPostcodeValid = !isEmpty(enteredPostcode);

        setFormInputsValid({
            name: enteredNameValid,
            houseName: enteredHouseNameValid,
            city: enteredCityValid,
            postcode: enteredPostcodeValid
        });

        console.log(formInputsValid)

        const formIsValid = 
            enteredNameValid &&
            enteredHouseNameValid &&
            enteredCityValid &&
            enteredPostcodeValid;

        if (!formIsValid) return;

        props.onSubmit({
            name: enteredName,
            houseName: enteredHouseName,
            city: enteredCity,
            postcode: enteredPostcode
        });
    };

    return (
        <form className={styles.form} onSubmit={confirmHandler}>
            <div className={`${styles.control} ${formInputsValid.name ? '' : styles.invalid}`}>
                <label htmlFor='name'>Your Name</label>
                <input ref={nameInputRef} type='text' id='name' />
                {!formInputsValid.name && <p>Please enter your name.</p>}
            </div>
            <div className={`${styles.control} ${formInputsValid.houseName ? '' : styles.invalid}`}>
                <label htmlFor='house-number'>House name/number:</label>
                <input ref={houseNameInputRef} type='text' id='house-number' />
                {!formInputsValid.houseName && <p>Please enter your house name or number.</p>}
            </div>
            <div className={`${styles.control} ${formInputsValid.city ? '' : styles.invalid}`}>
                <label htmlFor='city'>City</label>
                <input ref={cityInputRef} type='text' id='city' />
                {!formInputsValid.city && <p>Please enter your city.</p>}
            </div>
            <div className={`${styles.control} ${formInputsValid.postcode ? '' : styles.invalid}`}>
                <label htmlFor='postcode'>Postcode</label>
                <input ref={postcodeInputRef} type='text' id='postcode' />
                {!formInputsValid.postcode && <p>Please enter your postcode.</p>}
            </div>
            <div className={styles.actions}>
                <button type='button' onClick={props.onCancel}>
                Cancel
                </button>
                <button className={styles.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;