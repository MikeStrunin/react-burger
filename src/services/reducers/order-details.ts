import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_ERROR,
    RESET_ORDER,
    RESET_ORDER_ERROR,
    TOrderDetailsActions
} from '../actions/order-details.js';


type TCardInitialState = {
    order: null | string;
    orderRequest: boolean,
    orderError: null | boolean | string,
}

const initialState: TCardInitialState = {
    order: null,
    orderRequest: false,
    orderError: null,
};

export function orderReducer(state = initialState, action: TOrderDetailsActions) {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return { ...state, orderRequest: true, orderError: null };
        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                orderRequest: false,
                orderError: null,
                order: action.orderNum,
            };
        case CREATE_ORDER_ERROR:
            return { ...state, orderRequest: false, orderError: action.errorText };
        case RESET_ORDER:
            return { ...state, order: null }
        case RESET_ORDER_ERROR:
            return { ...state, orderError: null }
        default:
            return state;
    }
}