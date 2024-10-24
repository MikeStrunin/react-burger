import React, { useCallback, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './profile.module.css';
//import { useAuth } from '../services/auth';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

export const Profile = () => {
    // let auth = useAuth();

    const [form, setValue] = useState({ name: '', email: '', password: '' });
    const [isHideMode, setHideMode] = useState(true);
    const inputRef = React.useRef(null)

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };
    const onHideShowIconClick = e => {
        setTimeout(() => inputRef.current.focus(), 0)
        setHideMode(!isHideMode);
    }

    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <nav className={styles.navigation}>
                    <NavLink
                        to='/profile'
                        className={`text text_type_main-medium text_color_inactive `}
                        style={({ isActive }) => (isActive ? { color: "#f2f2f3" } : undefined)}
                        end
                    >
                        Профиль
                    </NavLink>
                    <NavLink
                        to='order-page'
                        className={`text text_type_main-medium text_color_inactive `}
                        style={({ isActive }) => (isActive ? { color: "#f2f2f3" } : undefined)}
                        state={{ order: true }}
                        end
                    >
                        История заказов
                    </NavLink>
                    <NavLink
                        //onClick={() => dispatch(logoutUser(() => navigate('/login')))}
                        className={`text text_type_main-medium text_color_inactive`}
                    >
                        Выход
                    </NavLink>
                </nav>
                <p className={`${styles.infoText} text text_type_main-small text_color_inactive mt-20`}>В этом разделе вы можете изменить свои персональные данные</p>
            </div>
            <form className={styles.item}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={onChange}
                    icon={'EditIcon'}
                    value={form.name}
                    name={'name'}
                    error={false}
                    //ref={inputRef}
                    //onIconClick={onIconClick}
                    errorText={'Ошибка'}
                    size={'default'}
                //extraClass="mt-6"
                />
                <Input
                    type={'email'}
                    placeholder={'Логин'}
                    onChange={onChange}
                    icon={'EditIcon'}
                    value={form.email}
                    name={'email'}
                    error={false}
                    //ref={inputRef}
                    //onIconClick={onIconClick}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mt-6"
                />
                <Input
                    type={isHideMode ? 'password' : 'text'}
                    placeholder={'Пароль'}
                    onChange={onChange}
                    icon={isHideMode ? 'ShowIcon' : 'HideIcon'}
                    value={form.password}
                    name={'password'}
                    error={false}
                    ref={inputRef}
                    onIconClick={onHideShowIconClick}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mt-6"
                />
            </form>
        </div>
    );
}