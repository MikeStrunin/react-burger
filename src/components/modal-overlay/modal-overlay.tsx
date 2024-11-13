import styles from './modal-overlay.module.css'

type TModaOverlaylData = {
    onClose: () => void;
};

export const ModalOverlay = ({ onClose }: TModaOverlaylData): React.JSX.Element => {
    return (
        <div className={styles.overlay} onClick={onClose}></div>
    )
}
