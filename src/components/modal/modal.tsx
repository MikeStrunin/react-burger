import React from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import styles from './modal.module.css'

const modalRoot = document.getElementById('react-modals') as HTMLElement;

type TModalData = {
    children: React.JSX.Element; // React.JSX.Element
    title?: string;
    onClose: () => void;
};
// Modal.propTypes = {
//     children: PropTypes.element,
//     onClose: PropTypes.func,
//     title: PropTypes.string,
// }

export const Modal = ({ children, title, onClose }: TModalData): React.JSX.Element => {
    const handleKeyClose = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose();
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

