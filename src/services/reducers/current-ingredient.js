import {
    SET_CURRENT_INGREDIENT,
    RESET_CURRENT_INGREDIENT
} from '../actions/current-ingredient'

const initialState = {
    ingredient: null,
};

export function currentIngredientReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_INGREDIENT:
            return { ...state, ingredient: action.item };
        case RESET_CURRENT_INGREDIENT:
            return { ...state, ingredient: null };
        default:
            return state;
    }
}