import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './register.module.css';
//import { useAuth } from '../services/auth';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

export const Register = () => {
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
    const register = () => {
        // TODO: 
    }
    return (
        <div className={styles.container}>
            <p className="text text_type_main-medium">Регистрация</p>
            <form>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={onChange}
                    //icon={'CurrencyIcon'}
                    value={form.name}
                    name={'name'}
                    error={false}
                    //ref={inputRef}
                    //onIconClick={onIconClick}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mt-6"
                />
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
                    <Button htmlType="button" type="primary" size="large" onClick={register}>
                        Зарегистрироваться
                    </Button>
                </div>
            </form>
            <p className="text_color_inactive">Уже зарегистрированы? <Link to='/login'>Войти</Link></p>
        </div>
    );
}