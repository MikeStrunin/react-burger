import React from 'react';
import styles from './orders-status-info.module.css';
import { useMemo } from "react";
import { useSelector } from '../../services/hooks';
import { OrderStatusType } from '../../utils/types';

export const OrdersStatusInfo = (): React.JSX.Element => {
  const { orders } = useSelector(state => state.feed);

  const doneOrdersNumbers = useMemo(
    () => orders.orders.filter(elem => elem.status === OrderStatusType.DONE).slice(0, 10),
    [orders]
  );

  const processedOrdersNumbers = useMemo(
    () => orders.orders.filter(elem => elem.status !== OrderStatusType.DONE).slice(0, 10),
    [orders]
  );

  return (
    <div className={`${styles.container} pl-15`}>

      <div className={styles.divContainer}>
        <div className={styles.column}>
          <p className="text text_type_main-medium pb-6">Готовы:</p>
          <div className={styles.divContainer}>
            <div className={styles.column}>
              {doneOrdersNumbers.slice(0, 5).map((item) => (
                <p className={`${styles.greenColor} text text_type_digits-default pb-2`} key={item._id}>{item.number}</p>
              ))}
            </div>
            <div className={styles.column}>
              {doneOrdersNumbers.slice(5, 10).map((item) => (
                <p className={`${styles.greenColor} text text_type_digits-default pb-2`} key={item._id}>{item.number}</p>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.column}>
          <p className="text text_type_main-medium pb-6">В работе:</p>
          <div className={styles.divContainer}>
            <div className={styles.column}>
              {processedOrdersNumbers.slice(0, 5).map((item) => (
                <p className="text text_type_digits-default pb-2" key={item._id}>{item.number}</p>
              ))}
            </div>
            <div className={styles.column}>
              {processedOrdersNumbers.slice(5, 10).map((item) => (
                <p className="text text_type_digits-default pb-2" key={item._id}>{item.number}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className="text text_type_main-medium pt-15">Выполнено за все время:</p>
      <p className="text text_type_digits-large">{orders.total}</p>
      <p className="text text_type_main-medium pt-15">Выполнено за сегодня:</p>
      <p className="text text_type_digits-large">{orders.totalToday}</p>
    </div>
  );
}