import React, { useEffect } from 'react';
import styles from './feed.module.css';
import { OrderFeedItem } from '../../components/feed-item/feed-item';
import { OrdersStatusInfo } from '../../components/orders-status-info/orders-status-info';
import { useDispatch, useSelector } from '../../services/hooks';
import { wsConnect, wsDisconnect } from '../../services/feed/actions';
import { WebsocketStatus } from '../../services/feed/feed';
import { Link, useLocation } from "react-router-dom";
import { WSS_BASE_URL } from '../../services/api';

export const Feed = (): React.JSX.Element => {
    const dispatch = useDispatch();
    const { orders, status } = useSelector(state => state.feed);
    let location = useLocation();

    useEffect(() => {
        dispatch(wsConnect(WSS_BASE_URL + "/all"));
        return () => { dispatch(wsDisconnect()); };
    }, []);


    if (orders?.orders?.length == 0) {
        if (status === WebsocketStatus.CONNECTING) {
            return <p className="text text_type_main-default text_color_inactive">Поиск...</p>
        } else if (status === WebsocketStatus.OFFLINE) {
            return <p className="text text_type_main-default text_color_inactive">Ожидание...</p>
        } else {
            return <p className="text text_type_main-default text_color_inactive">Нет данных о заказах</p>
        }
    }

    return (
        <section className={styles.section}>
            <h1 className={`${styles.caption} pt-10 pb-5 text text_type_main-large main`}>Лента заказов</h1>
            <div className={styles.column}>
                <div className={`${styles.containerScroll}`}>
                    {orders.orders.map((item) => (
                        <Link
                            key={item._id}
                            to={`/feed/${item.number}`}
                            state={{ background: location }}
                            className={styles.link}
                        >
                            <OrderFeedItem order={item} key={item._id} />
                        </Link>
                    ))}
                </div>
            </div>

            <div className={styles.column}>
                <OrdersStatusInfo />
            </div>
        </section>
    );
}

