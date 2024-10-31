import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './forgot-password.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { passwordReset } from '../../services/api';
import { useForm } from '../../utils/useForm';

export const ForgotPassword = () => {
    const [formData, onChange] = useForm({ email: "" })
    const [isErrorRequest, setIsErrorRequest] = useState(null);
    const navigate = useNavigate();

    const formSubmit = (e) => {
        e.preventDefault();
        passwordReset(formData)
            .then(() => {
                localStorage.setItem("resetPassword", true);
                navigate('/reset-password')
            })
            .catch((err) => setIsErrorRequest(err?.message));
    };

    return (
        <div className={styles.container}>
            <p className="text text_type_main-medium">Восстановление пароля</p>
            <form onSubmit={formSubmit}>
                <Input
                    type={'email'}
                    placeholder={'Укажите e-mail'}
                    onChange={onChange}
                    //icon={'CurrencyIcon'}
                    value={formData.email}
                    name={'email'}
                    error={false}
                    //ref={inputRef}
                    //onIconClick={onIconClick}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mt-6"
                />
                <div className={`mt-6 mb-20`}>
                    <Button htmlType="submit" type="primary" size="large">
                        Восстановить
                    </Button>
                </div>

                {isErrorRequest
                    ? (<div className={`mb-10`}>
                        Ошибка при выполнении запроса: {isErrorRequest}
                    </div>)
                    : null
                }
            </form>
            <p className="text_color_inactive">Вспомнили пароль? <Link to='/login'>Войти</Link></p>
        </div>
    );
}