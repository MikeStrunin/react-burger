import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppHeader } from '../app-header/app-header.jsx'
import { BurgerConstructor } from '..//burger-constructor/burger-constructor.jsx'
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients.jsx'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { getIngredients } from '../../services/actions/ingredients.js';

import styles from './app.module.css'

const App = () => {
  const dispatch = useDispatch();
  const { items, itemsRequest, itemsError } = useSelector(state => state.ingredients);

  useEffect(
    () => {
      dispatch(getIngredients());
    },
    [dispatch]
  );

  return (
    <>
      <AppHeader />
      <main className={styles.container}>
        <DndProvider backend={HTML5Backend}>
          {itemsRequest ? (
            <div className={styles.loading}>Поиск...</div>
          ) : itemsError ? (
            <div className={styles.error}>
              Ошибка при выполнении запроса: {itemsError}
            </div>
          ) : items && items.length > 0 ? (
            <>
              <div className={styles.item}>
                <BurgerIngredients />
              </div>
              <div className={styles.item}>
                <BurgerConstructor />
              </div>
            </>
          ) : (
            <p>Нет результатов</p>
          )}
        </DndProvider>
      </main>
    </>
  )
}

export default App
