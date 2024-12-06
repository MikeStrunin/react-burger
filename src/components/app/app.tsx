import { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AppHeader } from '../app-header/app-header'
import { getIngredients } from '../../services/actions/ingredients.js';
import { Home } from "../../pages/home/home";
import { Login } from "../../pages/login/login";
import { NotFound404 } from "../../pages/not-found/not-found";
import { Register } from "../../pages/register/register";
import { ForgotPassword } from "../../pages/forgot-password/forgot-password";
import { ResetPassword } from "../../pages/reset-password/reset-password";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { Profile } from "../../pages/profile/profile";
import { OnlyAuth, OnlyUnAuth } from "../protected-route"
import { Modal } from "../modal/modal";
import { checkUserAuth } from "../../services/actions/user";
import styles from './app.module.css'
import { ProfileDetails } from "../profile-details/profile-details";
import { Orders } from "../orders/orders";
import { useDispatch, useSelector } from "../../services/hooks";
import { Feed } from "../../pages/feed/feed";
import { OrderInfo } from "../order-info/order-info";

const App = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const { items, itemsRequest, itemsError } = useSelector(state => state.ingredients);
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const handleModalClose = () => {
    // Возвращаемся к предыдущему пути при закрытии модалки
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    dispatch(checkUserAuth());
  }, []);

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
              <Route path='/ingredients/:ingredientId' element={<IngredientDetails />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/feed/:number" element={<OrderInfo />} />

              <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
              <Route path="/register" element={<OnlyUnAuth component={<Register />} />} />
              <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPassword />} />} />
              <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPassword />} />} />


              <Route path="/profile" element={<OnlyAuth component={<Profile />} />}>
                <Route path="/profile/" element={<OnlyAuth component={<ProfileDetails />} />} />
                <Route path="/profile/orders" element={<OnlyAuth component={<Orders />} />} />
                <Route path="/profile/orders/:number" element={<OnlyAuth component={<OrderInfo />} />} />
              </Route>

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
                <Route path="/feed/:number"
                  element={
                    <Modal title="" onClose={handleModalClose}>
                      <OrderInfo />
                    </Modal>
                  } />
                <Route path="/profile/orders/:number"
                  element={
                    <Modal title="" onClose={handleModalClose}>
                      <OrderInfo />
                    </Modal>
                  } />
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
