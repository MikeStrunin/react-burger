import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppHeader } from '../app-header/app-header.jsx'
import { getIngredients } from '../../services/actions/ingredients.js';
import { HomePage } from '../../pages/home/Home.jsx'
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
        {itemsRequest ? (
          <div className={styles.loading}>Поиск...</div>
        ) : itemsError ? (
          <div className={styles.error}>
            Ошибка при выполнении запроса: {itemsError}
          </div>
        ) : items && items.length > 0 ? (
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>
          </Router>
        ) : (
          <p>Нет результатов</p>
        )}
      </main >
    </>
  )
}

export default App
