import React from "react";
import { useDispatch, useSelector } from "../../../../services/hooks";
import { useDrop } from "react-dnd";
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { addItem } from "../../../../services/actions/burger-constructor";
import { DndItemTypes } from "../../../../utils/DndItemTypes"
import { ConstructorIngredient } from "../constructor-ingredient/constructor-ingredient";
import styles from './ingredients-constructor.module.css'
import { TDropCollectedIngredientProps, TIngredientItemType } from "../../../../utils/types";

export const IngredientsConstructor = (): React.JSX.Element => {
    const dispatch = useDispatch();
    const { bun, ingredients } = useSelector(state => state.burgerConstructor);

    const [{ canDropIngr, canDropBun, isOverIngr, isOverBun }, drop] = useDrop<TIngredientItemType, unknown, TDropCollectedIngredientProps>(() => ({
        accept: DndItemTypes.ItemDragDrop,
        drop: (item) => (dispatch(addItem(item))),
        collect: (monitor) => ({
            canDropIngr: monitor.getItem()?.type !== "bun" && monitor.canDrop(),
            canDropBun: monitor.getItem()?.type === "bun" && monitor.canDrop(),

            isOverIngr: monitor.getItem()?.type !== "bun" && monitor.isOver(),
            isOverBun: monitor.getItem()?.type === "bun" && monitor.isOver(),
        }),
    }))

    return (
        <div ref={drop} className={`${styles.ingredientsContainer} ml-10`} data-test="constructorContainer">
            {bun ?
                (<div className={`${styles.bun} mr-10 ml-8`} data-test="constructorBunTop">
                    <ConstructorElement
                        type="top"
                        key={bun.key}
                        isLocked={true}
                        text={bun.name}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </div>)
                :
                (<div className={`${styles.emptybuntop} ${canDropBun && styles.canDrop} ${isOverBun && styles.isOver}`}>
                    <p>Выберите булку</p>
                </div>)
            }
            {ingredients && ingredients.length > 0 ?
                (<ul className={`${styles.constructorContainer} pr-5`} data-test="constructorInnerItems">
                    {
                        ingredients.map((item, index) => (
                            <ConstructorIngredient item={item} id={item.key as string} index={index.toString()} key={item.key} />
                        ))}
                </ul>)
                :
                (<div className={`${styles.emptyitem} ${canDropIngr && styles.canDrop} ${isOverIngr && styles.isOver}`}>
                    <p>Выберите начинку</p>
                </div>)
            }
            {bun ?
                (<div className={`${styles.bun} mr-10 ml-8`} data-test="constructorBunBottom">
                    <ConstructorElement
                        key={bun.key}
                        type="bottom"
                        isLocked={true}
                        text={bun.name}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </div>)
                :
                (<div className={`${styles.emptybunbottom} ${canDropBun && styles.canDrop} ${isOverBun && styles.isOver}`}>
                    <p>Выберите булку</p>
                </div>)
            }
        </div>
    )
}