import React, { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './login.module.css';
import { useDispatch } from "../../services/hooks";
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { login } from '../../services/actions/user';
import { useForm } from '../../utils/useForm';
import { TUserLoginData } from '../../utils/types';


export const Login = (): React.JSX.Element => {
    const dispatch = useDispatch();
    const [formData, onChange] = useForm<TUserLoginData>({ email: '', password: '' })

    const [isHideMode, setHideMode] = useState<boolean>(true);
    const inputRef = React.useRef<HTMLInputElement | null>(null)

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
        dispatch(login(formData));
    };

    return (
        <div className={styles.container}>
            <p className="text text_type_main-medium">Вход</p>
            <form onSubmit={formSubmit}>
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
                    data-testid="email_input"
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
                    data-testid="password_input"
                />
                <div className={`mt-6 mb-20`}>
                    <Button htmlType="submit" type="primary" size="large">
                        Войти
                    </Button>
                </div>
            </form>
            <p className="mb-4 text_color_inactive">Вы - новый пользователь? <Link to='/register'>Зарегистрироваться</Link></p>
            <p className="text_color_inactive">Забыли пароль? <Link to='/forgot-password'>Восстановить пароль</Link></p>
        </div>
    );
}