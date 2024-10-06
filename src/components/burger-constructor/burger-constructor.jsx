import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal } from "../modal/modal.jsx";
import { OrderDetails } from "../order-details/order-details.jsx";
import { IngredientsConstructor } from "./ui/ingredients-constructor/ingredients-constructor.jsx"
import { IngredientsPrice } from "./ui/ingredients-price/ingredients-price.jsx"
import { IngredientItemType } from "./../../utils/prop-types";
//import styles from './burger-constructor.module.css'

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
    ingredients: PropTypes.arrayOf(IngredientItemType.isRequired).isRequired
}

export { BurgerConstructor };