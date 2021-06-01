import { Fragment } from 'react';
import styles from './Header.module.css';
import mealsImage from '../../assets/meals.jpg';
import HeaderCartButton from './HeaderCartButton';

const Header = ({ onShowCart }) => {

    return (
        <Fragment>
            <header className={styles.header}>
                <h1>React-away</h1>
                <HeaderCartButton onClick={onShowCart} />
            </header>
            <div className={styles['main-image']}>
                <img src={mealsImage} alt=""/>
            </div>
        </Fragment>
    );
}

export default Header;