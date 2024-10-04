import React from "react";
import PropTypes from "prop-types";
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientItemType } from "../../../../utils/prop-types";
import styles from './ingredient.module.css'

export const Ingredient = ({ item, setCurrentIngredient }) => {
    return (
        <div className={styles.container} onClick={(e) => setCurrentIngredient(item)}>
            <div className={`${styles.infoContainer} ml-4 mr-4`}>
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

Ingredient.propTypes = {
    item: IngredientItemType.isRequired,
    setCurrentIngredient: PropTypes.func.isRequired,
}