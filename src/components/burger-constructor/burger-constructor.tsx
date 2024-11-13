import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import { IngredientsConstructor } from "./ui/ingredients-constructor/ingredients-constructor"
import { IngredientsPrice } from "./ui/ingredients-price/ingredients-price"
import { RESET_ORDER, RESET_ORDER_ERROR } from '../../services/actions/order-details.js';
import { RESET_ITEMS } from "../../services/actions/burger-constructor.js";
import styles from './burger-constructor.module.css'


const BurgerConstructor = (): React.JSX.Element => {
    const dispatch = useDispatch();// @ts-ignore.
    const { order, orderRequest, orderError } = useSelector((store) => store.order);

    const onCloseModal = () => {
        dispatch({ type: RESET_ORDER });
        if (orderError) {
            dispatch({ type: RESET_ORDER_ERROR });
        } else {
            dispatch({ type: RESET_ITEMS });
        }
    }


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