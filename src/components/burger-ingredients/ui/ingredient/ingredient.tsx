import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, } from "react-router-dom";
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './ingredient.module.css'
import { useMemo } from "react";
import { useDrag } from "react-dnd";
import { DndItemTypes } from "../../../../utils/DndItemTypes"
import { TDragCollectedProps, TIngredientItemType } from "../../../../utils/types";

type TIngredient = { item: TIngredientItemType }

export const Ingredient = ({ item }: TIngredient): React.JSX.Element => {
    const location = useLocation();// @ts-ignore.
    const { bun, ingredients } = useSelector(store => store.burgerConstructor);
    const count = useMemo(() => {
        if (item.type === "bun") {
            return bun?._id === item._id ? 2 : 0;
        } else {// @ts-ignore.
            return ingredients.filter(elem => elem._id === item._id).length;
        }
    }, [bun, ingredients]);

    const [{ isDragging }, drag] = useDrag<TIngredientItemType, unknown, TDragCollectedProps>(() => ({
        type: DndItemTypes.ItemDragDrop,
        item: item,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
    }))

    return (
        <Link key={item._id}
            // Тут мы формируем динамический путь для нашего ингредиента
            to={`/ingredients/${item._id}`}
            // и сохраняем в свойство background роут, на котором была открыта наша модалка
            state={{ background: location }}
        //className={styles.link}
        >
            <div ref={drag}
                className={`${styles.container} ${isDragging && styles.onDrag}`}
            >
                <div className={`${styles.infoContainer} ml-4 mr-4`}>
                    <img className={styles.image} src={item.image} alt={`Ингредиент ${item.name?.length > 0 ? item.name : ""}`} />
                    <div className={`${styles.price} mt-1 mb-1`}>
                        <span className={`${styles.text} mr-2 text text_type_digits-small`}>{item.price}</span>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
                <div className={`${styles.text} text text_type_main-small`}>{item.name}</div>
                {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
            </div>
        </Link>
    )
}