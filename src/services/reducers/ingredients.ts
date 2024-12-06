import { TIngredientItemType } from '../../utils/types';
import {
    GET_ITEMS_REQUEST,
    GET_ITEMS_SUCCESS,
    GET_ITEMS_ERROR,
    TIngredientsActions,
} from '../actions/ingredients';

type TIngredientsState = {
    items: ReadonlyArray<TIngredientItemType>;
    itemsRequest: boolean;
    itemsError: boolean;
    ingredientsMap: Map<string, TIngredientItemType>;
}

const initialState: TIngredientsState = {
    items: [],
    itemsRequest: false,
    itemsError: false,
    ingredientsMap: new Map<string, TIngredientItemType>([])
};

export const ingredientsReducer = (state = initialState, action: TIngredientsActions) => {
    switch (action.type) {
        case GET_ITEMS_REQUEST: {
            return { ...state, itemsRequest: true };
        }
        case GET_ITEMS_SUCCESS: {
            return {
                ...state, itemsError: false, items: action.items, itemsRequest: false,
                ingredientsMap: new Map(action.items.map(i => [i._id, i]))
            };
        }
        case GET_ITEMS_ERROR: {
            return { ...state, itemsError: action.requestError, itemsRequest: false };
        }
        default: {
            return state;
        }
    }
};