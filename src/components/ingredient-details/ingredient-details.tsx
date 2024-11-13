import { useMemo } from "react";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './ingredient-details.module.css'

const IngredientDetails = (): React.JSX.Element => {// @ts-ignore.
    const ingredients = useSelector(store => store.ingredients.items);
    const { ingredientId } = useParams();// @ts-ignore.
    const ingredient = useMemo(() => ingredients.find(item => item._id === ingredientId), [ingredientId, ingredients]);

    return (
        ingredient
            ? (
                <div className={styles.container}>
                    <img className={styles.image} src={ingredient.image}
                        alt={`Ингредиент ${ingredient.name?.length > 0 ? ingredient.name : ""}`} />
                    <p className="pt-4 text text_type_main-medium">{ingredient.name}</p>

                    <div className={`${styles.row} pt-8 pb-15 text text_type_main-default`}>
                        <div className={`${styles.column} mr-5 text_color_inactive`}>
                            <p className="text text_type_main-default">Калории, ккал</p>
                            <p className="text text_type_digits-default">{ingredient.calories}</p>
                        </div>

                        <div className={`${styles.column} mr-5 text_color_inactive`}>
                            <p className="text text_type_main-default">Белки, г</p>
                            <p className="text text_type_digits-default">{ingredient.proteins}</p>
                        </div>

                        <div className={`${styles.column} mr-5 text_color_inactive`}>
                            <p className="text text_type_main-default">Жиры, г</p>
                            <p className="text text_type_digits-default ">{ingredient.fat}</p>
                        </div>

                        <div className={`${styles.column} text_color_inactive`}>
                            <p className="text text_type_main-default">Углеводы, г</p>
                            <p className="text text_type_digits-default">{ingredient.carbohydrates}</p>
                        </div>
                    </div>
                </div>
            )
            : (
                <div className={styles.error}>
                    Ингредиент не найден!
                </div>
            )
    )
}

export { IngredientDetails };
