import { createOrderRequest } from "../../services/api";

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_ERROR = 'CREATE_ORDER_ERROR';
export const RESET_ORDER = 'RESET_ORDER';

export function createOrder({ bun, ingredients }) {
    return function (dispatch) {
        const ingredientsID = [
            bun._id,
            ...ingredients.map((item) => item._id),
            bun._id,
        ]
        dispatch({ type: CREATE_ORDER_REQUEST });
        createOrderRequest(ingredientsID)
            .then((res) => {
                dispatch({ type: CREATE_ORDER_SUCCESS, orderNum: res.order.number });
            })
            .catch(() => {
                dispatch({
                    type: CREATE_ORDER_ERROR,
                    errorText: 'Ошибка в формировании заказа'
                });
            });
    };
}