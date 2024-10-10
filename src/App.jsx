import './App.css'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppHeader } from './components/app-header/app-header';
import { BurgerConstructor } from './components/burger-constructor/burger-constructor.jsx'
import { BurgerIngredients } from './components/burger-ingredients/burger-ingredients.jsx'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { getIngredients } from "./services/actions/ingredients.js"

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
      <div className="container">
        <DndProvider backend={HTML5Backend}>
          {itemsRequest ? (
            <div className="loading">Поиск...</div>
          ) : itemsError ? (
            <div className="error">
              Ошибка при выполнении запроса: {itemsError}
            </div>
          ) : items && items.length > 0 ? (
            <>
              <div className="item" >
                <BurgerIngredients ingredients={items} />
              </div>
              <div className="item" >
                <BurgerConstructor />
              </div>
            </>
          ) : (
            <p>Нет результатов</p>
          )}
        </DndProvider>
      </div >
    </>
  )
}

export default App
