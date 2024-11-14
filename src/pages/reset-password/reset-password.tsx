import React, { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './reset-password.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { passwordResetReset } from '../../services/api';
import { useForm } from '../../utils/useForm';
import { TUserPasswordResetResetData } from '../../utils/types';

export const ResetPassword = (): React.JSX.Element => {
    const [formData, onChange] = useForm<TUserPasswordResetResetData>({ code: '', password: '' })
    const [isErrorRequest, setIsErrorRequest] = useState<boolean | null>(null);
    const [isHideMode, setHideMode] = useState<boolean>(true);
    const inputRef = React.useRef<HTMLInputElement>(null)
    const navigate = useNavigate();

    const onHideShowIconClick = (e: React.MouseEvent<HTMLDivElement>) => {
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }, 0)
        setHideMode(!isHideMode);
    }
    const formSubmit = (e: FormEvent) => {
        e.preventDefault();
        passwordResetReset(formData)
            .then(() => {
                localStorage.removeItem("resetPassword")
                navigate('/login')
            })
            .catch((err) => setIsErrorRequest(err?.message));
    };

    if (!localStorage.getItem("resetPassword")) {
        navigate('/forgot-password');
    }

    return (
        <div className={styles.container}>
            <p className="text text_type_main-medium">Восстановление пароля</p>
            <form onSubmit={formSubmit}>
                <Input
                    type={isHideMode ? 'password' : 'text'}
                    placeholder={'Введите новый пароль'}
                    onChange={onChange}
                    icon={isHideMode ? 'ShowIcon' : 'HideIcon'}
                    value={formData.password}
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
                    value={formData.code}
                    name={'code'}
                    error={false}
                    //ref={inputRef}
                    //onIconClick={onIconClick}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mt-6"
                />
                <div className={`mt-6 mb-20`}>
                    <Button htmlType="submit" type="primary" size="large">
                        Сохранить
                    </Button>
                </div>

                {isErrorRequest
                    ? (<div className={`mt-5`}>
                        Ошибка при выполнении запроса: {isErrorRequest}
                    </div>)
                    : null
                }

            </form>
            <p className="text_color_inactive">Вспомнили пароль? <Link to='/login'>Войти</Link></p>
        </div>
    );
}