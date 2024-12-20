import React, { useEffect } from 'react';
import styles from "./orders.module.css";
import { WebsocketStatus } from '../../services/feed/feed';
import { useDispatch, useSelector } from '../../services/hooks';
import { Link, useLocation } from "react-router-dom";
import { wsConnect, wsDisconnect } from '../../services/feed/actions';
import { OrderFeedItem } from '../feed-item/feed-item';
import { WSS_BASE_URL } from '../../services/api';

export const Orders = (): React.JSX.Element => {
    const dispatch = useDispatch();
    let location = useLocation();

    useEffect(() => {
        dispatch(wsConnect(WSS_BASE_URL + "?token=" + localStorage.getItem("accessToken")?.slice(7)));
        return () => {
            dispatch(wsDisconnect());
        };
    }, []);

    const { orders, status } = useSelector(state => state.feed);

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
        <div className={styles.container}>
            <div className={styles.column}>
                <div className={`${styles.conteinerLeftText}`}>
                    {orders?.orders?.map((item) => (
                        <Link
                            key={item._id}
                            to={`/profile/orders/${item.number}`}
                            state={{ background: location }}
                            className={styles.link}
                        >
                            <OrderFeedItem order={item} key={item._id} />
                        </Link>
                    )).reverse()}
                </div>
            </div>
        </div>
    )
}