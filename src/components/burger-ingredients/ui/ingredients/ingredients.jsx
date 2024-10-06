import React from "react";
import PropTypes from "prop-types";
import { Ingredient } from "../../ui/ingredient/ingredient.jsx";
import { IngredientItemType } from "../../../../utils/prop-types";
import styles from './ingredients.module.css'

export const Ingredients = ({ ingredients, caption, setCurrentIngredient }) => {
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

Ingredients.propTypes = {
    ingredients: PropTypes.arrayOf(IngredientItemType.isRequired).isRequired,
    caption: PropTypes.string,
    setCurrentIngredient: PropTypes.func.isRequired,
}