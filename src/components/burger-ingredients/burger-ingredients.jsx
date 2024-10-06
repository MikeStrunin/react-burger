import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Modal } from "../modal/modal.jsx";
import { IngredientDetails } from "../ingredient-details/ingredient-details.jsx";
import { Ingredients } from "./ui/ingredients/ingredients.jsx";
import { IngredientItemType } from "./../../utils/prop-types";
import { Tabs } from "./ui/tabs/tabs.jsx";
import styles from './burger-ingredients.module.css'

const BurgerIngredients = ({ ingredients }) => {
    const [currentIngredient, setCurrentIngredient] = useState(null);
    const bunsIngredients = useMemo(() => ingredients.filter(i => i.type === 'bun'), ingredients);
    const saucesIngredients = useMemo(() => ingredients.filter(i => i.type === 'sauce'), ingredients);
    const mainIngredients = useMemo(() => ingredients.filter(i => i.type === 'main'), ingredients);

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
    ingredients: PropTypes.arrayOf(IngredientItemType.isRequired).isRequired
}

export { BurgerIngredients };