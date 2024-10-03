import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from "../modal/modal.jsx";
import { OrderDetails } from "../order-details/order-details.jsx";
import { IngredientItemType } from "./../../utils/prop-types";
import styles from './burger-constructor.module.css'


const IngredientsConstructor = ({ bun, ingredients }) => {
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
                        <div className={styles.price} key={item._id}>
                            <DragIcon className='pr-2' type="primary" />
                            <ConstructorElement
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                            />
                        </div>
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

const IngredientsPrice = ({ openModal }) => {
    return (
        <div className={`${styles.priceContainer} mt-10`}>
            <span className="mr-2 text text_type_digits-medium">{200}</span>
            <CurrencyIcon type="primary" className='mr-10'> </CurrencyIcon>
            <Button htmlType="button" type="primary" size="large" onClick={openModal}>
                Оформить заказ
            </Button>
        </div>
    )
}
const BurgerConstructor = ({ ingredients }) => {
    const [isModalVisible, setIsModalVisible] = useState(null);
    // TODO: hard-coded values
    const bunsIngredients = ingredients.filter(i => i.type === 'bun');
    const nonBunIngredients = ingredients.filter(i => i.type !== 'bun');

    return (
        <>
            {isModalVisible && (
                <Modal onClose={() => setIsModalVisible(false)}>
                    <OrderDetails></OrderDetails>
                </Modal>
            )}
            <section className='pt-25 pl-4 pr-4'>
                <IngredientsConstructor bun={bunsIngredients[0]} ingredients={nonBunIngredients.slice(0, 10)} />
                <IngredientsPrice openModal={() => setIsModalVisible(true)} />
            </section>
        </>
    )
}

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(IngredientItemType).isRequired
}

IngredientsPrice.propTypes = {
    openModal: PropTypes.func
}

IngredientsConstructor.propTypes = {
    bun: IngredientItemType.isRequired,
    ingredients: PropTypes.arrayOf(IngredientItemType).isRequired,
}

export { BurgerConstructor };