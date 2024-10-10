import { getAllIngredientsRequest } from '../api.js';

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_ERROR = 'GET_ITEMS_ERROR';

export const getIngredients = () => (dispatch) => {
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
