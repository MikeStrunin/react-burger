import './App.css'
import { useEffect, useState } from "react";
import { AppHeader } from './components/app-header/app-header';
import { BurgerConstructor } from './components/burger-constructor/burger-constructor.jsx'
import { BurgerIngredients } from './components/burger-ingredients/burger-ingredients.jsx'
//import data from './utils/data.json'
const GET_INGREDIENTS_URL = 'https://norma.nomoreparties.space/api/ingredients'

function App() {

  const [ingredients, setIngredients] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    setError(false);

    fetch(GET_INGREDIENTS_URL)
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          setIngredients(result.data)
        }
        setLoading(false);
      })
      .catch(e => {
        setLoading(false);
        setError(true);
      });
  }, []);


  return (
    <>
      <AppHeader />
      <div className="container">
        {loading ? (
          <div className="loading">Поиск...</div>
        ) : error ? (
          <div className="error">
            Что-то пошло не так:
            <div className="error-contents">{error.message}</div>
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
