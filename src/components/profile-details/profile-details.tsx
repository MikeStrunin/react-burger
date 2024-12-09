import React, { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from "../../services/hooks";
import styles from './profile-details.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { updateUser } from '../../services/actions/user';
import { TUserData } from '../../utils/types';

export const ProfileDetails = (): React.JSX.Element => {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user.user);
    const [form, setValue] = useState<TUserData | null>(user); // user Or { ...user, password: "" }
    const [isHideMode, setHideMode] = useState<boolean>(true);
    const inputRef = React.useRef<HTMLInputElement>(null)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (form) {
            setValue({ ...form, [e.target.name]: e.target.value });
        }
    };
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
        if (form) {
            dispatch(updateUser(form));
        }
    };
    const onCancelButtonClick = () => {
        setValue(user);
    }

    return (
        <form onSubmit={formSubmit} className={styles.item}>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={onChange}
                icon={'EditIcon'}
                value={form?.name ?? ""}
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
                value={form?.email ?? ""}
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
                value={form?.password ?? ""}
                name={'password'}
                error={false}
                ref={inputRef}
                onIconClick={onHideShowIconClick}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mt-6"
            />
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