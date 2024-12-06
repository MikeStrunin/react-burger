import React, { useMemo } from 'react';
import styles from './feed-item.module.css';
import { useSelector } from '../../services/hooks';
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { OrderStatusType, TIngredientItemType, TOrderFeedItem } from '../../utils/types';

type TOrderFeedItemProps = {
    order: TOrderFeedItem
}

export const OrderFeedItem = ({ order }: TOrderFeedItemProps): React.JSX.Element => {
    const { ingredientsMap } = useSelector(state => state.ingredients);
    const user = useSelector(store => store.user.user);
    const orderIngredients = useMemo(
        () => order.ingredients.map((i) => ingredientsMap.get(i)).filter(elem => !!elem),
        [order]
    );

    const totalPrice = useMemo(
        () => orderIngredients?.reduce((accumulator: number, current: TIngredientItemType) => accumulator + current.price, 0),
        [orderIngredients]
    );

    const distinctOrderIngredients = [...new Set(orderIngredients)];

    return (
        <div className="pt-5 pr-2">
            <div className={`${styles.container} p-5`}>
                <div className={styles.title}>
                    <p className="text text_type_digits-default">
                        #{order?.number}
                    </p>
                    <p className="text text_type_main-default text_color_inactive">
                        <FormattedDate date={new Date(order?.updatedAt ?? order?.createdAt)} />
                    </p>
                </div>
                <p className={`${styles.text} text text_type_main-medium pt-6`}>
                    {order?.name}
                </p>
                {user && order?.status === OrderStatusType.DONE &&
                    <p className={`${styles.greenColor} ${styles.text} text text_type_main-smal`}>
                        Выполнен
                    </p>
                }
                {user && order?.status === OrderStatusType.PENDING &&
                    <p className={`${styles.text} text text_type_main-smal`}>
                        Готовится
                    </p>
                }
                {user && order?.status === OrderStatusType.CREATED &&
                    <p className={`${styles.text} text text_type_main-smal`}>
                        Создан
                    </p>
                }
                <div className={`${styles.title} pt-6`}>
                    <div className={styles.images}>
                        {
                            distinctOrderIngredients.slice(0, 6).map((item, i) => (
                                <div key={i} className={styles.imageWrapper} style={{ left: -i * 15, zIndex: 100 - i }}>
                                    <img src={item.image} alt={item.name} key={item._id} className={styles.image} />
                                    {i == 5 && i !== distinctOrderIngredients.length - 1 &&
                                        <p className={`${styles.count} text text_type_digits-default`}>{'+' + (distinctOrderIngredients.length - 6)}</p>}
                                </div>
                            ))
                        }
                    </div>
                    <div className={styles.text}>
                        <p className="text text_type_digits-default pr-2">{totalPrice}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
        </div>
    )
}