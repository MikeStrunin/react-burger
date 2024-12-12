import React, { useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from "../../../../services/hooks";
import styles from './ingredients-price.module.css'
import { createOrder } from "../../../../services/actions/order-details";
import { TIngredientItemType } from "../../../../utils/types";


export const IngredientsPrice = (): React.JSX.Element => {
    const dispatch = useDispatch();
    const { bun, ingredients } = useSelector((store) => store.burgerConstructor);
    const user = useSelector((store) => store.user.user);
    const navigate = useNavigate();

    const price = useMemo(() => {
        const price = bun ? bun.price * 2 : 0;
        if (ingredients?.length > 0) {
            return ingredients.reduce((acc: number, ingredient: TIngredientItemType) => acc + ingredient.price, price);
        } else {
            return price;
        }
    }, [bun, ingredients])

    const onCreateOrderClick = () => {
        (user && bun && ingredients)
            ? dispatch(createOrder({ bun, ingredients }))
            : navigate('/login');
    }

    return (
        <div className={`${styles.priceContainer} mt-10`}>
            <span className="mr-2 text text_type_digits-medium">{price}</span>
            <CurrencyIcon type="primary" className='mr-10' />
            <Button htmlType="button" type="primary" size="large"
                onClick={onCreateOrderClick}
                disabled={!bun}
                data-test="submitOrderButton"
            >
                Оформить заказ
            </Button>
        </div>
    )
}