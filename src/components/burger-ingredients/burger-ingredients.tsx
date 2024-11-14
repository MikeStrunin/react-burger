import React, { useRef, useMemo } from "react";
import { useSelector } from 'react-redux';
import { Ingredients } from "./ui/ingredients/ingredients";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-ingredients.module.css'

const BurgerIngredients = (): React.JSX.Element => {// @ts-ignore.
    const ingredients = useSelector(store => store.ingredients.items);
    const [currentTab, setCurrentTab] = React.useState<string>('bun');
    const scrollTitleRef = useRef<HTMLDivElement | null>(null);
    const bunsRef = useRef<HTMLHeadingElement | null>(null);
    const saucesRef = useRef<HTMLHeadingElement | null>(null);
    const mainsRef = useRef<HTMLHeadingElement | null>(null);

    // @ts-ignore.
    const bunsIngredients = useMemo(() => ingredients.filter(i => i.type === 'bun'), ingredients);
    // @ts-ignore.
    const saucesIngredients = useMemo(() => ingredients.filter(i => i.type === 'sauce'), ingredients);
    // @ts-ignore.
    const mainIngredients = useMemo(() => ingredients.filter(i => i.type === 'main'), ingredients);

    const handleScroll = () => {
        // попытки сделать так не увенчались успехом, проблема в вёрстке наверное мешает :
        // const titleBottom = scrollTitleRef.current.getBoundingClientRect().bottom;
        // const bunRange = Math.abs( bunsRef.current.getBoundingClientRect().top - titleBottom);

        if (!bunsRef?.current || !saucesRef?.current || !mainsRef?.current) {
            return;
        }
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