import { SET_AUTH_CHECKED, SET_USER, TUserActions } from '../actions/user';

const initialState = {
    user: null,
    isAuthChecked: false,
};

export const userReducer = (state = initialState, action: TUserActions) => {
    switch (action.type) {
        case SET_AUTH_CHECKED:
            return {
                ...state,
                isAuthChecked: action.payload
            }
        case SET_USER:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
};
