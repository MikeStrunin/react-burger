import React from "react";
import PropTypes from "prop-types";
import { Ingredient } from "../../ui/ingredient/ingredient.jsx";
import { IngredientItemType } from "../../../../utils/prop-types";
import styles from './ingredients.module.css'

export const Ingredients = ({ ingredients, caption, refValue }) => {
    return (
        <>
            <h2 className={`${styles.caption} mt-10 text text_type_main-medium`} ref={refValue}>{caption ?? ""}</h2>
            <ul className={`${styles.ulContainer} pl-4 pt-6`}>
                {ingredients.map((item, index) => (
                    <li className={styles.liContainer} key={item._id} >
                        <Ingredient item={item} />
                    </li>
                ))}
            </ul>
        </>
    )
}

Ingredients.propTypes = {
    ingredients: PropTypes.arrayOf(IngredientItemType.isRequired).isRequired,
    caption: PropTypes.string,
    refValue: PropTypes.oneOfType([
        // Either a function
        PropTypes.func,
        // Or the instance of a DOM native element (see the note about SSR)
        PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    ]).isRequired,
}