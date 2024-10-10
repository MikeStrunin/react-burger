import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from "../modal/modal.jsx";
import { OrderDetails } from "../order-details/order-details.jsx";
import { IngredientsConstructor } from "./ui/ingredients-constructor/ingredients-constructor.jsx"
import { IngredientsPrice } from "./ui/ingredients-price/ingredients-price.jsx"
import { RESET_ORDER } from '../../services/actions/order-details.js';
import styles from './burger-constructor.module.css'


const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const { order, orderRequest, orderError } = useSelector((store) => store.order);

    const onCloseModal = useSelector(() => {
        dispatch({ type: RESET_ORDER });
    }, [])

    return (
        <>
            {(order || orderRequest || orderError) && (
                <Modal onClose={() => onCloseModal()}>
                    <OrderDetails></OrderDetails>
                </Modal>
            )}
            <section className={`${styles.container} pt-25 pl-4 pr-4`}>
                <IngredientsConstructor />
                <IngredientsPrice />
            </section>
        </>
    )
}

export { BurgerConstructor };