import {
    GET_ITEMS_REQUEST,
    GET_ITEMS_SUCCESS,
    GET_ITEMS_ERROR,
} from '../actions/ingredients';

const initialState = {
    items: [],
    itemsRequest: false,
    itemsError: false,
};

export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ITEMS_REQUEST: {
            return { ...state, itemsRequest: true };
        }
        case GET_ITEMS_SUCCESS: {
            return { ...state, itemsError: false, items: action.items, itemsRequest: false };
        }
        case GET_ITEMS_ERROR: {
            return { ...state, itemsError: action.requestError, itemsRequest: false };
        }
        default: {
            return state;
        }
    }
};