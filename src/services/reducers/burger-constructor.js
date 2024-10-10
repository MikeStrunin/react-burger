import { ADD_ITEM_SUCCESS, DELETE_ITEM_SUCCESS, MOVE_ITEM } from "../actions/burger-constructor";

const initialState = {
    bun: null,
    ingredients: [],
};

export const burgerConstructorReducer = (state = initialState, action) => {
    const isBun = action?.item?.type === 'bun';

    switch (action.type) {
        case ADD_ITEM_SUCCESS:
            return {
                ...state,
                bun: isBun ? action.item : state.bun,
                ingredients: isBun ? state.ingredients : [...state.ingredients, action.item],
            }
        case DELETE_ITEM_SUCCESS:
            return {
                ...state,
                bun: isBun ? null : state.bun,
                ingredients: isBun ? state.ingredients : state.ingredients.filter(ingredient => ingredient.key !== action.item.key)
            }
        case MOVE_ITEM:
            const ingredientsTmp = [...state.ingredients];
            ingredientsTmp.splice(action.toIndex, 0, ingredientsTmp.splice(action.fromIndex, 1)[0]);
            return {
                ...state,
                ingredients: ingredientsTmp
            };
        default:
            return state;
    }
}