import React, { useRef, useMemo } from "react";
import { useSelector } from 'react-redux';
import { Ingredients } from "./ui/ingredients/ingredients.jsx";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-ingredients.module.css'

const BurgerIngredients = () => {
    const ingredients = useSelector(store => store.ingredients.items);
    const [currentTab, setCurrentTab] = React.useState('bun');
    const scrollTitleRef = useRef(null);
    const bunsRef = useRef(null);
    const saucesRef = useRef(null);
    const mainsRef = useRef(null);

    const bunsIngredients = useMemo(() => ingredients.filter(i => i.type === 'bun'), ingredients);
    const saucesIngredients = useMemo(() => ingredients.filter(i => i.type === 'sauce'), ingredients);
    const mainIngredients = useMemo(() => ingredients.filter(i => i.type === 'main'), ingredients);

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

export { BurgerIngredients };