import { TIngredientItemType } from "../../utils/types";
import { ADD_ITEM_SUCCESS, DELETE_ITEM_SUCCESS, MOVE_ITEM, RESET_ITEMS, TBurgerItemsActions } from "../actions/burger-constructor";

type TBurgerItemsState = {
    bun: TIngredientItemType | null;
    ingredients: Array<TIngredientItemType>;
}

const initialState: TBurgerItemsState = {
    bun: null,
    ingredients: [],
};

export const burgerConstructorReducer = (state = initialState, action: TBurgerItemsActions): TBurgerItemsState => {

    switch (action.type) {
        case ADD_ITEM_SUCCESS:
            let isBun = action?.item?.type === 'bun';
            return {
                ...state,
                bun: isBun ? action.item : state.bun,
                ingredients: isBun ? state.ingredients : [...state.ingredients, action.item],
            }
        case DELETE_ITEM_SUCCESS:
            isBun = action?.item?.type === 'bun'; //? почему тут нельзя второй раз объявить с тем же именем?! разные ведь блоки
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
        case RESET_ITEMS:
            return {
                ...state,
                bun: null,
                ingredients: [],
            }

        default:
            return state;
    }
}