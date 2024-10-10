import React, { useCallback, useRef, useMemo } from "react";
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from "prop-types";
import { Modal } from "../modal/modal.jsx";
import { IngredientDetails } from "../ingredient-details/ingredient-details.jsx";
import { Ingredients } from "./ui/ingredients/ingredients.jsx";
import { IngredientItemType } from "./../../utils/prop-types";
import { RESET_CURRENT_INGREDIENT } from "../../services/actions/current-ingredient.js"
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-ingredients.module.css'

const BurgerIngredients = ({ ingredients }) => {
    const dispatch = useDispatch();
    const currentIngredient = useSelector((store) => store.currentIngredient.ingredient);
    const [currentTab, setCurrentTab] = React.useState('bun');
    const scrollTitleRef = useRef(null);
    const bunsRef = useRef(null);
    const saucesRef = useRef(null);
    const mainsRef = useRef(null);

    const bunsIngredients = useMemo(() => ingredients.filter(i => i.type === 'bun'), ingredients);
    const saucesIngredients = useMemo(() => ingredients.filter(i => i.type === 'sauce'), ingredients);
    const mainIngredients = useMemo(() => ingredients.filter(i => i.type === 'main'), ingredients);
    const onCloseModal = useCallback(() => {
        dispatch({ type: RESET_CURRENT_INGREDIENT });
    }, []);

    const handleScroll = (e) => {
        // попытки сделать так не увенчались успехом, проблема в вёрстке наверное мешает :
        // const titleBottom = scrollTitleRef.current.getBoundingClientRect().bottom;
        // const bunRange = Math.abs( bunsRef.current.getBoundingClientRect().top - titleBottom);

        const bunRange = Math.abs(bunsRef.current.getBoundingClientRect().top - 100)
        const sauceRange = Math.abs(saucesRef.current.getBoundingClientRect().top - 100)
        const mainRange = Math.abs(mainsRef.current.getBoundingClientRect().top - 100)
        if (bunRange <= sauceRange) {
            setCurrentTab("bun")
        } else if (sauceRange <= mainRange) {
            setCurrentTab("sauce")
        } else {
            setCurrentTab("main")
        }
    }
    return (
        <>
            {currentIngredient && (
                <Modal title={"Детали ингредиента"} onClose={() => onCloseModal()}>
                    <IngredientDetails />
                </Modal>
            )}
            <section className={styles.section}>
                <h1 className={`${styles.caption} pt-10 pb-5 text text_type_main-large main`}>Соберите бургер</h1>
                <div className={styles.tabs}>
                    <Tab value="bun" active={currentTab === 'bun'} onClick={() => setCurrentTab("bun")}>
                        Булки
                    </Tab>
                    <Tab value="sauce" active={currentTab === 'sauce'} onClick={() => setCurrentTab("sauce")}>
                        Соусы
                    </Tab>
                    <Tab value="main" active={currentTab === 'main'} onClick={() => setCurrentTab("main")}>
                        Начинки
                    </Tab>
                </div>
                <div className={styles.sectionIngredients} onScroll={handleScroll} ref={scrollTitleRef}>
                    <Ingredients refValue={bunsRef} caption={"Булки"} ingredients={bunsIngredients} />
                    <Ingredients refValue={saucesRef} caption={"Соусы"} ingredients={saucesIngredients} />
                    <Ingredients refValue={mainsRef} caption={"Начинки"} ingredients={mainIngredients} />
                </div>
            </section>
        </>
    )
}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(IngredientItemType.isRequired).isRequired
}

export { BurgerIngredients };