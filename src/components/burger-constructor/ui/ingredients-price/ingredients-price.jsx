import React, { useMemo } from "react";
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import styles from './ingredients-price.module.css'
import { createOrder } from "../../../../services/actions/order-details";


export const IngredientsPrice = () => {
    const dispatch = useDispatch();
    const { bun, ingredients } = useSelector((store) => store.burgerConstructor);

    const price = useMemo(() => {
        const price = bun ? bun.price * 2 : 0;
        if (ingredients?.length > 0) {
            return ingredients.reduce((acc, ingredient) => acc + ingredient.price, price);
        } else {
            return price;
        }
    }, [bun, ingredients])

    return (
        <div className={`${styles.priceContainer} mt-10`}>
            <span className="mr-2 text text_type_digits-medium">{price}</span>
            <CurrencyIcon type="primary" className='mr-10'> </CurrencyIcon>
            <Button htmlType="button" type="primary" size="large"
                onClick={() => dispatch(createOrder({ bun, ingredients }))}
                disabled={!bun}
            >
                Оформить заказ
            </Button>
        </div>
    )
}