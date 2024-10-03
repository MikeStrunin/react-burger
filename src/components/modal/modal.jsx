
import React from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from '../modal-overlay/modal-overlay.jsx';
import styles from './modal.module.css'
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('react-modals');

const Modal = ({ children, title, onClose }) => {
    const handleKeyClose = (e) => {
        if (e.key === 'Escape') {
            onClose(e);
        }
    }

    React.useEffect(() => {
        document.addEventListener('keydown', handleKeyClose);

        return () => { document.removeEventListener('keydown', handleKeyClose); };
    }, []);

    return (
        ReactDOM.createPortal(
            (
                <>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        {title &&
                            (<p className="pt-10 pl-10 pr-10 text text_type_main-large">{title}</p>)
                        }
                        <button type='button' className={styles.button} onClick={onClose}>
                            <CloseIcon onClick={onClose} type="primary" />
                        </button>
                        {children}
                    </div>
                    <ModalOverlay onClose={onClose} />
                </>
            ), modalRoot)
    )
}

Modal.propTypes = {
    children: PropTypes.element,
    onClose: PropTypes.func,
    title: PropTypes.string,
}

export { Modal };

