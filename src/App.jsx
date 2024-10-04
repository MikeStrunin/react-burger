import './App.css'
import { useEffect, useState } from "react";
import { AppHeader } from './components/app-header/app-header';
import { BurgerConstructor } from './components/burger-constructor/burger-constructor.jsx'
import { BurgerIngredients } from './components/burger-ingredients/burger-ingredients.jsx'
//import data from './utils/data.json'
const GET_INGREDIENTS_URL = 'https://norma.nomoreparties.space/api/ingredients'

function App() {

  const [ingredients, setIngredients] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setIsloading(true);
    setError(null);

    fetch(GET_INGREDIENTS_URL)
      .then(res => {
        if (!res.ok) {
          throw new Error("что-то пошло не так");
        }
        return res.json()
      })
      .then(result => {
        if (result.success) {
          setIngredients(result.data)
        }
        setIsloading(false);
      })
      .catch(e => {
        setIsloading(false);
        setError(e.message);
      });
  }, []);


  return (
    <>
      <AppHeader />
      <div className="container">
        {isLoading ? (
          <div className="loading">Поиск...</div>
        ) : error ? (
          <div className="error">
            Ошибка при выполнении запроса: {error}
          </div>
        ) : ingredients && ingredients.length > 0 ? (
          <>
            <div className="item" >
              <BurgerIngredients ingredients={ingredients} />
            </div>
            <div className="item" >
              <BurgerConstructor ingredients={ingredients} />
            </div>
          </>
        ) : (
          <p>Нет результатов</p>
        )}
      </div >
    </>
  )
}

export default App
