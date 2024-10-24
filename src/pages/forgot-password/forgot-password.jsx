import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './forgot-password.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

export const ForgotPassword = () => {

    const [form, setValue] = useState({ email: '' });

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };
    const recover = () => {
        // TODO: 
    }
    return (
        <div className={styles.container}>
            <p className="text text_type_main-medium">Восстановление пароля</p>
            <form>
                <Input
                    type={'email'}
                    placeholder={'Укажите e-mail'}
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
                <div className={`mt-6 mb-20`}>
                    <Button htmlType="button" type="primary" size="large" onClick={recover}>
                        Восстановить
                    </Button>
                </div>
            </form>
            <p className="text_color_inactive">Вспомнили пароль? <Link to='/login'>Войти</Link></p>
        </div>
    );
}