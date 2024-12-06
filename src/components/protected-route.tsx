import { useSelector } from "../services/hooks";
import { Navigate, useLocation } from "react-router-dom";

type TProtectedRouteProps = {
    onlyUnAuth?: boolean;
    component: React.ReactNode;
}

const Protected = ({ onlyUnAuth = false, component }: TProtectedRouteProps): React.ReactNode => {
    // isAuthChecked это флаг, показывающий что проверка токена произведена
    // при этом результат этой проверки не имеет значения, важно только,
    // что сам факт проверки имел место. 
    const isAuthChecked = useSelector((store) => store.user.isAuthChecked);
    const user = useSelector((store) => store.user.user);
    const location = useLocation();

    if (!isAuthChecked) {
        // Запрос еще выполняется - Выводим прелоадер в ПР
        <div >Загрузка...</div>  // className={styles.loading}
        // Здесь возвращается просто null для экономии времени
        return null;
    }

    if (onlyUnAuth && user) {
        // Пользователь авторизован, но роут предназначен для неавторизованного пользователя
        // Делаем редирект на главную страницу или на тот адрес, что записан в location.state.from
        const { from } = location.state || { from: { pathname: "/" } };
        return <Navigate to={from} />;
    }

    if (!onlyUnAuth && !user) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    // !onlyUnAuth && user Пользователь авторизован и роут для авторизованного пользователя

    return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }: TProtectedRouteProps): React.JSX.Element => (
    <Protected onlyUnAuth={true} component={component} />
);