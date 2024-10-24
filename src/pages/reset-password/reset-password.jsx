import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './reset-password.module.css';
//import { useAuth } from '../services/auth';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

export const ResetPassword = () => {
    // let auth = useAuth();

    const [form, setValue] = useState({ code: '', password: '' });
    const [isHideMode, setHideMode] = useState(true);
    const inputRef = React.useRef(null)

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };
    const onHideShowIconClick = e => {
        setTimeout(() => inputRef.current.focus(), 0)
        setHideMode(!isHideMode);
    }
    const resetPassword = () => {
        // TODO: 
    }
    return (
        <div className={styles.container}>
            <p className="text text_type_main-medium">Восстановление пароля</p>
            <form>
                <Input
                    type={isHideMode ? 'password' : 'text'}
                    placeholder={'Введите новый пароль'}
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
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={onChange}
                    //icon={'CurrencyIcon'}
                    value={form.code}
                    name={'code'}
                    error={false}
                    //ref={inputRef}
                    //onIconClick={onIconClick}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mt-6"
                />
                <div className={`mt-6 mb-20`}>
                    <Button htmlType="button" type="primary" size="large" onClick={resetPassword}>
                        Сохранить
                    </Button>
                </div>
            </form>
            <p className="text_color_inactive">Вспомнили пароль? <Link to='/login'>Войти</Link></p>
        </div>
    );
}