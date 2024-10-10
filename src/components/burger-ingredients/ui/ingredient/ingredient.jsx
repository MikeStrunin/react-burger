import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { SET_CURRENT_INGREDIENT } from "../../../../services/actions/current-ingredient.js"
import { IngredientItemType } from "../../../../utils/prop-types";
import styles from './ingredient.module.css'
import { useMemo } from "react";
import { useDrag } from "react-dnd";
import { DndItemTypes } from "../../../../utils/DndItemTypes.js"

export const Ingredient = ({ item }) => {
    const dispatch = useDispatch();
    const { bun, ingredients } = useSelector(store => store.burgerConstructor);
    const count = useMemo(() => {
        if (item.type === "bun") {
            return bun?._id === item._id ? 2 : 0;
        } else {
            return ingredients.filter(elem => elem._id === item._id).length;
        }
    }, [bun, ingredients]);

    const setCurrentIngredient = useCallback((item) => {
        dispatch({
            type: SET_CURRENT_INGREDIENT,
            item: item
        });
    }, [item]);

    const [{ isDragging }, drag] = useDrag(() => ({
        type: DndItemTypes.ItemDragDrop,
        item: item,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
    }))

    return (
        <div ref={drag}
            className={`${styles.container} ${isDragging && styles.onDrag}`}
            onClick={(e) => setCurrentIngredient(item)}>
            <div className={`${styles.infoContainer} ml-4 mr-4`}>
                <img className={styles.image} src={item.image} />
                <div className={`${styles.price} mt-1 mb-1`}>
                    <span className="mr-2 text text_type_digits-small">{item.price}</span>
                    <CurrencyIcon type="primary"> </CurrencyIcon>
                </div>
            </div>
            <span className="text text_type_main-small">{item.name}</span>
            {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
        </div>
    )
}

Ingredient.propTypes = {
    item: IngredientItemType.isRequired,
}