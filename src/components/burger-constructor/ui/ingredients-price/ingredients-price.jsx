import React from "react";
import PropTypes from "prop-types";
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './ingredients-price.module.css'

export const IngredientsPrice = ({ openModal }) => {
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

IngredientsPrice.propTypes = {
    openModal: PropTypes.func
}