import React from "react";
import PropTypes from "prop-types";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientItemType } from "../../../../utils/prop-types";
import styles from './ingredients-constructor.module.css'

export const IngredientsConstructor = ({ bun, ingredients }) => {
    return (
        <div className={`${styles.ingredientsContainer} ml-10`}>
            {bun &&
                (<div className={`${styles.bun} mr-10 ml-8`}>
                    <ConstructorElement
                        type="top"
                        key={bun._id}
                        isLocked={true}
                        text={bun.name}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </div>)
            }
            {ingredients && ingredients.length > 0 &&
                (<ul className={`${styles.constructorContainer} pr-5`}>
                    {ingredients.map((item, index) => (
                        <li className={styles.dragContainer} key={item._id} >
                            <DragIcon className='pr-2' type="primary" />
                            <ConstructorElement
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                            />
                        </li>
                    ))}
                </ul>)
            }
            {bun &&
                (<div className={`${styles.bun} mr-10 ml-8`}>
                    <ConstructorElement
                        key={bun._id}
                        type="bottom"
                        isLocked={true}
                        text={bun.name}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </div>)}
        </div>
    )
}

IngredientsConstructor.propTypes = {
    bun: IngredientItemType.isRequired,
    ingredients: PropTypes.arrayOf(IngredientItemType).isRequired,
}