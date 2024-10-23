import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AppHeader } from '../app-header/app-header.jsx'
import { getIngredients } from '../../services/actions/ingredients.js';
import { HomePage } from '../../pages/home/Home.jsx'
import { IngredientDetails } from "../ingredient-details/ingredient-details.jsx";
import { Modal } from "../modal/modal.jsx";
import styles from './app.module.css'

const App = () => {
  const dispatch = useDispatch();
  const { items, itemsRequest, itemsError } = useSelector(state => state.ingredients);
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const handleModalClose = () => {
    // Возвращаемся к предыдущему пути при закрытии модалки
    navigate(-1);
  };

  useEffect(
    () => {
      dispatch(getIngredients());
    },
    [dispatch]
  );

  return (
    <>
      <AppHeader />
      <main>
        {itemsRequest ? (
          <div className={styles.loading}>Поиск...</div>
        ) : itemsError ? (
          <div className={styles.error}>
            Ошибка при выполнении запроса: {itemsError}
          </div>
        ) : items && items.length > 0 ? (
          <>
            <Routes location={background || location}>
              <Route path='/' element={<HomePage />} />
              <Route path='/ingredients/:ingredientId' element={<IngredientDetails />} />
              {/* <Route path="*" element={<NotFound404 />} /> */}
            </Routes>

            {background && (
              <Routes>
                <Route path='/ingredients/:ingredientId'
                  element={
                    <Modal onClose={handleModalClose}>
                      <IngredientDetails />
                    </Modal>
                  }
                />
              </Routes>
            )}
          </>
        ) : (
          <p>Нет результатов</p>
        )}
      </main >
    </>
  )
}

export default App
