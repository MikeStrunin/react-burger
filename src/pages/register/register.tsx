import React, { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './register.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { register as registerApi } from '../../services/api';
import { useForm } from '../../utils/useForm';
import { TUserRegisterData } from '../../utils/types';

export const Register = (): React.JSX.Element => {
    const [formData, onChange] = useForm<TUserRegisterData>({ name: '', email: '', password: '' })
    const [isHideMode, setHideMode] = useState<boolean>(true);
    const inputRef = React.useRef<HTMLInputElement>(null)

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
        registerApi(formData)
    };

    return (
        <div className={styles.container}>
            <p className="text text_type_main-medium">Регистрация</p>
            <form onSubmit={formSubmit}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={onChange}
                    //icon={'CurrencyIcon'}
                    value={formData.name}
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
                    value={formData.email}
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
                    value={formData.password}
                    name={'password'}
                    error={false}
                    ref={inputRef}
                    onIconClick={onHideShowIconClick}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mt-6"
                />
                <div className={`mt-6 mb-20`}>
                    <Button htmlType="submit" type="primary" size="large">
                        Зарегистрироваться
                    </Button>
                </div>
            </form>
            <p className="text_color_inactive">Уже зарегистрированы? <Link to='/login'>Войти</Link></p>
        </div>
    );
}