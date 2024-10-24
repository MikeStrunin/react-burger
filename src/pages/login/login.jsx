import React, { useCallback, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import styles from './login.module.css';
//import { useAuth } from '../services/auth';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

export const Login = () => {
    // let auth = useAuth();

    const [form, setValue] = useState({ email: '', password: '' });
    const [isHideMode, setHideMode] = useState(true);
    const inputRef = React.useRef(null)

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };
    const onHideShowIconClick = e => {
        setTimeout(() => inputRef.current.focus(), 0)
        setHideMode(!isHideMode);
    }

    let login = () => { }
    // useCallback(
    //     e => {
    //         e.preventDefault();
    //         auth.signIn(form);
    //     },
    //     [auth, form]
    // );

    // if (auth.user) {
    //     return (<Navigate to={'/'} />);
    // }

    return (
        <div className={styles.container}>
            <p className="text text_type_main-medium">Вход</p>
            <form>
                <Input
                    type={'email'}
                    placeholder={'E-mail'}
                    onChange={onChange}
                    //icon={'CurrencyIcon'}
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
                <div className={`mt-6 mb-20`}>
                    <Button htmlType="button" type="primary" size="large" onClick={login}>
                        Войти
                    </Button>
                </div>
            </form>
            <p className="mb-4 text_color_inactive">Вы - новый пользователь? <Link to='/register'>Зарегистрироваться</Link></p>
            <p className="text_color_inactive">Забыли пароль? <Link to='/forgot-password'>Восстановить пароль</Link></p>
        </div>
    );
}