import { NavLink } from 'react-router-dom';
import { useSelector } from '../../services/hooks';
import { BurgerIcon, ProfileIcon, ListIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css'

const AppHeader = (): React.JSX.Element => {
    const user = useSelector((store) => store.user.user);

    const getButtonType = (isRouteActive: boolean) => isRouteActive ? "primary" : "secondary"
    const getTextType = (isRouteActive: boolean) => isRouteActive ? null : "text_color_inactive"
    const linkActiveColor = { color: "#f2f2f3" };

    return (
        <header className={`${styles.header} pt-4 pb-4`}>
            <nav className={styles.nav}>
                <NavLink
                    to='/'
                    style={({ isActive }) => (isActive ? linkActiveColor : undefined)}
                    end
                >
                    {({ isActive }) =>
                        <div className={`${styles.linkContainer} pl-5 pr-5`}>
                            <BurgerIcon type={getButtonType(isActive)} />
                            <span className={`${getTextType(isActive)} pl-2 text text_type_main-default`}>Конструктор</span>
                        </div>
                    }
                </NavLink>

                <NavLink
                    to='/feed'
                    style={({ isActive }) => (isActive ? linkActiveColor : undefined)}
                    end
                >
                    {({ isActive }) =>
                        <div className={`${styles.linkContainer} pl-5 pr-5 ml-2`}>
                            <ListIcon type={getButtonType(isActive)} />
                            <span className={`${getTextType(isActive)} pl-2 text text_type_main-default`}>Лента заказов</span>
                        </div>
                    }
                </NavLink>
            </nav>

            <Logo className='mr-30' />

            <nav className={styles.nav}>
                <NavLink
                    to='/profile'
                    style={({ isActive }) => (isActive ? linkActiveColor : undefined)}
                    end
                >
                    {({ isActive }) =>
                        <div className={`${styles.linkContainer} pl-5 pr-5`}>
                            <ProfileIcon type={getButtonType(isActive)} />
                            <span className={`${getTextType(isActive)} pl-2 text text_type_main-default`}>{user ? user.name : "Личный кабинет"}</span>
                        </div>
                    }
                </NavLink>
            </nav>

        </header >
    )
}

export { AppHeader };