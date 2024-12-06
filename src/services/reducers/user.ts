import { TUserData } from '../../utils/types';
import { SET_AUTH_CHECKED, SET_USER, TUserActions } from '../actions/user';

type TUserInitialState = {
    user: null | TUserData;
    isAuthChecked: boolean;
}

const initialState: TUserInitialState = {
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
