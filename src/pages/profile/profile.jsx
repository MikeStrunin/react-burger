import React from 'react';
import { useDispatch } from "react-redux";
import { NavLink, Outlet } from 'react-router-dom';
import styles from './profile.module.css';
import { logout } from '../../services/actions/user';

export const Profile = () => {
    const dispatch = useDispatch();
    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <nav className={styles.navigation}>
                    <NavLink
                        to='/profile'
                        className={`text text_type_main-medium text_color_inactive `}
                        style={({ isActive }) => (isActive ? { color: "#f2f2f3" } : null)}
                        end
                    >
                        Профиль
                    </NavLink>
                    <NavLink
                        to='orders'
                        className={`text text_type_main-medium text_color_inactive `}
                        style={({ isActive }) => (isActive ? { color: "#f2f2f3" } : null)}
                        state={{ order: true }}
                        end
                    >
                        История заказов
                    </NavLink>
                    <NavLink
                        onClick={() => dispatch(logout())}
                        className={`text text_type_main-medium text_color_inactive`}
                    >
                        Выход
                    </NavLink>
                </nav>
                <p className={`${styles.infoText} text text_type_main-small text_color_inactive mt-20`}>В этом разделе вы можете изменить свои персональные данные</p>
            </div>
            <Outlet />
        </div>
    );
}