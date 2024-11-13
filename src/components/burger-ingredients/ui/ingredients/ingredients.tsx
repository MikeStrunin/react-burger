import React from "react";
import { Ingredient } from "../../ui/ingredient/ingredient";
import styles from './ingredients.module.css'
import { TIngredientItemType } from "../../../../utils/types";

type TIngredientsData = {
    ingredients: Array<TIngredientItemType>;
    caption?: string;
    refValue: React.MutableRefObject<HTMLHeadingElement | null>;
};

export const Ingredients = ({ ingredients, caption, refValue }: TIngredientsData): React.JSX.Element => {
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