import { v4 } from "uuid";
import { TIngredientItemType } from "../../utils/types";
import { AppDispatch, AppThunkAction } from "../hooks";

export const ADD_ITEM_SUCCESS: 'ADD_ITEM_SUCCESS' = "ADD_ITEM_SUCCESS";
export const DELETE_ITEM_SUCCESS: 'DELETE_ITEM_SUCCESS' = "DELETE_ITEM_SUCCESS";
export const RESET_ITEMS: 'RESET_ITEMS' = "RESET_ITEMS"
export const MOVE_ITEM: 'MOVE_ITEM' = "MOVE_ITEM";

export interface IAddItemAction {
    readonly type: typeof ADD_ITEM_SUCCESS;
    readonly item: TIngredientItemType;
}

export interface IDeleteItemAction {
    readonly type: typeof DELETE_ITEM_SUCCESS;
    readonly item: TIngredientItemType;
}

export interface IMoveItemAction {
    readonly type: typeof MOVE_ITEM;
    readonly fromIndex: number;
    readonly toIndex: number;
}
export interface IResetItemAction {
    readonly type: typeof RESET_ITEMS;
}

export type TBurgerItemsActions = IAddItemAction | IDeleteItemAction | IMoveItemAction | IResetItemAction;

export const addItem = (item: TIngredientItemType): AppThunkAction => (dispatch: AppDispatch) => {
    dispatch({
        type: ADD_ITEM_SUCCESS,
        item: { ...item, key: v4() },
    });
}

export const deleteItem = (item: TIngredientItemType): AppThunkAction => (dispatch: AppDispatch) => {
    dispatch({
        type: DELETE_ITEM_SUCCESS,
        item: item,
    })
};

export const moveItem = (fromIndex: number, toIndex: number): IMoveItemAction => {
    return {
        type: MOVE_ITEM,
        fromIndex: fromIndex,
        toIndex: toIndex,
    };
};
