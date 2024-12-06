import { TIngredientItemType } from '../../utils/types';
import { getAllIngredientsRequest } from '../api';
import { AppDispatch, AppThunkAction } from '../hooks';

export const GET_ITEMS_REQUEST: 'GET_ITEMS_REQUEST' = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS: 'GET_ITEMS_SUCCESS' = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_ERROR: 'GET_ITEMS_ERROR' = 'GET_ITEMS_ERROR';

export interface IGetIngredientsAction {
    readonly type: typeof GET_ITEMS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
    readonly type: typeof GET_ITEMS_SUCCESS;
    readonly items: Array<TIngredientItemType>;
}

export interface IGetIngredientsErrorAction {
    readonly type: typeof GET_ITEMS_ERROR;
    readonly requestError: string;
}

export type TIngredientsActions = IGetIngredientsAction | IGetIngredientsSuccessAction | IGetIngredientsErrorAction;

export const getIngredients = (): AppThunkAction => (dispatch: AppDispatch) => {
    dispatch({ type: GET_ITEMS_REQUEST });

    return getAllIngredientsRequest()
        .then((res) => {
            dispatch({
                type: GET_ITEMS_SUCCESS,
                items: res.data,
            })
        })
        .catch(error => {
            dispatch({
                type: GET_ITEMS_ERROR,
                requestError: error.message,
            });
        })
};
