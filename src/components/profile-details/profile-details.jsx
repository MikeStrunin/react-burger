import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import styles from './profile-details.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { updateUser } from '../../services/actions/user';


export const ProfileDetails = () => {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user.user);
    const [form, setValue] = useState(user); // user Or { ...user, password: "" }
    const [isHideMode, setHideMode] = useState(true);
    const inputRef = React.useRef(null)

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };
    const onHideShowIconClick = e => {
        setTimeout(() => inputRef.current.focus(), 0)
        setHideMode(!isHideMode);
    }
    const formSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUser(form));
    };
    const onCancelButtonClick = e => {
        setValue(user);
    }

    return (
        <form onSubmit={formSubmit} className={styles.item}>
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
                value={form.password ?? ""}
                name={'password'}
                error={false}
                ref={inputRef}
                onIconClick={onHideShowIconClick}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mt-6"
            />
            {/* (user.name !== form.name || user.email !== form.email || form.password !== null */}
            {JSON.stringify(user) !== JSON.stringify(form) // сравнение
                ? (
                    <div className={`${styles.buttons} mt-6 mb-20`}>
                        <Button htmlType="button" type="secondary" size="large" onClick={onCancelButtonClick}>
                            Отменить
                        </Button>
                        <Button htmlType="submit" type="primary" size="large">
                            Сохранить
                        </Button>
                    </div>)
                : null
            }
        </form>
    )
}