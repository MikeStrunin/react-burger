import { TIngredientItemType } from "../../utils/types";
import { createOrderRequest } from "../api";
import { AppDispatch } from "../hooks";

export const CREATE_ORDER_REQUEST: 'CREATE_ORDER_REQUEST' = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS: 'CREATE_ORDER_SUCCESS' = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_ERROR: 'CREATE_ORDER_ERROR' = 'CREATE_ORDER_ERROR';
export const RESET_ORDER: 'RESET_ORDER' = 'RESET_ORDER';
export const RESET_ORDER_ERROR: 'RESET_ORDER_ERROR' = 'RESET_ORDER_ERROR';

export type TOrderRequestType = {
    bun: TIngredientItemType;
    ingredients: Array<TIngredientItemType>;
}

// Actions
export interface ICreateOrderAction {
    readonly type: typeof CREATE_ORDER_REQUEST;
}

export interface ICreateOrderSuccessAction {
    readonly type: typeof CREATE_ORDER_SUCCESS;
    readonly orderNum: number;
}

export interface ICreateOrderErrorAction {
    readonly type: typeof CREATE_ORDER_ERROR;
    readonly errorText: string;
}

export interface IResetOrderAction {
    readonly type: typeof RESET_ORDER;
}
export interface IResetOrderErrorAction {
    readonly type: typeof RESET_ORDER_ERROR;
}

export type TOrderDetailsActions =
    | ICreateOrderAction
    | ICreateOrderSuccessAction
    | ICreateOrderErrorAction
    | IResetOrderAction
    | IResetOrderErrorAction;

export function createOrder({ bun, ingredients }: TOrderRequestType) {
    return function (dispatch: AppDispatch) {
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