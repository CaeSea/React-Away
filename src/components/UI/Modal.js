import { Fragment } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

const Backdrop = ({ onHideCart }) => {
    return <div className={styles.backdrop} onClick={onHideCart} />
};

const ModalOverlay = ({ children }) => {
    return <div className={styles.modal}>
        <div className={styles.content}>{children}</div>
    </div>
}

const portalLocation = document.getElementById('overlays');

const Modal = (props) => {
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onHideCart={props.onHideCart} />, portalLocation)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalLocation)}
        </Fragment>
    );
}

export default Modal;