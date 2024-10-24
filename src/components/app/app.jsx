import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AppHeader } from '../app-header/app-header.jsx'
import { getIngredients } from '../../services/actions/ingredients.js';
import { Home } from "../../pages/home/home.jsx";
import { Login } from "../../pages/login/login.jsx";
import { NotFound404 } from "../../pages/not-found/not-found.jsx";
import { Register } from "../../pages/register/register.jsx";
import { ForgotPassword } from "../../pages/forgot-password/forgot-password.jsx";
import { ResetPassword } from "../../pages/reset-password/reset-password.jsx";
import { IngredientDetails } from "../ingredient-details/ingredient-details.jsx";
import { Profile } from "../../pages/profile/profile.jsx";
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
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path='/reset-password' element={<ResetPassword />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/ingredients/:ingredientId' element={<IngredientDetails />} />
              <Route path="*" element={<NotFound404 />} />
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
