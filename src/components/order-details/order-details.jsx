import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-details.module.css'

const OrderDetails = () => {
    return (
        <div className={styles.container}>
            <p className="pt-30 text text_type_digits-large">034536</p>
            <p className="pt-8 text text_type_main-default">идентификатор заказа</p>
            <CheckMarkIcon type="primary" className="pt-15"></CheckMarkIcon>
            <p className="pt-15 text text_type_main-small">Ваш заказ начали готовить</p>
            <p className="pt-2 pb-30 text text_type_main-small text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

export { OrderDetails };
