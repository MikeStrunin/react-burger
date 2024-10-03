import { BurgerIcon, ProfileIcon, ListIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css'

const AppHeader = () => {
    return (
        <header className={`${styles.header} pt-4 pb-4`}>
            <nav className={styles.nav}>
                <a href="TODO: url?" className={`${styles.a} pl-5 pr-5`}>
                    <BurgerIcon type="primary" />
                    <span className='pl-2 text text_type_main-default'>Конструктор</span>
                </a>
                <a href="TODO: url?" className={`${styles.a} pl-5 pr-5 ml-2`}>
                    <ListIcon type="disabled" />
                    <span className='pl-2 text text_type_main-default'>Лента заказов</span>
                </a>
            </nav>

            <Logo className='mr-30' />

            <nav className={styles.nav}>
                <a href="TODO: url?" className={`${styles.a} pl-5 pr-5`}>
                    <ProfileIcon type="disabled" />
                    <span className='pl-2 text text_type_main-default'>Личный кабинет</span>
                </a>
            </nav>

        </header >
    )
}

export { AppHeader };