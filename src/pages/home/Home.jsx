import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './home.module.css'
import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients'
import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor'


export const HomePage = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <div className={styles.container}>
                <div className={styles.item}>
                    <BurgerIngredients />
                </div>
                <div className={styles.item}>
                    <BurgerConstructor />
                </div>
            </div>
        </DndProvider>
    )
}