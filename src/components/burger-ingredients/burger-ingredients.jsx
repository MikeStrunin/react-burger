import React, { useState } from "react";
import PropTypes from "prop-types";
import { Counter, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientDetails } from "../ingredient-details/ingredient-details.jsx";
import { Modal } from "../modal/modal.jsx";
import { IngredientItemType } from "./../../utils/prop-types";
import styles from './burger-ingredients.module.css'
const Ingredients = ({ ingredients, caption, setCurrentIngredient }) => {
    return (
        <>
            <h2 className={`${styles.caption} mt-10 text text_type_main-medium`}>{caption}</h2>
            <ul className={`${styles.ulContainer} pl-4 pt-6`}>
                {ingredients.map((item, index) => (
                    <li className={styles.liContainer} key={item._id} >
                        <Ingredient item={item} setCurrentIngredient={setCurrentIngredient} />
                    </li>
                ))}
            </ul>
        </>
    )
}

const Ingredient = ({ item, setCurrentIngredient }) => {
    return (
        <div className={styles.ingredientContainer} onClick={(e) => setCurrentIngredient(item)}>
            <div className={`${styles.ingredientInfoContainer} ml-4 mr-4`}>
                <img className={styles.image} src={item.image} />
                <div className={`${styles.price} mt-1 mb-1`}>
                    <span className="mr-2 text text_type_digits-small">{item.price}</span>
                    <CurrencyIcon type="primary"> </CurrencyIcon>
                </div>
            </div>
            <span className="text text_type_main-small">{item.name}</span>
            <Counter count={1} size="default" extraClass="m-1" />
        </div>
    )
}

const Tabs = () => {
    const [current, setCurrent] = React.useState('one')
    return (
        <div className={styles.tabs}>
            <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                Булки
            </Tab>
            <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                Соусы
            </Tab>
            <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                Начинки
            </Tab>
        </div>
    )
}

const BurgerIngredients = ({ ingredients }) => {
    const [currentIngredient, setCurrentIngredient] = useState(null);
    const bunsIngredients = ingredients.filter(i => i.type === 'bun');
    const saucesIngredients = ingredients.filter(i => i.type === 'sauce');
    const mainIngredients = ingredients.filter(i => i.type === 'main');

    return (
        <>
            {currentIngredient && (
                <Modal title={"Детали ингредиента"} onClose={() => setCurrentIngredient(null)}>
                    <IngredientDetails ingredient={currentIngredient}></IngredientDetails>
                </Modal>
            )}
            <section className={styles.section}>
                <h1 className={`${styles.caption} pt-10 pb-5 text text_type_main-large main`}>Соберите бургер</h1>
                <Tabs />
                <div className={styles.sectionIngredients}>
                    <Ingredients caption={"Булки"} ingredients={bunsIngredients} setCurrentIngredient={setCurrentIngredient} />
                    <Ingredients caption={"Соусы"} ingredients={saucesIngredients} setCurrentIngredient={setCurrentIngredient} />
                    <Ingredients caption={"Начинки"} ingredients={mainIngredients} setCurrentIngredient={setCurrentIngredient} />
                </div>
            </section>
        </>
    )
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(IngredientItemType).isRequired
}

Ingredient.propTypes = {
    item: IngredientItemType.isRequired,
    setCurrentIngredient: PropTypes.func.isRequired,
}

Ingredients.propTypes = {
    ingredients: PropTypes.arrayOf(IngredientItemType).isRequired,
    caption: PropTypes.string,
    setCurrentIngredient: PropTypes.func.isRequired,
}

export { BurgerIngredients };